import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z
  .object({
    name: z
      .string({required_error: 'Name cannot be blank'})
      .min(2, 'Name should be more than 2 characters'),
    email: z.string().email().min(3, 'Email should be more than 3 characters'),
    password: z
      .string({required_error: 'Password Cannot be Blank'})
      .min(6, 'Password must be more than 6 characters')
      .max(20, 'Password should not be more than 20 characters'),
    confirmPassword: z.string({
      required_error: 'Confirm Password Cannot be Blank',
    }),
  })
  .refine(data => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormField = z.infer<typeof schema>;

export const useRegister = (initialValues?: RegisterFormField) => {
  const {control, handleSubmit} = useForm<RegisterFormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return {control, handleSubmit};
};
