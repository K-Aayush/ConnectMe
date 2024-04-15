"use client"

import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';

const MatchesDisplay = ({ matches, setClickedUser }: any) => {
  const [matchedProfiles, setMatchedProfiles] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const userId = cookies.user_id;

  const getMatches = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/matchedUsers", {
        params: { userIds: JSON.stringify(matches.map(({ user_id }: any) => user_id)) }
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  const handleUnmatch = async () => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:8000/unmatch/${userId}/${selectedMatch.user_id}`);
      getMatches();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMenuVisible(false);
    }
  };

  const toggleMenu = (match: any) => {
    setSelectedMatch(match);
    setMenuVisible(!menuVisible);
  };


  const filteredMatchedProfiles = matchedProfiles?.filter(matchedProfile =>
    matchedProfile.matches.some(profile => profile.user_id === userId)
  );

  return (
    <div className="p-[10px] h-[60vh] overflow-y-auto flex flex-col">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ImSpinner2 size={30} className='animate-spin' />
        </div>
      ) : (
        filteredMatchedProfiles?.map((match: any, index: number) => (
          <div key={index} className='flex gap-2 p-2 items-center justify-between hover:bg-gray-100 cursor-pointer rounded-md'>
            <div onClick={() => setClickedUser(match)} className="w-full">
              <div className='flex items-center gap-2'>
                <img src={`uploads/${match.photo}`} alt="" className="w-[50px] h-[50px] rounded-full" />
                <h3 className="text-lg font-medium">{match?.first_name}</h3>
              </div>
            </div>
            <div className='relative'>
              <div className=''>
                <BsThreeDotsVertical size={25} onMouseDown={() => toggleMenu(match)} />
              </div>
              {menuVisible && selectedMatch && selectedMatch.user_id === match.user_id && (
                <div className="absolute right-1 top-[40px] bg-white shadow-md rounded-md p-3 w-36">
                  <ul className="flex flex-col gap-2">
                    <li onClick={handleUnmatch} className='cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md'>Unmatch</li>
                    <li className='cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md'>
                      <Link href={`/userProfile/${match.user_id}`}>
                        <div className=''>View Profile</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchesDisplay;
