import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPPattern({ value, setValue, className }) {
  console.log("first");
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={value}
      onChange={(value) => setValue(value)}
    >
      <InputOTPGroup className="flex gap-3 w-full">
        <InputOTPSlot
          index={0}
          className="w-11 h-11 text-center hidden text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={0}
          className="w-11 h-11 text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={1}
          className="w-11 h-11 text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={2}
          className="w-11 h-11 text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={3}
          className="w-11 h-11 text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={4}
          className="w-11 h-11 text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={5}
          className="w-11 h-11 text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={5}
          className="w-11 h-11 text-center hidden text-lg border border-gray-400 rounded-2xl"
        />
      </InputOTPGroup>
    </InputOTP>
  );
}
