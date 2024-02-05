'use client'

import { useState } from 'react'
import { NavBar } from '@/components'


const OnBoard = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const handleSubmit = () => {
        console.log('submit')
    }

    const handleChange = () => {
        console.log('change')
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setProfileImage(file);
        }
    }

    return (
        <>
            <NavBar
                setShowModal={() => { }}
                showLoginButton={false}
            />

            <div>
                <h2>CREATE ACCOUNT</h2>

                <form 
                className="flex justify-between"
                action=""
                >
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={""}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div>
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />
                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />
                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div>
                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value="man"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="man-gender-identity">Man</label>

                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value="woman"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>

                            <input
                                id="other-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value="other"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="other-gender-identity">Other</label>
                        </div>

                        <label htmlFor="show-gender">Show gender on my profile</label>
                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={false}
                        />

                        <label>Show Me</label>
                        <div>
                            <input
                                id="man-gender-interest"
                                type="radio"
                                name="gender_interest"
                                required={true}
                                value="man"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="man-gender-interest">Man</label>

                            <input
                                id="woman-gender-interest"
                                type="radio"
                                name="gender_interest"
                                required={true}
                                value="woman"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="woman-gender-interest">Woman</label>

                            <input
                                id="other-gender-interest"
                                type="radio"
                                name="gender_interest"
                                required={true}
                                value="everyone"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="other-gender-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="Hey bruh.."
                            value={""}
                            onChange={handleChange}
                        />
                    </section>

                    <section>
                        <label htmlFor="photo">Profile</label>
                        <input
                            id="photo"
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {profileImage && (
                            <img
                                src={URL.createObjectURL(profileImage)}
                                alt="Profile Preview"
                                style={{ maxWidth: '500px', maxHeight: '500px', marginTop: '10px' }}
                            />
                        )}
                    </section>
                </form>
            </div>
        </>
    )
}

export default OnBoard
