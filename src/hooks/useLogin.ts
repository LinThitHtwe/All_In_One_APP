import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  email: z.string().email().min(3, 'Email should be more than 3 word'),
  password: z
    .string({required_error: 'Password Cannot be Blank'})
    .min(6, 'Password must be more than 6 characters')
    .max(20, 'Password shouldnt be more than 20 character'),
});

export type LoginFormField = z.infer<typeof schema>;

export const useLogin = (initialValues?: LoginFormField) => {
  const {control, handleSubmit} = useForm<LoginFormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return {control, handleSubmit};
};
