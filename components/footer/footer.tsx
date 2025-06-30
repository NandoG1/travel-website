import React from 'react'

function Footer() {
  return (
    <div className='border relative h-full w-full mt-32'>
        <div className='py-12 h-full w-5/6 mx-auto flex items-center justify-between'>
            <div className="flex-1 flex flex-col gap-4">
                <h2>About the App</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptates velit fuga perspiciatis itaque iste, aliquid dignissimos voluptate modi,
                    tempore assumenda adipisci dolor hic atque quod consequuntur cupiditate. Quasi, nobis veritatis!
                </p>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <h2>Contacts</h2>
                <span>Phone +123 456 789</span>
                <span>YouTube: TraveL Ch</span>
                <span>GitHub: NandoG1</span>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <h2>Location</h2>
                <span>Continent: Europe</span>
                <span>Country: Bulgaria</span>
                <span>Current Location: Bulgaria</span>
            </div>
        </div>
    </div>
  )
}

export default Footer;