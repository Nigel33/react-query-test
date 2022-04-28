import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes'); 
}

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("success")
  }

  const onError = (error) => {
    console.log("error")
  }
  
  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes', 
    fetchSuperHeroes,
    {
      // refetchOnMount: true default value is true
      //refetchOnWindowFocus: true default value 
      // cacheTime: 10000,//default time is 5 mins
      // refetchInterval: 1000 default is 0 - but we can set time to keep on polling data,
      // refetchIntervalInBackground: false //will maintain teh refetch interval even if window not in focus
      staleTime: 50000, //default value is 0.This means that we are ok with showing users stale data for 50s. 
      onSuccess: onSuccess,
      onError: onError,
      select: data => {
        return data.data.map(hero => hero.name)
      }
      //there is filter as well
    }
  )

  console.log({ isLoading, isFetching});
  //isfetching is teh background job which runs when theres a change in data.

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>      
      {/* {
        data?.data.map((hero) => {
          return <div key={hero.name}>{hero.name}</div>
        })
      } */}
      {
        data.map(heroName => {
          return <div key={heroName}>{heroName}</div>
        })
      }
    </>
  )
}
