import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("perform side effect after encountering error", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess: onSuccess,
      onError,
    },
    {
      // cacheTime: 10000,
      // staleTime: 30000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true, default
      // refetchInterval: 2000 polling(2sec)
      // refetchIntervalInBackground: true
      // enabled: false,
    }
  );

  console.log(`loading: ${isLoading}`, `fetching: ${isFetching}`);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* <button onClick={refetch}>Fetch heros</button> //enabled */}
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
