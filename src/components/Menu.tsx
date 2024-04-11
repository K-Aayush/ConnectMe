"use client"

import { useState } from 'react'
import { IoMenuSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useCookies } from 'react-cookie';

const Menu = () => {
    const [menu, setMenu] = useState<boolean>(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const logout = () => {
        removeCookie('user_id' as 'user', cookies.userId)
        removeCookie('AuthToken' as 'user', cookies.token)
        window.location.reload()
    }


    return (
        <div>
            <div onClick={() => setMenu(!menu)} className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full">
                {!menu ? <IoMenuSharp size={30} /> : <RxCross1 size={30} />}
            </div>

            {menu && (
                <div className="flex flex-col absolute top-[5.5rem] right-[0.3rem] w-[120px] p-[15px] rounded-[6px] bg-gray-100 border border-solid border-gray-400 before:absolute before:top-[-0.8rem] before:right-[1.2rem] before:w-[25px] before:h-[25px] before:bg-gray-100 before:transform before:rotate-45 before:border-l before:border-t before:border-gray-400">
                    <ul className="flex flex-col gap-4">
                        <li className='cursor-pointer'>Profile</li>
                        <li onClick={logout} className='cursor-pointer'>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Menu