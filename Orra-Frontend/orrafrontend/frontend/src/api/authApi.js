import axiosinstance from "./Axiosconfig";


// SIGNUP

export const SignupUser = async (data) => {
  console.log("Signup Request:", data);

  return await axiosinstance.post("/api/users/signup", data);
};


// SEND OTP

export const SendOtp = async (phone) => {
  console.log("Phone:", phone);

  return await axiosinstance.post("/signin/send-otp", {
    phone: phone,
  });
};


export const SignIn = async (data) => {
    return axiosinstance.post("/signin", data);
};

// LOGOUT

export const LogoutUser = async () => {
  return await axiosinstance.post("/signin/logout");
};