import React, { useEffect, useRef, useState, ChangeEvent, KeyboardEvent, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../api/user";
import { useNavigate } from "react-router-dom";
import BackdropLoading from "./UI/BackdropLoading";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";
import Timer from "./UI/Timer";

type Props = {
  length?: number;
  onOtpSubmit?: (otp: string) => void;
  email?: string;
};

const OtpInput: React.FC<Props> = ({
  length = 4,
  onOtpSubmit = () => { },
}: Props) => {

  const [, setSendOTP] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State for submission progress
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const { mutate: verifyOTPMutation } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (response) => {
      console.log('otp verification -->> ', response)
      if (response.status === 200) {
        dispatch(setUser(response.data))
        setTimeout(() => navigate('/user/feed'), 800)
      }
    }
  })

    // const { mutate: forgotPasswordOtp} = useMutation({
    //   mutationFn: forgotPasswordOtpApi,
    //   onSuccess: () => {
    //     alert('success')
    //   }
    // })

    const verifyOTPCallback = useCallback((combinedOtp: string) => {
    setIsSubmitting(true);
    const userOTP = { 'otp': combinedOtp };
    onOtpSubmit(combinedOtp);
    verifyOTPMutation(userOTP);
  }, [onOtpSubmit, verifyOTPMutation])

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup function to clear interval

  }, [seconds]); // Dependency array remains the same

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);


    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      verifyOTPCallback(combinedOtp)
    }
    setSendOTP(combinedOtp)

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].setSelectionRange(1, 1);

      // optional
      if (index > 0 && !otp[index - 1]) {
        const emptyIndex = otp.indexOf("");
        if (inputRefs.current[emptyIndex]) {
          inputRefs.current[emptyIndex].focus();
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOTP = () => {
    // send a resend otp req to the backend
    setSeconds(60)
  }

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

export default OtpInput;
