import { useQueries, useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'

const fetchColors = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(2)

    const { isLoading, isError, error, data } = useQuery(
        ['colors', pageNumber], 
        () => fetchColors(pageNumber)
    );

    return (
        <div>
            {data?.data.map(color => {
                return (
                    <div>
                        <h2>{color.id} {color.label}</h2>
                    </div>
                )
            })}
            <div>
                <button disabled={pageNumber === 1} onClick={() => setPageNumber(page => page -1)}>Prev page</button>
                <button onClick={() => setPageNumber(page => page +1)}>Next page</button>
            </div>
        </div>
    )
}