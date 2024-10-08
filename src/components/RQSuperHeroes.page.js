// import axios from "axios";
// import { useQuery } from "react-query";

import { Link } from "react-router-dom";
import {
  useSuperHerosData,
  useAddSuperHeroData,
} from "../hooks/useSuperHerosData";
import { useState } from "react";

// const fetchSuperHeroes = () => {
//   return axios.get("http://localhost:4000/superheroes");
// };

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("perform side effect after encountering error", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHerosData(onSuccess, onError);
  // useQuery(
  //   "super-heroes",
  //   fetchSuperHeroes,
  //   {
  //     onSuccess: onSuccess,
  //     onError,
  //     select: (data) => {
  //       const superHeroesNames = data.data.map((hero) => hero.name);
  //       return superHeroesNames;
  //     }, //automatically receives an api doc and an argument
  //   },
  //   {
  //     // cacheTime: 10000,
  //     // staleTime: 30000,
  //     // refetchOnMount: true,
  //     // refetchOnWindowFocus: true, default
  //     // refetchInterval: 2000 polling(2sec)
  //     // refetchIntervalInBackground: true
  //     // enabled: false,
  //   }
  // );

  const { mutate: addHero } = useAddSuperHeroData();

  console.log(`loading: ${isLoading}`, `fetching: ${isFetching}`);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* <button onClick={refetch}>Fetch heros</button> //enabled */}
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {/* {data.map((heroName, index) => {
        return <div key={index}>{heroName}</div>;
      })} */}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
