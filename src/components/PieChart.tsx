'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import Chart from 'react-apexcharts';


const Piechart = () => {
    const [genderData, setGenderData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/users");
                const genderCounts = countGender(response.data);
                setGenderData(genderCounts);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to count gender distribution
    const countGender = (users: any) => {
        const genderCounts = {
            man: 0,
            woman: 0,
            others: 0
        };

        users.forEach((user: any) => {
            if (user.gender_identity === 'man') {
                genderCounts.man++;
            } else if (user.gender_identity === 'woman') {
                genderCounts.woman++;
            } else {
                genderCounts.others++;
            }
        });

        return Object.values(genderCounts);
    };

    return (
        <div className='flex items-center justify-center'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Chart
                    type='pie'
                    width={600}
                    height={300}
                    series={genderData}
                    options={{
                        title: { text: "Gender Distribution" },
                        labels: ["Male", "Female", "Others"],
                        noData: { text: "Empty Data" }
                    }}
                />
            )}
        </div>
    )
}

export default Piechart