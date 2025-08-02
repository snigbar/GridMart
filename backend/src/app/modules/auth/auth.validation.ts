import z, { email } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string('Name is Required')
      .min(4, 'At least 4 character long')
      .max(30, 'maximu lenght is 30 character'),
    email: z.email('Email is Required'),
    password: z
      .string('Please Enter Password')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;"'<>,.?/~`-]).{8,20}$/, {
        message: 'Password must include at least one letter, one number, and one special character',
      }),
  }),
});

export default {
  registerValidationSchema,
};
