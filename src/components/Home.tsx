"use client"

import { Button, NavBar } from "./index"



const HomePage = () => {
    return (
        <div className="realative">
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
                        onClick={() => { }}
                    />
                </div>
            </div>
        </div>

    )
}

export default HomePage
