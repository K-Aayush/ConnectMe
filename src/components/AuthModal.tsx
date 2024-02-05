"use client"

import { useState } from "react";
import { Button } from "./index";

interface AuthModalProps {
    isVisible: boolean;
    onClose: () => void;
    setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    isSignUp: boolean;
}



const AuthModal = ({ isVisible, onClose, setIsSignUp, isSignUp }: AuthModalProps) => {

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (!isVisible) return null;


    const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.id === "container") {
            onClose();
        }
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            
        } catch (error) {
            
        }


    }



    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="relative bg-gradient-to-b from-[#fdbcdbcb] via-[#ffd6eacb] to-[#ffb5a4dc] p-8 rounded-xl">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="my-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52] text-3xl font-bold" >
                        {isSignUp ? 'Create Account' : 'Log In'}
                    </h1>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleSubmit}
                        action="">
                        <input
                            className="border border-slate-600 bg-transparent text-gray-900 text-md rounded-lg block w-full p-2.5"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />

                        <input
                            className="border border-slate-600 bg-transparent text-gray-900 text-md rounded-lg block w-full p-2.5"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required={true}
                            pattern=".{7,}"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />

                        {isSignUp &&<input
                            className="border border-slate-600 bg-transparent text-gray-900 text-md rounded-lg block w-full p-2.5"
                            type="password"
                            id="password-check"
                            name="password-check"
                            placeholder="Confirm Password"
                            required={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        />}

                        {isSignUp ? <Button
                            custom="border text-transparent bg-clip-text border-slate-500 hover:border-slate-900 bg-gradient-to-r from-[#e90b78] to-[#f06e52]"
                            label="Create"
                            onClick={() => { }}
                        /> :  
                        <Button
                            custom="border text-transparent bg-clip-text border-slate-500 hover:border-slate-900 bg-gradient-to-r from-[#e90b78] to-[#f06e52]"
                            label="Log In"
                            onClick={() => { }}
                        />
                        }
                        <hr />
                    </form>

                     <p className="text-black text-xl">
                        Find Your Soulmate
                    </p> 
                </div>
                <div
                    onClick={handleOnClose}
                    className="cursor-pointer absolute top-2 right-4"
                >
                    <span id="container" className="text-gray-600 text-2xl">×</span>
                </div>

            </div>
        </div>
    )
}

export default AuthModal
