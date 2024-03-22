"use client"

import { useState } from 'react'
import { IoMenuSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Menu = () => {
    const [Menu, setMenu] = useState<boolean>(false)

    return (
        <div>
            <div onClick={() => setMenu(true)} className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full">
                <IoMenuSharp size={30} />
            </div>

            <div className={`fixed h-full w-screen bg-black/50 backdrop-blur-sm -top-0 left-0 z-10 transition-all translate-x-full ${Menu && "-translate-x-0"}`}>
                <div className="bg-white flex-col absolute right-0 top-0 h-screen p-4 gap-8 z-50 sm:w-2/3 md:w-1/3 w-full">
                    <div onClick={() => setMenu(false)} className="mb-8 text-3xl cursor-pointer rounded-full hover:bg-gray-100 w-fit p-3">
                        <RxCross1 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu