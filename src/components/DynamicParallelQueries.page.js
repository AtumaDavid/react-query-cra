import React from "react";
import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId) => {
  //   const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export default function DynamicParallelQueriesPage({ heroIds }) {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["superhero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ queryResults });
  return <div>DynamicParallelQueriesPage</div>;
}
