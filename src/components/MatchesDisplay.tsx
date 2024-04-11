"use client"

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const MatchesDisplay = ({ matches, setClickedUser }: any) => {
    const [matchedProfiles, setMatchedProfiles] = useState<any>(null)
    const [cookies, setCookie, removeCookie] = useCookies();

    const matchedUserIds = matches.map(({ user_id }: any) => user_id)
    const userId = cookies.user_id

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
    }, [matches])

    const filteredMatchedProfiles = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id == userId).length > 0)


    return (
        <div className="p-[10px] h-[60vh] overflow-y-auto flex flex-col">
            {filteredMatchedProfiles?.map((match: any, index: number) => (
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