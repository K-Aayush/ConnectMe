"use client"

import React, { useState } from 'react';
import { Button } from '@/components';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from 'react-icons/im';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from "react-icons/fa6";


const ChangePassword = () => {
    const [cookies] = useCookies(['user']);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState("");

    const user = cookies.user_id;
    let navigate = useRouter();

    const validate = () => {
        let tempErrors: { [key: string]: string } = {};

        if (!formData.oldPassword) {
            tempErrors.oldPassword = "Old Password is required";
        }

        if (!formData.newPassword) {
            tempErrors.newPassword = "New Password is required";
        } else if (formData.newPassword.length < 7) {
            tempErrors.newPassword = "New Password must be at least 7 characters";
        } else if (!/[!@#$%^&*]/.test(formData.newPassword)) {
            tempErrors.newPassword = "New Password must contain at least one special character (!@#$%^&*)";
        } else if (!/\d/.test(formData.newPassword)) {
            tempErrors.newPassword = "New Password must contain at least one number";
        }

        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.newPassword !== formData.confirmPassword) {
            tempErrors.confirmPassword = "New Password and Confirm Password must match";
        }


        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!validate()) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/change-password`, {
                user_id: user,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });

            if (response.status === 200) {
                setSuccessMessage("Password changed successfully.");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate.push("/Dashboard");
                }, 2000);
            } else {
                throw new Error("Failed to change password");
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">
                <div className="flex flex-col items-center justify-center w-full flex-1 px-8 md:px-16 lg:px-20 text-center">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl md:max-w-3xl">
                        <div className="w-full p-4 md:p-8">
                            <div className="text-left font-bold">
                                <Link href={'/Dashboard'}>
                                    <span className="flex justify-start items-center gap-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52]"><FaArrowLeft className='text-black' /> Dashboard</span>
                                </Link>
                            </div>
                            <div className="py-6 md:py-10">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52] mb-2">Change Password</h2>
                                <div className="border-2 w-10 border-[#e90b78] inline-block"></div>
                            </div>

                            <form className="w-full">
                                <div className="flex flex-col relative">
                                    <label htmlFor="oldPassword" className="text-slate-800 font-semibold text-start">Old Password</label>
                                    <input
                                        id="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2.5 pr-10 block w-full focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                        required
                                    />
                                    <div className="absolute top-[45px] right-0 flex items-center pr-3">
                                        {showOldPassword ? (
                                            <FaEye className="text-gray-500 cursor-pointer" onClick={() => setShowOldPassword(false)} />
                                        ) : (
                                            <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={() => setShowOldPassword(true)} />
                                        )}
                                    </div>
                                </div>
                                {errors && <p className="text-red-500">{errors.oldPassword}</p>}

                                <div className="flex flex-col relative">
                                    <label htmlFor="newPassword" className="text-slate-800 font-semibold text-start">New Password</label>
                                    <input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2.5 pr-10 block w-full focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                        required
                                    />
                                    <div className="absolute top-[45px] right-0 flex items-center pr-3">
                                        {showNewPassword ? (
                                            <FaEye className="text-gray-500 cursor-pointer" onClick={() => setShowNewPassword(false)} />
                                        ) : (
                                            <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={() => setShowNewPassword(true)} />
                                        )}
                                    </div>
                                </div>
                                {errors && <p className="text-red-500">{errors.newPassword}</p>}

                                <div className="flex flex-col relative">
                                    <label htmlFor="confirmPassword" className="text-slate-800 font-semibold text-start">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2.5 pr-10 block w-full focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                        required
                                    />
                                    <div className="absolute top-[45px] right-0 flex items-center pr-3">
                                        {showConfirmPassword ? (
                                            <FaEye className="text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
                                        ) : (
                                            <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
                                        )}
                                    </div>
                                </div>
                                {errors && <p className="text-red-500">{errors.confirmPassword}</p>}

                                <div className="flex justify-center my-4 gap-4">
                                    <Button
                                        onClick={handleSubmit}
                                        custom='w-1/3'
                                        gradient
                                        label="Save"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <ImSpinner2 className="animate-spin h-12 w-12 text-white" />
                </div>
            )}
            {successMessage && (
                <div className="fixed top-0 left-0 w-full flex justify-center items-center">
                    <div className="bg-white border border-gray-300 rounded-md p-4 shadow-md">
                        <p>{successMessage}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChangePassword;
