import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  email: z.string().email().min(3, 'Email should be more than 3 word'),
  password: z
    .string({required_error: 'Password Cannot be Blank'})
    .min(6, 'Password must be more than 6 characters'),
});

export type ToDoFormField = z.infer<typeof schema>;

export const useLoginSignup = (initialValues?: ToDoFormField) => {
  const {control, handleSubmit} = useForm<ToDoFormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return {control, handleSubmit};
};
