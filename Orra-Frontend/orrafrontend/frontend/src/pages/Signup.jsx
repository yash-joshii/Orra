import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignupUser } from "@/api/authApi";
import apple from "/public/apple.svg";
import { toast } from "sonner";
const Signup = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = SignupUser(formData);
      console.log(response);
       toast.success("Signup Successful");
      // alert("signup successfull");
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed");
      // alert("signup fail");
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
                <img
                  className="w-[6%]"
                  src="/public/google.svg"
                  alt="Google"
               
                />
                Continue with Google
              </Button>

              <Button
                className="apple-login w-[90%] p-6 rounded-[15px]  text-gray-600 text-md"
                variant="outline"
              >
                <img
                  className="w-[6%]"
                  src={apple}
                  alt="apple"
                
                />
                Continue with Apple
              </Button>
            </div>

            <div class="text-in-line flex items-center justify-center w-full my-4 ">
              <div class="grow-[0.2] border-t border-gray-200"></div>
              <span class="px-4 text-gray-500 text-sm font-medium">
                Or continue with email
              </span>

              <div class="grow-[0.2] border-t border-gray-200"></div>
            </div>

            <div className="user-details mt-[11px] ">
              <form onSubmit={handleSubmit}>
                <div className="user-name-username w-[400px]">
                  <FieldGroup className="grid max-w-sm grid-cols-2 ">
                    <Field>
                      <FieldLabel htmlFor="User-name">Username</FieldLabel>
                      <Input
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          })
                        }
                        id="user-name"
                        placeholder="Enter your UserName"
                        className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                      <Input
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        id="full-name"
                        placeholder="Enter your Full Name"
                        className="shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] 
                  bg-gray-50 py-3 px-4 h-[50px] rounded-[17px] "
                      />
                    </Field>
                  </FieldGroup>
                </div>

                <div className="user-email-password">
                  <Field className="mt-[30px]">
                    <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
                    <Input
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

                  <Field className="mt-[15px]">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
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
                </div>

                <div className="button-password-login">
                  <Button
                  
                    type="submit"
                    className="mt-[20px] w-full h-[50px] rounded-[15px] bg-[#554cea] font-bold text-[16px]"
                  >
                    Create Account
                  </Button>

                  <div className="text-login mt-[28px]">
                    <span className="text-[15px]">
                      Already have an account ?{" "}
                      <a href="#" className=" text-[#554cea]">
                        Log in
                      </a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="right-left-container w-2/4 min-h-screen relative h-screen bg-[url('/public/image.avif')] bg-cover bg-center ">
          <div className="text-right absolute top-[550px] ml-[55px]">
            <h1 className="text-center font-bold text-[30px] text-left w-[500px]">
              {" "}
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

export default Signup;
