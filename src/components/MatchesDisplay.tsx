"use client"

import axios from 'axios'
import { useState, useEffect } from 'react'

const MatchesDisplay = ({ matches }: any) => {
    const [matchedProfiles, setMatchedProfiles] = useState(null)

    const matchedUserIds = matches.map(({ user_id }: any) => user_id)

    const getMatches = async () => {
        try {
            const response = await axios.get("http://localhost:8000/matchedUsers", {
                params: {userIds: JSON.stringify(matchedUserIds)}
            })
            setMatchedProfiles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMatches()
    }, [])

    return (
        <div>

        </div>
    )
}

export default MatchesDisplay