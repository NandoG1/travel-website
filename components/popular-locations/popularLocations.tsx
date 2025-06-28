import Delhi from "@/public/delhi.jpg"
import Berlin from "@/public/berlin.jpg"
import Paris from "@/public/paris.jpg"
import Dubai from "@/public/dubai.jpg"
import React from 'react'
import Card from "./card"

interface DataProps{
  image: string,
  city: string,
  numOfPlace: number
}

const PopularLocations = () => {

  const data: DataProps[] = [
    {
      image: Delhi.src,
      city: "Delhi",
      numOfPlace: 73,
    },
     {
      image: Berlin.src,
      city: "Berlin",
      numOfPlace: 34,
    },
     {
      image: Paris.src,
      city: "Paris",
      numOfPlace: 73,
    },
     {
      image: Dubai.src,
      city: "Dubai",
      numOfPlace: 27,
    }
  ]

  return (
    <div className='h-full w-full my-36'>
      <div className='h-full w-5/6 mx-auto flex flex-col justify-start'>
        <h5 className='text-[20px] bg-blue-500 text-white rounded-full p-4 w-max'>
          Explore Top
        </h5>
        <h2 className='text-4xl text-slate-800 font-bold mt-6 mb-12'>
          Popular Locations
        </h2>
        <div>
          {data.map((place, idx) => (
            <Card key={idx} place={place}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularLocations