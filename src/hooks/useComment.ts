import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const schema = z.object({
  comment: z
    .string({required_error: 'Comment Cannot be Blank'})
    .min(3, 'Comment must be more than 3 words'),
});
export type CommentFormField = z.infer<typeof schema>;

export const useComment = (initialValues?: CommentFormField) => {
  const {control, handleSubmit} = useForm<CommentFormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: initialValues?.comment || '',
    },
  });

  return {control, handleSubmit};
};
