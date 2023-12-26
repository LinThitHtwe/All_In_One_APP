import {useQuery} from '@tanstack/react-query';

const fetchData = async apiFunction => {
  const response = await apiFunction();

  return response.data;
};

const useFetchData = (queryKey: string[], apiFunction) => {
  console.log('querykey---', queryKey);
  console.log('apiFunction---', apiFunction);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(apiFunction),
  });
};

export default useFetchData;
