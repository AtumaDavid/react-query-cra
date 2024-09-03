import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHerosData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess: onSuccess,
      onError,
      select: (data) => {
        const superHeroesNames = data.data.map((hero) => hero.name);
        return superHeroesNames;
      }, //automatically receives an api doc and an argument
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
};
