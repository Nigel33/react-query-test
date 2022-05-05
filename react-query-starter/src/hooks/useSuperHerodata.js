import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'


const fetchSuperHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`); 
}

// export const useSuperHeroData = (id, onSuccess, onError) => {
//   return useQuery(
//     ['super-hero', id], 
//     () => fetchSuperHero(id),
//     {
//       // refetchOnMount: true default value is true
//       //refetchOnWindowFocus: true default value 
//       // cacheTime: 10000,//default time is 5 mins
//       // refetchInterval: 1000 default is 0 - but we can set time to keep on polling data,
//       // refetchIntervalInBackground: false //will maintain teh refetch interval even if window not in focus
//       staleTime: 50000, //default value is 0.This means that we are ok with showing users stale data for 50s. 
//       onSuccess: onSuccess,
//       onError: onError,
//       // select: data => {
//       //   return data.data.map(hero => hero.name)
//       // }
//       //there is filter as well
//     }
//   )
// }

//initial query data

export const useSuperHeroData = heroId => {
  const queryClient = useQueryClient()
  return useQuery(
    ['super-hero', heroId], 
    () => fetchSuperHero(heroId),
    {
      initialData: () => {
        const hero = queryClient.
          getQueryData('super-heroes')?.data?.
          find(hero => hero.id === heroId)
      
        if (hero) {
          return {data: hero} 
        } else {
          return undefined
        }                
      }
    }
  )
}