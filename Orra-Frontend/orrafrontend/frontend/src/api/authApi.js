import { supabase } from "@/lib/supabaseclient";
import axiosinstance from "./Axiosconfig";

// SIGNUP
export const SignupUser = async (data) => {
  console.log("Signup Request:", data);
  return await axiosinstance.post("/api/users/signup", data);
};

// Restore session on page refresh
export const GetCurrentUser = async () => {
  return await axiosinstance.get("/api/auth/me", { withCredentials: true });
};

// Establish httpOnly cookie session after Supabase login
export const CreateSession = async (token) => {
  return await axiosinstance.post("/api/auth/session", { token }, { withCredentials: true });
};

export const Logout = async () => {
   await supabase.auth.signOut();
  return await axiosinstance.post("/api/auth/logout", {}, { withCredentials: true });
};

export const SignIn = async (data) => {
  console.log("Sign In:", data);

  // Step 1 — authenticate with Supabase
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) throw error;

  // Step 2 — establish httpOnly cookie session on Spring Boot
  await axiosinstance.post("/api/auth/session", { token: authData.session.access_token }, { withCredentials: true });

  return authData;
};