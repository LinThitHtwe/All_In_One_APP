import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  title: z
    .string({required_error: 'Amount Cannot be Blank'})
    .min(3, 'Todo Title must be more than 3 words'),

  description: z.string().optional(),
});
export type ToDoFormField = z.infer<typeof schema>;

export const useTodos = (initialValues?: ToDoFormField) => {
  const {control, handleSubmit} = useForm<ToDoFormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
    },
  });

  return {control, handleSubmit};
};
