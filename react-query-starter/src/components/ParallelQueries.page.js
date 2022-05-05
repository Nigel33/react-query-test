import React from 'react'
import { useParams } from 'react-router-dom'
import { useSuperHeroData } from '../hooks/useSuperHerodata'

const onSuccess = (data) => {
  console.log("success")
}

const onError = (error) => {
  console.log("error")
}

export const ParallelQueriesPage = () => {
  const { heroId } = useParams()
  const { isLoading, error, isError, data }= useSuperHeroData(
    heroId,
    onSuccess,
    onError
  )

  if (isLoading) {
    return <h2>Loading</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  
  return (
    <div>
      Super hero details 
      {
        data?.data.name
      }
    </div>
  )
} 