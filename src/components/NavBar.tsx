"use client"

import Image from "next/image"
import { Button } from "./index"

// Defining Navbar Component
const NavBar = ({ setIsSignUp, setShowModal, showLoginButton = true }: any) => {

    // Function to handle the "Log In" button click
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    }

    return (
        <nav className="">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div>
                    <Image
                        src={"/Image/connectme logo.png"}
                        objectFit="cover"
                        width={100}
                        height={100}
                        alt={""}
                    />
                </div>

                {showLoginButton && <Button
                    label="Log In"
                    custom="border text-transparent bg-clip-text border-slate-500 hover:border-slate-900 bg-gradient-to-r from-[#e90b78] to-[#f06e52]"
                    onClick={handleClick}
                />}
            </div>
        </nav>
    )
}

export default NavBar
