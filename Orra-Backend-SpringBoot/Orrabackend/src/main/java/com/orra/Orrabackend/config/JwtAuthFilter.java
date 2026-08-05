package com.orra.Orrabackend.config;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.interfaces.ECPublicKey;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwkProvider jwkProvider;

    public JwtAuthFilter(UserRepository userRepository) throws MalformedURLException {
        this.userRepository = userRepository;

        this.jwkProvider = new JwkProviderBuilder(
                new URL("https://jnizlhfupndwxuujpgku.supabase.co/auth/v1/.well-known/jwks.json")
        ).build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Skip JWT validation on preflight OPTIONS requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractToken(request);

        if (token != null) {
            try {

                DecodedJWT jwt = JWT.decode(token);

                Jwk jwk = jwkProvider.get(jwt.getKeyId());

                Algorithm algorithm = Algorithm.ECDSA256(
                        (ECPublicKey) jwk.getPublicKey(),
                        null
                );

                algorithm.verify(jwt);

                UUID supabaseId = UUID.fromString(jwt.getSubject());

                User user = userRepository.findBySupabaseId(supabaseId)
                        .orElse(null);

                List<SimpleGrantedAuthority> authorities =
                        user == null
                                ? List.of()
                                : user.getRoles()
                                .stream()
                                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                                .collect(Collectors.toList());

                Long principal = user == null ? null : user.getId();

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                principal,
                                null,
                                authorities
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {

                System.out.println("JWT Validation Failed: " + e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    /**
     * First check Authorization header.
     * If not found, check HttpOnly cookie.
     */
    private String extractToken(HttpServletRequest request) {

        String authorization = request.getHeader("Authorization");

        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);
        }

        if (request.getCookies() != null) {

            for (Cookie cookie : request.getCookies()) {

                if ("sb-access-token".equals(cookie.getName())) {
                    return cookie.getValue();
                }

            }
        }

        return null;
    }
}