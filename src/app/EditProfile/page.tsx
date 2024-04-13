'use client'

import { useEffect } from 'react';
import { Button } from '@/components';
import { useCookies } from "react-cookie";
import { useState } from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from 'react-icons/im';

const EditProfile = () => {
    const [profileImage, setProfileImage] = useState<any>();
    const [cookies, setCookie, removeCookie]: any = useCookies(['user']);
    const [loading, setLoading] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [formData, setFormData] = useState({
        "user_id": cookies.user_id,
        "first_name": "",
        "dob": "",
        "gender_identity": "",
        "gender_interest": "",
        "about": "",
    })

    const maxWords = 50; 

    let navigate = useRouter();

    useEffect(() => {
        if (!cookies.user_id) {
            navigate.push('/');
        } else {
            const fetchUserData = async () => {
                setLoading(true);
                try {
                    const userId = cookies.user_id;
                    const response = await axios.get("http://localhost:8000/user", {
                        params: { userId }
                    });
                    const userData = response.data;

                    setFormData({
                        user_id: userData.user_id,
                        first_name: userData.first_name,
                        dob: userData.dob,
                        gender_identity: userData.gender_identity,
                        gender_interest: userData.gender_interest,
                        about: userData.about,
                    });

                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [cookies]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userUpdateResponse = await axios.put(`http://localhost:8000/user/${formData.user_id}`, { formData });

            if (userUpdateResponse.status !== 200) {
                throw new Error('Failed to update user information');
            }

            navigate.push('/Profile');

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        const wordArray = value.split(/\s+/);
        const currentWordCount = wordArray.filter(word => word !== '').length;
        setWordCount(currentWordCount);

        if (currentWordCount <= maxWords) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
            }));
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
                <div className="flex flex-col items-center justify-center w-full flex-1 px-8 md:px-16 lg:px-20 text-center">

                    {/* outer container for entire content */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl md:max-w-3xl">

                        {/* Account creation form */}
                        <div className="w-full p-4 md:p-8">
                            <div className="text-left font-bold">
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">Connect</span>Me
                            </div>
                            <div className="py-6 md:py-10">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#e90b78] to-[#f06e52] mb-2">Edit Profile</h2>
                                <div className="border-2 w-10 border-[#e90b78] inline-block"></div>
                            </div>

                            {/* Form elements */}
                            <form className="w-full" encType="multipart/form-data">
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

                                <div className="flex justify-center my-2">
                                    <Button
                                        gradient
                                        onClick={handleSubmit}
                                        label="Edit Profile"
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

export default EditProfile
