import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  title: z
    .string({required_error: 'Amount Cannot be Blank'})
    .min(6, 'Todo Title must be more than 6 words'),

  detail: z
    .string({required_error: 'Detail Cannot be Blank'})
    .min(6, 'Todo Title must be more than 6 words'),
});
export type ToDoFormField = z.infer<typeof schema>;

export const useBlog = (initialValues?: ToDoFormField) => {
  const {control, handleSubmit} = useForm<ToDoFormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title || '',
      detail: initialValues?.detail || '',
    },
  });

  return {control, handleSubmit};
};
