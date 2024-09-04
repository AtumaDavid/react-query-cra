import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
// import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
  // return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
  // return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHerosData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess: onSuccess,
      onError,
      // select: (data) => {
      //   const superHeroesNames = data.data.map((hero) => hero.name);
      //   return superHeroesNames;
      // }, //automatically receives an api doc and an argument
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

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // 1
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueriesData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
