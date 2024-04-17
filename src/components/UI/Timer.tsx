// Timer.tsx
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { resentOtpApi } from "../../api/user";
import { toast } from "sonner";

type Props = {
  seconds: number;
  handleResendOTP: () => void;
};

const Timer: React.FC<Props> = ({ seconds, handleResendOTP }: Props) => {
  const [trigger, setTrigger] = useState(false)

  const { data: resendOtp, isLoading }= useQuery({
    queryKey: ['resendOtp'],
    queryFn: resentOtpApi,
    enabled: trigger
  })

  const handleResendClick = () => {
    console.log("Resend OTP"); // Log "Resend OTP" when button is clicked
    setTrigger(true)
    // console.log( 'resend otp --- ', )
    const message = resendOtp?.data.response.message
    if (message) toast(message)
    
    !isLoading ? handleResendOTP() : ''; // Call the provided handleResendOTP function
  };

  return (
    <>
      {seconds > 0 ? (
        <h1 className="mt-10">Timer: {seconds}</h1>
      ) : (
        <button className="mt-10" onClick={handleResendClick}>
          Resend OTP
        </button>
      )}
    </>
  );
};

export default Timer;
