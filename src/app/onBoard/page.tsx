'use client'

import { Button } from '@/components';
import { useCookies } from "react-cookie";
import { useState } from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";


const OnBoard = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [cookies, setCookie, removeCookie]:any = useCookies(['user']);
    const [formData, setFormData] = useState({
        "email": cookies.email,
        "first_name": "",
        "dob": "",
        "gender_identity": "man",
        "show_gender": true,
        "gender_interest": "woman",
        "photos": [],
        "about": "",
        "matches": []
    })

    let navigate = useRouter();

    const handleSubmit = async (e: any) => {
        console.log('submit')
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/user/${formData.email}`, { formData })

            if (response.status === 200) {
                navigate.push('/Dashboard');
            }
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
        }));
        console.log(formData,"Form Data")
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setProfileImage(file);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
                <div className="flex flex-col items-center justify-center w-full flex-1 px-8 md:px-16 lg:px-20 text-center">

                    {/* outer container for entire content */}
                    <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">

                        {/* Left side - Account creation form */}
                        <div className="w-full md:w-3/5 p-4 md:p-8">
                            <div className="text-left font-bold">
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">Connect</span>Me
                            </div>
                            <div className="py-6 md:py-10">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52] mb-2">Create Account</h2>
                                <div className="border-2 w-10 border-[#e90b78] inline-block"></div>
                            </div>

                            {/* Form elements */}
                            <form className="w-full">
                                <div className="flex flex-col">
                                    <label htmlFor="first_name" className="text-slate-800 font-semibold text-start">First Name</label>
                                    <input
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        placeholder="John"
                                        required={true}
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-slate-800 font-semibold text-start">Date of Birth</label>
                                    <input
                                        id="Date_of_Birth"
                                        name="dob"
                                        type="date"
                                        value={formData.dob}
                                        className="border w-fit p-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 ease-linear transition-all duration-150 my-2"
                                        required={true}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-slate-800 font-semibold text-start">Gender</label>
                                    <div className="flex flex-row gap-2 my-2">
                                        <label tabIndex={0} htmlFor="man-gender-identity" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
                                            <input
                                                id="man-gender-identity"
                                                tabIndex={-1}
                                                type="radio"
                                                name="gender_identity"
                                                value="man"
                                                checked={formData.gender_identity === 'man'}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className="text-sm"> Man </span>
                                        </label>

                                        <label tabIndex={0} htmlFor="woman-gender-identity" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
                                            <input
                                                id="woman-gender-identity"
                                                tabIndex={-1}
                                                type="radio"
                                                name="gender_identity"
                                                checked={formData.gender_identity === 'woman'}
                                                value="woman"
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className="text-sm"> Woman </span>
                                        </label>

                                        <label tabIndex={0} htmlFor="other-gender-identity" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
                                            <input
                                                id="other-gender-identity"
                                                tabIndex={-1}
                                                type="radio"
                                                name="gender_identity"
                                                checked={formData.gender_identity === 'other'}
                                                value="other"
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className="text-sm"> Other </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-2 my-2">
                                    <input
                                        id="show-gender"
                                        type="checkbox"
                                        name="show_gender"
                                        onChange={handleChange}
                                        className="accent-pink-500"
                                    />
                                    <label htmlFor="show-gender" className="text-sm">Show gender on my profile</label>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-slate-800 font-semibold text-start">Show Me</label>
                                    <div className="flex flex-row gap-2 my-2">
                                        <label tabIndex={0} htmlFor="man-gender-interest" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
                                            <input
                                                id="man-gender-interest"
                                                tabIndex={-1}
                                                type="radio"
                                                name="gender_interest"
                                                checked={formData.gender_interest === 'man'}
                                                value="man"
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className="text-sm"> Man </span>
                                        </label>

                                        <label tabIndex={0} htmlFor="woman-gender-interest" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
                                            <input
                                                id="woman-gender-interest"
                                                tabIndex={-1}
                                                type="radio"
                                                name="gender_interest"
                                                checked={formData.gender_interest === 'woman'}
                                                value="woman"
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className="text-sm"> Woman </span>
                                        </label>

                                        <label tabIndex={0} htmlFor="everyone-gender-interest" className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
                                            <input
                                                id="everyone-gender-interest"
                                                tabIndex={-1}
                                                type="radio"
                                                name="gender_interest"
                                                checked={formData.gender_interest === 'everyone'}
                                                value="everyone"
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span className="text-sm"> Everyone </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-slate-800 font-semibold text-start" htmlFor='about'>
                                        About Me
                                    </label>
                                    <textarea
                                        id="about"
                                        typeof="text"
                                        name="about"
                                        rows={4}
                                        placeholder="Hi i am....."
                                        value={formData.about}
                                        onChange={handleChange}
                                        className="border border-gray-300 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-pink-500 w-full ease-linear transition-all duration-150 my-2"
                                    />
                                </div>

                                <div className="hidden md:flex text-start my-2">
                                    <Button
                                        gradient
                                        onClick={handleSubmit}
                                        label="Create Account"
                                    />
                                </div>

                            </form>
                        </div>

                        {/* Right side - Profile picture section */}
                        <div className="w-full md:w-2/5 py-8 md:py-36 px-4 sm:px-8 lg:px-12">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"> <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">Profile</span> Picture</h2>
                            <div className="border-2 w-8 border-[#f06e52] inline-block mb-2"></div>
                            <div className="flex flex-col">

                                {/* File input for uploading profile picture */}
                                <input
                                    id="photo"
                                    type="file"
                                    name="photo"
                                    value={formData.photos}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-2 items-start"
                                />

                                {/* Image preview */}
                                {profileImage && (
                                    <img
                                        src={URL.createObjectURL(profileImage)}
                                        alt="Profile Preview"
                                        className="rounded object-cover mt-2"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="md:hidden my-4">
                            <Button gradient onClick={handleSubmit} label="Create Account" />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default OnBoard
