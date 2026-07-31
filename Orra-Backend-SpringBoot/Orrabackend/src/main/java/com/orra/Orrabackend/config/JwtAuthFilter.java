package com.orra.Orrabackend.config;

import com.auth0.jwk.Jwk;                                    // CHANGED — new import
import com.auth0.jwk.JwkProvider;                             // CHANGED — new import
import com.auth0.jwk.JwkProviderBuilder;                      // CHANGED — new import
import com.auth0.jwt.JWT;                                     // CHANGED — new import
import com.auth0.jwt.algorithms.Algorithm;                    // CHANGED — new import
import com.auth0.jwt.interfaces.DecodedJWT;                   // CHANGED — new import
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.UserRepository;
// REMOVED — import io.jsonwebtoken.Claims;
// REMOVED — import io.jsonwebtoken.JwtException;
// REMOVED — import io.jsonwebtoken.Jwts;
// REMOVED — import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
// REMOVED — import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

// REMOVED — import javax.crypto.SecretKey;
import java.io.IOException;
import java.net.MalformedURLException;                       // CHANGED — new import
import java.net.URL;                                          // CHANGED — new import
import java.security.interfaces.ECPublicKey;                  // CHANGED — new import
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    // REMOVED — @Value("${supabase.jwt-secret}")
    // REMOVED — private String jwtSecret;

    private final UserRepository userRepository;
    private final JwkProvider jwkProvider;                    // CHANGED — new field

    public JwtAuthFilter(UserRepository userRepository) throws MalformedURLException { // CHANGED — throws clause added
        this.userRepository = userRepository;
        this.jwkProvider = new JwkProviderBuilder(            // CHANGED — new initialization
                new URL("https://jnizlhfupndwxuujpgku.supabase.co/auth/v1/.well-known/jwks.json")
        ).build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = extracToken(request);

        if (token != null) {
            try {
                // CHANGED — replaced HMAC secret-key parsing block below
                DecodedJWT jwt = JWT.decode(token);
                Jwk jwk = jwkProvider.get(jwt.getKeyId());
                Algorithm algorithm = Algorithm.ECDSA256((ECPublicKey) jwk.getPublicKey(), null);
                algorithm.verify(jwt);

                UUID supabaseId = UUID.fromString(jwt.getSubject()); // CHANGED — was claims.getSubject()

                User user = userRepository.findBySupabaseId(supabaseId).orElse(null);

                List<SimpleGrantedAuthority> authorities = user == null
                        ? List.of()
                        : user.getRoles().stream()
                        .map(r -> new SimpleGrantedAuthority("ROLE_" + r.name()))
                        .collect(Collectors.toList());



                Long principal = (user == null) ? null : user.getId();

                var auth = new UsernamePasswordAuthenticationToken(principal, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (
                    Exception e) {                            // CHANGED — was catch (JwtException | IllegalArgumentException e)
                System.out.println("JWT validation failed: " + e.getClass().getSimpleName() + " - " + e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }
        chain.doFilter(request, response);
    }

    private String extracToken(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("sb-access-token"))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }
}