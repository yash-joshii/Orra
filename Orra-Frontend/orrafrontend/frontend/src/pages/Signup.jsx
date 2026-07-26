import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignupUser } from "@/api/authApi";
import apple from "/public/apple.svg";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   try {
  //     const response = SignupUser(formData);
  //     console.log(response);
  //     toast.success("Signup Successful");
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Signup Failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Empty Field Validation
    if (
      !formData.username.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      toast.error("Please Fill All the fields");
      return;
    }

    //Username validation
    if (formData.username.length < 3) {
      toast.error("Username must be atleast 3 characters");
      return;
    }

    //Email Validation
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    //Phone Validation
    if (formData.phone.length !== 10) {
      toast.error("Phone Number must be 10 digits");
      return;
    }

    //Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await SignupUser(formData);

      console.log(response);
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed");
    }
  };



  return (
    <>
    <div className="signup-container flex justify-center items-center w-full min-h-screen">
      <div className="signup-left-container w-2/4 min-h-screen  h-full">
        <div className="upper-signup flex flex-col justify-center items-center text-center gap-2 mt-[8%]">
          <div className="signup-heading ">
            <h1 className="text-center font-bold text-[30px]">
              Create an Account
            </h1>
            <p className="text-zinc-600">
              Join ORRA to rent premium electronics safely.
            </p>
          </div>

          <div className="google-apple-login flex justify-around flex-col items-center w-3/5 h-[15vh]  mt-[30px] gap-5">
            <Button
              className="google-login w-[90%] p-6 rounded-[15px]  text-gray-600 text-md"
              variant="outline"
            >
              <img className="w-[6%]" src="/public/google.svg" alt="Google" />
              Continue with Google
            </Button>

            <Button
              className="apple-login w-[90%] p-6 rounded-[15px]  text-gray-600 text-md"
              variant="outline"
            >
              <img className="w-[6%]" src={apple} alt="apple" />
              Continue with Apple
            </Button>
          </div>

          <div className="text-in-line flex items-center justify-center w-full my-4 ">
            <div className="grow-[0.2] border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">
              Or continue with email
            </span>

            <div className="grow-[0.2] border-t border-gray-200"></div>
          </div>

          <div className="user-details mt-[11px] ">
            <form onSubmit={handleSubmit}>
              <div className="user-name-username w-[400px]">
                <FieldGroup className="grid max-w-sm grid-cols-2 ">
                  <Field>
                    <FieldLabel htmlFor="User-name">Username</FieldLabel>
                    <Input
                      value={formData.username}
                      onChange={(e) => {

                        const value = e.target.value.replace(/\s/g, "");

                        setFormData({
                          ...formData,
                          username: value,
                        });

                      }}

                      placeholder="Enter your UserName"
                      className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z ]/g, "");
                        setFormData({
                          ...formData,
                          name: value,
                        })
                      }}
                      id="full-name"
                      placeholder="Enter your Full Name"
                      className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                    />
                  </Field>
                </FieldGroup>
              </div>

              <div className="user-email-phone-password">
                <Field className="mt-[30px]">
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>

                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    maxLength={10}
                    placeholder="Enter your Phone Number"
                    onChange={(e) =>

                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]
                     bg-gray-50 py-3 px-4 h-[50px] rounded-[17px]"
                  />
                </Field>

                <div className="user-email-password">
                  <Field className="mt-[30px]">
                    <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
                    <Input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      id="input-demo-disabled"
                      type="email"
                      placeholder="Email"
                      className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                    />
                  </Field>

                  <Field className="mt-[30px]">
                    <FieldLabel htmlFor="input-demo-disabled">Phone Number</FieldLabel>
                    <Input
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFormData({
                          ...formData,
                          phone: value,
                        })
                      }}
                      id="input-demo-disabled"
                      type="tel"
                      placeholder="Phone Number"
                      className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                    />
                  </Field>

                  <Field className="mt-[15px]">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      value={formData.password}
                      type="password"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      id="password"
                      placeholder="Enter your Password"
                      className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                    />
                  </Field>

                  <Field className="mt-[15px]">
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      type="password"
                      id="Confirm-password"
                      placeholder="Re-Enter your Password"
                      className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                    />
                  </Field>

                {/* </div> */}

                <div className="button-password-login">
  <Button
    type="submit"
    className="mt-[20px] w-full h-[50px] rounded-[15px] bg-[#554cea] font-bold text-[16px]"
  >
    Create Account
  </Button>

  <div className="text-login mt-[28px]">
    <span className="text-[15px]">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-[#554cea]"
      >
        Log in
      </span>
    </span>
  </div>
</div>

              </div> {/* user-email-password */}
            </div> {/* user-email-phone-password */}
          </form>
        </div> {/* user-details */}
      </div> {/* upper-signup */}
    </div> {/* signup-left-container */}

    <div className="right-left-container w-2/4 min-h-screen relative h-screen bg-[url('/public/image.avif')] bg-cover bg-center">
      <div className="text-right absolute top-[550px] ml-[55px]">
        <h1 className="text-center font-bold text-[30px] text-left w-[500px]">
          Access premium gear without owning it.
        </h1>

        <div className="text-small text-left w-[500px] mt-[10px] text-[20px]">
          <span>
            Join the community of creators and tech enthusiasts renting and
            lending their devices every day.
          </span>
        </div>
      </div>
    </div>
  </div>
</>
  );
};

      export default Signup
