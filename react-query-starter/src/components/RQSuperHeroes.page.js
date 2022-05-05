import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

const onSuccess = (data) => {
  console.log("success")
}

const onError = (error) => {
  console.log("error")
}

export const RQSuperHeroesPage = () => {
  const { isLoading, isFetching, data, isError, error, refetch } = useSuperHeroesData(onSuccess, onError)

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
      {
        data?.data.map((hero) => {
          return <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        })
      }
      
    </>
  )
}
