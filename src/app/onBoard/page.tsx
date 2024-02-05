'use client'

import { useState } from 'react'
import { NavBar } from '@/components'


const OnBoard = () => {
    const handleSubmit = () => {
        console.log('submit')
    }

    const handleChange = () => {
        console.log('change')
    }

    return (
        <>
            <NavBar
                setShowModal={() => { }}
                showLoginButton={false}
            />

            <div>
                <h2>CREATE ACCOUNT</h2>

                <form action="">
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
                    </section>
                </form>
            </div>
        </>
    )
}

export default OnBoard
