// Timer.tsx
import React from "react";

type Props = {
  seconds: number;
  handleResendOTP: () => void;
};

const Timer: React.FC<Props> = ({ seconds, handleResendOTP }: Props) => {
  return (
    <>
      {seconds > 0 ? (
        <h1 className="mt-10">Timer: {seconds}</h1>
      ) : (
        <button className="mt-10" onClick={handleResendOTP}>
          Resend OTP
        </button>
      )}
    </>
  );
};

export default Timer;
