import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../../components/inputs/ControlledInput";
import { ElavatedButton } from "../../components/Buttons/ElavatedButton";
import { useAppDispatch } from "../../store/hooks/hooks";
import { adminLogin } from "../../store/Reducers/Auth.Reducer";

const adminLoginSchema = z.object({
  email: z.email("Please Enter Your Email Address"),
  password: z
    .string("Please Enter Your Password")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;"'<>,.?/~`-]).{8,20}$/,
      {
        message:
          "Password must include at least one letter, one number, and one special character",
      }
    ),
});

type TAdminLoginFormData = z.infer<typeof adminLoginSchema>;

export default function AdminLogin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TAdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const dispatch = useAppDispatch();
  const onSubmit = (data: TAdminLoginFormData) => {
    console.log("Admin login data:", data);
    // Add your admin login logic here
    dispatch(adminLogin(data));
  };

  return (
    <div className="h-screen bg-bg-gradient flex justify-center items-center">
      <div className="w-[356px] md:w-[480px] text-black rounded-lg">
        <div className="bg-[#f4f4f4] py-8 px-6 text-center shadow-sm mb-3 border-t border-l border-r-2 border-b-2 border-black">
          <h2 className="text-2xl font-bold">Admin Panel Login</h2>
          <p className="text-sm my-2 font-medium">
            Please login with your admin credentials
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <ControlledInput
              label="Email"
              name="email"
              control={control}
              error={errors.email}
              placeholder="Enter your admin email"
            />
            <ControlledInput
              label="Password"
              type="password"
              name="password"
              control={control}
              error={errors.password}
              placeholder="Enter your password"
            />

            <ElavatedButton>Login</ElavatedButton>
          </form>
        </div>
      </div>
    </div>
  );
}
