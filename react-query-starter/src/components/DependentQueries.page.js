import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = email => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchContentByChannelId = channelId => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = () => {
    const email = 'test@test.com'
    const { data: user }= useQuery(
        ['user', email],
        () =>fetchUserByEmail(email)
    )
    const channelId = user?.data.channelId;

    useQuery(
        ['content', channelId],
        () => fetchContentByChannelId(channelId), {
            enabled: !!channelId //only call when channel Id is available 
        }
    )
    return(
        <div>Dependent Queries</div>
    ) 
}