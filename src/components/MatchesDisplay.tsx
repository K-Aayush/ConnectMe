"use client"

import axios from 'axios'
import { useState, useEffect } from 'react'

const MatchesDisplay = ({ matches, setClickedUser }: any) => {
    const [matchedProfiles, setMatchedProfiles] = useState<any>(null)

    const matchedUserIds = matches.map(({ user_id }: any) => user_id)

    const getMatches = async () => {
        try {
            const response = await axios.get("http://localhost:8000/matchedUsers", {
                params: { userIds: JSON.stringify(matchedUserIds) }
            })
            setMatchedProfiles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMatches()
    }, [])

    // console.log(matchedProfiles)

    return (
        <div className="p-[10px] h-[60vh] overflow-y-auto flex flex-col">
            {matchedProfiles?.map((match: any, index: number) => (
                <div key={index} onClick={() => setClickedUser(match)}>
                    <div className="flex gap-2 p-2 items-center hover:bg-gray-100 cursor-pointer rounded-md">
                        <img src="" alt="" className='w-10 h-10 rounded-full' />
                        <h3 className="text-lg font-medium">{match?.first_name}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MatchesDisplay