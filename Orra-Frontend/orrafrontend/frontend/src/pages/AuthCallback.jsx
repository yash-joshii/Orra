
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { supabase } from "@/lib/supabaseclient";
import {
  CreateSession,
  GetCurrentUser,
  SignupUser,
} from "@/api/authApi";
import { setCredentials, setLoading, setError } from "@/redux/slices/authslices";
import { toast } from "react-toastify";

/**
 * OAuth callback page — Supabase redirects here after Google sign-in.
 *
 * Flow:
 *  1. Supabase has already exchanged the URL code for a session.
 *  2. POST the access token to Spring Boot → sets httpOnly cookie.
 *  3. Auto-register new Google users in your DB (idempotent — existing users return 200).
 *  4. Fetch profile from /api/auth/me and store in Redux via setCredentials.
 *  5. Redirect home.
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Guard against React StrictMode double-invocation in dev
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const handleCallback = async () => {
      dispatch(setLoading(true));
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const session = sessionData?.session;
        if (!session) {
          toast.error("Google sign-in failed. Please try again.");
          navigate("/login");
          return;
        }

        // Establish Spring Boot httpOnly cookie session
        await CreateSession(session.access_token);

        // Register in your DB — idempotent (returns existing user on repeat logins)
        const { user } = session;
        try {
          await SignupUser({
            username: user.email.split("@")[0],
            name: user.user_metadata?.full_name || user.email.split("@")[0],
            email: user.email,
            phone: user.user_metadata?.phone ?? null,
            supabaseUserId: user.id,
            provider: "google",
          });
        } catch (signupErr) {
          // 409 means user already exists — not an error for returning users
          if (signupErr?.response?.status !== 409) {
            console.warn("SignupUser during Google OAuth:", signupErr.message);
          }
        }

        // Fetch profile from your own DB and hydrate Redux
        const meResponse = await GetCurrentUser();
        dispatch(setCredentials({
          user: { userId: meResponse.data.userId, roles: meResponse.data.roles },
        }));

        toast.success("Signed in with Google!");
        navigate("/");
      } catch (err) {
        console.error("Google OAuth callback error:", err);
        dispatch(setError(err.message));
        toast.error(err.message || "Google sign-in failed.");
        navigate("/login");
      } finally {
        dispatch(setLoading(false));
      }
    };

    handleCallback();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#554cea] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Completing sign-in…</p>
      </div>
    </div>
  );
};

export default AuthCallback;

