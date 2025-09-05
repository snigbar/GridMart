import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../../components/inputs/ControlledInput";
import { Link } from "react-router-dom";
import { ElavatedButton } from "../../components/Buttons/ElavatedButton";

const loginSchema = z.object({
  email: z.email("Invalid email address."),
  password: z
    .string("Pleser Enter Password")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;"'<>,.?/~`-]).{8,20}$/,
      {
        message:
          "Password must include at least one letter, one number, and one special character",
      }
    ),
});

type TLoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginFormData) => {
    console.log("Login data:", data);
  };

  return (
    <div className="h-screen bg-auth-background bg-center flex justify-center items-center bg-no-repeat bg-cover">
      <div className="w-[356px] md:w-[480px] 2xl:w-[560px] text-black rounded-lg">
        <div className="bg-gray-100 py-8 px-6 text-center shadow-sm mb-3 border-t border-l border-r-2 border-b-2 border-black">
          <h2 className="text-2xl font-bold">Welcome Back to GridMart</h2>
          <p className="text-sm my-2 font-medium">
            Please login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-1">
            <ControlledInput
              label="Email"
              name="email"
              control={control}
              error={errors.email}
              placeholder="Enter your email"
            />
            <ControlledInput
              label="Password"
              type="password"
              name="password"
              control={control}
              error={errors.password}
              placeholder="Enter your password"
            />

            <p className="text-center my-1 font-semibold text-[12px]">
              Don't have Acoount?{" "}
              <Link to="/register" className="font-bold underline">
                Register
              </Link>
            </p>

            <ElavatedButton children="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}
