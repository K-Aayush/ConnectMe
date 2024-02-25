import React from 'react'
import { LuMessagesSquare } from "react-icons/lu";
import { IoMenuSharp } from "react-icons/io5";

const Header = () => {
    return (
        <div className="flex items-center justify-between z-[100] mx-2 mt-2">
            <div className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full">
                <LuMessagesSquare size={30} />
            </div>

            <img
                className="object-contain h-[50px]"
                src="/Image/connectme logo.png"
                alt='Logo'
            />

            <div className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full">
                <IoMenuSharp size={30} />
            </div>
        </div>
    )
}

export default Header