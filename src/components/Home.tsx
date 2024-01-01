/* eslint-disable @next/next/no-img-element */
"use client"

import { Button, NavBar, AuthModal } from "./index";
import { useState } from "react";



const HomePage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOnClose = () => setShowModal(false);

    return (
        <div className="">
            <img
                src="/Image/dating.jpg"
                alt="Background"
                className="w-full h-full object-cover absolute bg-blend-overlay"
            />
            <div className="relative">
                <NavBar />

                <div className="my-[30vh] text-center">
                    <h1 className="text-xl text-white font-semibold md:text-3xl lg:text-6xl lg:font-bold p-6">
                        Your Perfect Match Awaits!
                    </h1>
                    <Button
                        gradient
                        custom="text-white tracking-wide"
                        label="Create Account"
                        onClick={() => setShowModal(true)}
                    ></Button>

                    <AuthModal isVisible={showModal} onClose={handleOnClose} />
                </div>
            </div>
        </div>

    )
}

export default HomePage
