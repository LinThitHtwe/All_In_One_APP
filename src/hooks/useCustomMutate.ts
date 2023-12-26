// import {useMutation, useQueryClient} from '@tanstack/react-query';

// const useCustomMutate = mutateFunction => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: mutateFunction,

//     onSuccess: data => {
//       console.log('Mutation successful:', data);
//       queryClient.invalidateQueries();
//     },

//     onError: error => {
//       console.error('Mutation error:', error);
//       // You can handle the error or perform additional actions here
//     },
//   });

//   return mutation;
// };

// export default useCustomMutate;
