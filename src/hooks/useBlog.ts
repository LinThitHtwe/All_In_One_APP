import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  title: z
    .string({required_error: 'Blog Title Cannot be Blank'})
    .min(6, 'Blog Title must be more than 6 words'),

  content: z
    .string({required_error: 'Blog Content Cannot be Blank'})
    .min(20, 'Blog Content must be more than 20 words'),

  picture: z.string().optional(),
});
export type ToDoFormField = z.infer<typeof schema>;

export const useBlog = (initialValues?: ToDoFormField) => {
  const {control, handleSubmit} = useForm<ToDoFormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title || '',
      content: initialValues?.content || '',
      picture: initialValues?.picture || '',
    },
  });

  return {control, handleSubmit};
};
