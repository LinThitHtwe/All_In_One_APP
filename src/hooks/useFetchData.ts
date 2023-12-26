import {useQuery} from '@tanstack/react-query';

const fetchData = async apiFunction => {
  const response = await apiFunction();
  // console.log('response--', response.data);
  return response.data;
};

const useFetchData = (queryKey: string[], apiFunction: any) => {
  // console.log('queryKey----', queryKey);
  // console.log('apiFunction----', apiFunction);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(apiFunction),
  });
};

export default useFetchData;
