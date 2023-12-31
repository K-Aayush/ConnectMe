"use client"

import Image from "next/image"
import { Button } from "./index"

const NavBar = () => {
    return (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <Image
                        src={"/Image/connectme logo.png"}
                        objectFit="cover"
                        width={90}
                        height={0}
                        alt={""}
                    />
                </div>

                <Button
                    label="Log In"
                    custom="border text-transparent bg-clip-text border-slate-500 hover:border-slate-900 bg-gradient-to-r from-[#e90b78] to-[#f06e52]"
                    onClick={() => { }}
                />
            </div>
        </nav>
    )
}

export default NavBar
