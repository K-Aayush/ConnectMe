"use client"

import { Header } from '@/components'
import React from 'react'
import { useState, useRef, useMemo } from 'react'
import TinderCard from 'react-tinder-card'
import { IoHeartOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


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

interface TinderCardRef {
    swipe: (dir?: Direction) => Promise<void>;
    restoreCard: () => Promise<void>;
}

type Direction = 'left' | 'right' | 'up' | 'down';

const Dashboard: React.FC = () => {

    const [lastDirection, setLastDirection] = useState<string | undefined>();
    const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);

    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef<TinderCardRef>()),
        []
    )

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canSwipe = currentIndex >= 0

    const swiped = (direction: Direction, nameToDelete: string, index: number) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    }

    const outOfFrame = (name: string, index: number) => {
        console.log(name + ' left the screen!', currentIndexRef.current)
    }

    const swipe = async (dir: Direction) => {
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current?.swipe(dir)
        }
    }


    return (
        <div>
            <Header />
            <div className="flex flex-col justify-center items-center">
                <div className="w-[400px] max-w-[85vw] h-[50vh] mt-[10vh]">
                    {db.map((character, index) =>
                        <TinderCard
                            ref={childRefs[index]}
                            className='absolute'
                            key={character.name}
                            swipeRequirementType='position'
                            swipeThreshold={100}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, character.name, index)}
                            onCardLeftScreen={() => outOfFrame(character.name, index)}
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
                <div className="w-full flex justify-center mt-4">
                    <button
                        className="mr-4 p-2 text-red-500 hover:bg-gray-100 rounded-full"
                        onClick={() => swipe('left')}
                    >
                        <RxCross1 size={50} />
                    </button>
                    <button
                        className="p-2 text-green-500 rounded-full hover:bg-gray-100"
                        onClick={() => swipe('right')}
                    >
                        <IoHeartOutline size={50} />
                    </button>
                </div>
                <div className="w-full flex justify-center text-2xl font-semibold mt-4">
                    {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
                </div>
            </div>
        </div>

    )
}

export default Dashboard