import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../../components/inputs/ControlledInput";
import { Link } from "react-router-dom";
import { ElavatedButton } from "../../components/Buttons/ElavatedButton";

import { registerUser } from "../../store/Reducers/Auth.Reducer";
import { useAppDispatch } from "../../store/hooks/hooks";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.email("Invalid email address."),
    password: z
      .string("Please Enter Password")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;"'<>,.?/~`-]).{8,20}$/,
        {
          message:
            "Password must include at least one letter, one number, and one special character",
        }
      ),
    confirmPassword: z.string("Please Re-Enter Password"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password didn't match",
      path: ["confirmPassword"],
    }
  );

export type TRegisterFormData = z.infer<typeof formSchema>;

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TRegisterFormData>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: TRegisterFormData) => {
    const result = await dispatch(registerUser(data));

    console.log("Dispatch resutl----------", result);

    if (registerUser.fulfilled.match(result)) {
      reset(); // 🎉 Clears all fields
    }

    console.log("Form submitted:", data);
  };

  return (
    <div className="h-screen bg-bg-gradient flex justify-center items-center">
      <div className="w-[356px] md:w-[480px] text-black rounded-lg">
        <div className="bg-[#f4f4f4] py-8 px-6 text-center shadow-sm mb-3 border-t border-l border-r-2 border-b-2  border-black">
          <h2 className="text-2xl font-bold">Wellcome to GridMart</h2>
          <p className="text-sm my-2 font-medium">
            Please Register To Your Account
          </p>

          {/* form */}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-1">
            <ControlledInput
              label="Name"
              control={control}
              error={errors.name}
              name="name"
            />
            <ControlledInput
              label="Email"
              control={control}
              error={errors.email}
              name="email"
            />
            <div className="md:flex gap-4">
              <ControlledInput
                label="Password"
                type="password"
                control={control}
                error={errors.password}
                name="password"
              />
              <ControlledInput
                label="Confirm Password"
                type="password"
                control={control}
                error={errors.confirmPassword}
                name="confirmPassword"
              />
            </div>
            <p className="text-center my-1 font-semibold text-[12px]">
              Already Have an Acoount?{" "}
              <Link to="/login" className="font-bold underline">
                Login
              </Link>
            </p>
            <ElavatedButton children="Register" />
          </form>
        </div>
      </div>
    </div>
  );
}
