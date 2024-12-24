import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { makeToast, makeToastError } from "@/utils/toaster";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// import { OtpVerifyLoginUser } from "@/utils/urlPath";
import OtpTimer from "@/hooks/otp-timer";

const formSchema = z.object({
  otp: z.string().min(5, { message: "OTP is required." }),
});

interface FormData {
  otp: string;
}

type Props = {
  setShowOtpLogin: (value: boolean) => void;
};

export default function LoginOtpVerifyUser({ setShowOtpLogin }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const [message] = useState("");

  // const [timer, setTimer] = useState<number>(() => {
  //   const savedTimer = localStorage.getItem("otp-timer");
  //   return savedTimer ? Number(savedTimer) : 60; // Load timer from localStorage or start at 3
  // });
  // const [isResendVisible, setIsResendVisible] = useState<boolean>(() => {
  //   const isFinished = localStorage.getItem("otp-finished") === "true";
  //   return isFinished; // Show "Resend OTP" if finished
  // });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle form submission
    // console.log("Form values: ", values);
    try {
      setLoading(true);
      const response = await axios.post(`users/verify-otp`, {
        otp: values.otp,
        token: token,
      });

      if (response.status === 200) {
        navigate(`/`);
        setShowOtpLogin(true);
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

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`auth/resendOtp`, { email: token });

      if (response.status === 200) {
        makeToast("OTP Resent Successfully");

        // Reset the timer to 3 seconds
        // setTimer(60);
        // setIsResendVisible(false);
        // localStorage.setItem("otp-timer", "60"); // Save new timer in localStorage
        // localStorage.removeItem("otp-finished"); // Remove finished state
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.success === false) {
          makeToastError(error.response?.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 min-h-[400px] p-8 relative bg-[#F5E9FF] flex flex-col justify-center items-center">
      <ArrowLeft
        onClick={() => {
          setShowOtpLogin(false);
          localStorage.removeItem("otp-timer");
          localStorage.removeItem("otp-finished");
          navigate("/login");
        }}
        className="absolute top-4 left-4 cursor-pointer text-textMain"
        fontSize={20}
      />
      <img
        src="/img/Background Images/Group 1117.png"
        alt="logo"
        className="w-36 mb-4"
      />
      <p className="font-extrabold text-xl mb-2">Verify Mobile Email</p>
     
      {message && (
        <p className="text-xs bg-green-100 p-2 rounded-md">
          {message}{" "}
          <Link to={`/`} className="text-blue-500 underline">
            Visit Our Home
          </Link>
        </p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value} // Bind value from react-hook-form
                    onChange={field.onChange} // Handle change for OTP input
                  >
                    <InputOTPGroup className="space-x-2 rounded-xl">
                      {[...Array(5)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="border text-center text-xl rounded-xl bg-white border-gray-300"
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const otpValue = target.value;
                            field.onChange(otpValue); // Update the form state
                          }}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* {isResendVisible ? (
            <p
              className="text-center text-sm hover:underline cursor-pointer text-blue-400"
              onClick={handleResendOtp}
            >
              Resend Otp
            </p>
          ) : (
            <p className="text-center text-sm text-gray-500">
              Resend in {timer} seconds
            </p>
          )} */}
           <OtpTimer
           resendOtp={handleResendOtp}
          initialTime={60}
          onTimerFinish={() => makeToast("You can resend OTP now.")}
          
        />
       

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <ClipLoader color="#ffff" size={20} />
            ) : (
              "Get Verification Code"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
