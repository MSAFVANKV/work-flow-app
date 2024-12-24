import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { makeToast, makeToastError } from "@/utils/toaster";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {  useNavigate } from "react-router-dom";
// import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import LoginOtpVerifyUser from "./LoginOtpVerifyUser";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hook";
import { setUserLogin } from "@/redux/UserAuthSlice";
// import { userLoginSendOtp } from "@/services/admin_side_api/auth/use-login-api";

// Define the Zod schema for phone number validation
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  // otp: z.string().min(6, {
  //   message: "OTP must be at least 6 characters.",
  // }),
});

interface FormData {
  email: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      setShowOtpLogin(true);
      // navigate(`/login?page=otp-log&token=${token}`);
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission
    console.log("Form values: ", values);
    try {
      setLoading(true);
      const response = await axios.post(`auth/login-user`, {
        email: values.email,
      });

      if (response.status === 201) {
        navigate(`/login?token=${response.data.token}`);
        setShowOtpLogin(true);
        makeToast(`${response.data.message}`);
      }
      if (response.status === 200) {
        navigate(`/`);
        dispatch(setUserLogin(response.data))
        setShowOtpLogin(false);
        makeToast(`${response.data.message}`);
      }
    } catch (error: any) {
      setLoading(false);

      if (error.response) {
        // The server responded with an error status code
        console.error("Error from backend:", error.response.data);

        makeToastError(
          error.response.data.message ||
            "Error occurred while processing request"
        );
      } else {
        // Something else happened
        console.error("Error occurred:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center relative">
      {/* Main Container */}
      <img
        src="/login/login-bg.jpg"
        alt=""
        className="absolute w-full h-full object-cover"
      />
      <div className="flex flex-col lg:flex-row w-full max-w-4xl h-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:block lg:w-3/4 relative">
          <img
            src="/login/2779585.jpg"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        {showOtpLogin ? (
          <LoginOtpVerifyUser setShowOtpLogin={setShowOtpLogin} />
        ) : (
          <div className="w-full lg:w-1/2 p-8 relative bg-white flex flex-col justify-center items-center">
            <ArrowLeft
              onClick={() => navigate("/")}
              className="absolute top-4 left-4 cursor-pointer"
            />
            <img
              src="/logo/mainlogo.png"
              alt="logo"
              className="w-28 h-28 mb-4"
            />
            <p className="font-bold text-xl mb-2">Enter Mobile Email</p>
            <p className="text-gray-500 text-center mb-6">
              Enter your 10-digit mobile number to receive the verification
              code.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                  Please enter your email address.
                </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <ClipLoader color="#ffff" size={20} />
                  ) : (
                    " Get Verification Code"
                  )}
                </Button>

                
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
