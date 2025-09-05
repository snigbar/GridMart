// components/ControlledInput.tsx
import { Controller, type Control, type FieldError } from "react-hook-form";

interface ControlledInputProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  error?: FieldError;
  placeholder?: string;
  type?: string;
  name: string;
}

export const ControlledInput = ({
  label,
  name,
  control,
  error,
  placeholder,
  type = "text",
}: ControlledInputProps) => {
  return (
    <div className="md:basis-1/2">
      <label className="block text-[12px] 2xl:text-sm  font-medium text-left mb-1 text-black">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full px-3 py-2 text-sm border rounded-md bg-transparent mb-0 ${
              error
                ? "border-rose-500 ring-rose-200"
                : "border-black/80 focus:border-black/100"
            }`}
          />
        )}
      />

      {error ? (
        <p className="text-red-400 text-[6px] xl:text-xs font-bold text-left mt-1">
          {error.message}
        </p>
      ) : (
        <p className="text-red-400 text-[6px] xl:text-xs font-bold text-left mt-1 opacity-0">
          d
        </p>
      )}
    </div>
  );
};
