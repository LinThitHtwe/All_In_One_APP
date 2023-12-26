import {useMutation, useQueryClient} from '@tanstack/react-query';

const useCustomMutate = (mutationKey: string[], apiFunction: any) => {
  const queryClient = useQueryClient();

  const mutateData = async () => {
    const response = await apiFunction();
    return response.data;
  };

  const mutation = useMutation(mutateData, {
    onSuccess: data => {
      queryClient.invalidateQueries(mutationKey);
    },
  });

  return mutation;
};

export default useCustomMutate;
