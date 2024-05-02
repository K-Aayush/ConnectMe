'use client'

import { useEffect } from 'react';
import { Button } from '@/components';
import { useCookies } from "react-cookie";
import { useState } from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from 'react-icons/im';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const ChangeAdminPassword = () => {
    const [cookies, setCookie, removeCookie]: any = useCookies(['admin']);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const user = cookies.admin_id;

    let navigate = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (formData.newPassword !== formData.confirmPassword) {
                throw new Error("New password and confirm password do not match");
            }

            const response = await axios.post(`http://localhost:8000/admin-change-password`, {
                admin_id: user,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });

            if (response.status === 200) {
                navigate.push("/AdminDashboard");
            } else {
                throw new Error("Failed to change password");
            }
        } catch (error) {
            console.error("Error changing password:", error);
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
                                <Link href={'/AdminDashboard'}>
                                    <span className="flex justify-start items-center gap-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52]"><FaArrowLeft className='text-black' /> Dashboard</span>
                                </Link>
                            </div>
                            <div className="py-6 md:py-10">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52] mb-2">Change Password</h2>
                                <div className="border-2 w-10 border-[#e90b78] inline-block"></div>
                            </div>

                            <form className="w-full">
                                <div className="flex flex-col">
                                    <label htmlFor="oldPassword" className="text-slate-800 font-semibold text-start">Old Password</label>
                                    <input
                                        id="oldPassword"
                                        type="password"
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="newPassword" className="text-slate-800 font-semibold text-start">New Password</label>
                                    <input
                                        id="newPassword"
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="confirmPassword" className="text-slate-800 font-semibold text-start">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                        required
                                    />
                                </div>

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
        </>
    )
}

export default ChangeAdminPassword
