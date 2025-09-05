import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import DoneAnimation from "../../assets/lottie/Done.json";
import FailedAnimation from "../../assets/lottie/Failed.json";

import { reverifyEmail, verifyEmail } from "../../store/Reducers/Auth.Reducer";
import { useAppDispatch } from "../../store/hooks/hooks";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const [message, setMessage] = useState("");
  const [resendToken, setResendToken] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "resendSuccess"
  >("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await dispatch(verifyEmail(token as string)).unwrap();
        console.log(res);
        if (!res.success && res.data?.expired) {
          setStatus("error");
          setResendToken(true);
          setMessage(res.message + " ,Redireting to the login page");
          setUserId(res.data?.user);
          return;
        }
        setStatus("success");
        setTimeout(() => {
          router("/login", { replace: true });
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err as string);
        console.log(err);
      }
    };

    verify();
  }, [token]);

  const handleResend = async () => {
    if (!userId) return;
    try {
      const res = await dispatch(reverifyEmail(userId)).unwrap();
      console.log("my reverification response ----", res);
      if (res.success) {
        setMessage(res.message || "Verification email Sent successfully");
        setStatus("resendSuccess");
        setTimeout(() => {
          router("/login", { replace: true });
        }, 4000);
      }
    } catch (err) {
      setMessage(
        (err as Error).message || "Failed to resend verification email"
      );
    }
  };

  useEffect(() => {
    if (!token) {
      router("/");
    }
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800 w-11/12 mx-auto">
      {status === "loading" && (
        <>
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-6" />
          <h2 className="text-lg font-semibold tracking-wide text-center">
            GridMart is verifying your email...
          </h2>
        </>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center">
          <Lottie
            animationData={DoneAnimation}
            loop={false}
            autoplay={true}
            className="h-64 w-64"
          />
          <h2 className="text-lg md:text-3xl font-semibold text-green-600 mt-4 text-center">
            Your email has been verified 🎉
          </h2>
        </div>
      )}

      {status === "resendSuccess" && (
        <div className="flex flex-col items-center">
          <Lottie
            animationData={DoneAnimation}
            loop={false}
            autoplay={true}
            className="h-64 w-64"
          />
          <h2 className="text-lg md:text-3xl font-semibold text-green-600 mt-4 text-center">
            {message || "Please Check Your Email 🎉"}
          </h2>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center">
          <Lottie
            animationData={FailedAnimation}
            loop={false}
            autoplay={true}
            className="w-64 h-64"
          />
          <h2 className="text-lg md:text-3xl font-semibold text-red-600 text-center">
            {message || "Verification failed. Please try again"}
          </h2>
          {resendToken && (
            <div className="my-6 mx-auto">
              <button
                className="p-2 rounded-md hover:bg-slate-800 hover:translate font-semibold hover:translate-y-1 active:-translate-y-1 transition-all duration-300 bg-slate-900 text-white"
                onClick={handleResend}
              >
                Resend Verification Email
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
