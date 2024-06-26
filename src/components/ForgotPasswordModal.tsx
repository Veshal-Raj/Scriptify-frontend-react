import React, { useEffect, useRef, useState, ChangeEvent, KeyboardEvent, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordOtpApi } from "../api/user";
import { useNavigate } from "react-router-dom";
import BackdropLoading from "./UI/BackdropLoading";
import Timer from "./UI/Timer";
import { AxiosError } from "axios";
import { toast } from "sonner";

type Props = {
  length?: number;
  onOtpSubmit?: (otp: string) => void;
  email?: string;
  setIsModalOpen?: (isOpen: boolean) => void;
};

const ForgotPasswordModal: React.FC<Props> = ({
  setIsModalOpen,
  length = 4,
  onOtpSubmit = () => { },
}: Props) => {

  const [, setSendOTP] = useState('');
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State for submission progress
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const { mutate: forgotPasswordOtp } = useMutation({
    mutationFn: forgotPasswordOtpApi,
    onSuccess: () => navigate('/change-password'),
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error as string
        if (message) {
          if (setIsModalOpen) setIsModalOpen(false);
          toast.error(message);
        } else {
          if (setIsModalOpen) setIsModalOpen(false);
          toast.error('OTP mismatch');
        }
      } else {
        if (setIsModalOpen) setIsModalOpen(false);
        toast.error((error as Error).message || 'An unknown error occurred');
      }
    }
  })

  const verifyOTPCallback = useCallback((combinedOtp: string) => {
    setIsSubmitting(true);
    const userOTP = { 'otp': combinedOtp };
    onOtpSubmit(combinedOtp);
    forgotPasswordOtp(userOTP);
  }, [onOtpSubmit, forgotPasswordOtp])

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval); 

  }, [seconds]); 

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      verifyOTPCallback(combinedOtp)
    }
    setSendOTP(combinedOtp)

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].setSelectionRange(1, 1);

      if (index > 0 && !otp[index - 1]) {
        const emptyIndex = otp.indexOf("");
        if (inputRefs.current[emptyIndex]) {
          inputRefs.current[emptyIndex].focus();
        }
      }
    }
  };

  const handleKeyDown = ( index: number, e: KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1] ) {      
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOTP = () => setSeconds(60)

  return (
    <>
      <div className="text-center m-10">
        <div className="flex justify-center">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              ref={(input) =>
                (inputRefs.current[index] = input as HTMLInputElement)
              }
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              readOnly={isSubmitting} // Make input readonly when submitting
              className="w-12 h-12 mx-1 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <Timer seconds={seconds} handleResendOTP={handleResendOTP} />
        <BackdropLoading isSubmitting={isSubmitting} />
      </div>
    </>
  );
};

export default ForgotPasswordModal;
