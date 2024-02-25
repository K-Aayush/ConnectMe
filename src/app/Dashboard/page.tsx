"use client"

import { Header } from '@/components'
import { Dir } from 'fs'
import React from 'react'
import { useState, useRef, useMemo } from 'react'
import TinderCard from 'react-tinder-card'


const db = [
    {
        name: 'Richard Hendricks',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Erlich Bachman',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Monica Hall',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Jared Dunn',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Dinesh Chugtai',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
]

type Direction = 'left' | 'right' | 'up' | 'down';

interface TinderCardRef {
    swipe: (dir?: Direction) => Promise<void>;
    restoreCard: () => Promise<void>;
}

const Dashboard: React.FC = () => {

    const characters = db
    const [lastDirection, setLastDirection] = useState<string | undefined>()

    const swiped = (direction: string, nameToDelete: string) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name: string) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div>
            <Header />
            <div className="">
                <div className="flex justify-center mt-[10vh]">
                    {db.map((character) =>
                        <TinderCard
                            className='absolute'
                            key={character.name}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}
                            flickOnSwipe
                        >
                            <div
                                style={{ backgroundImage: 'url(' + character.url + ')' }}
                                className="relative bg-gray-300 max-w-[85vw] w-[400px] h-[50vh] padding-[20px] shadow-2xl rounded-2xl bg-cover bg-center">
                                <h3 className="absolute bottom-0 m-2 text-white">
                                    {character.name}
                                </h3>
                            </div>
                        </TinderCard>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Dashboard