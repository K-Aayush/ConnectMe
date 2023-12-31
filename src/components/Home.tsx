"use client"

import { Button, NavBar } from "./index"



const HomePage = () => {
    return (
        <div className="">

            <NavBar />

            <div className="text-center">
                <h1 className="text-md font-semibold md:text-xl lg:text-3xl lg:font-bold p-4">
                    Spark Connections: Your Perfect Match Awaits!
                </h1>
                <Button
                    gradient
                    custom="text-white tracking-wide"
                    label="Create Account"
                    onClick={() => { }}
                />
            </div>
        </div>

    )
}

export default HomePage
