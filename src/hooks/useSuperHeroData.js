import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes") // Get the cached "super-heroes" data
        ?.data?.find((hero) => hero.id === parseInt(heroId)); // Find the hero by ID

      if (hero) {
        return {
          data: hero, // Return the hero if found
        };
      } else {
        return undefined; // Return undefined to trigger a fresh fetch
      }
    },
  });
};
