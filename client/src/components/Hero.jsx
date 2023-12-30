import { motion } from 'framer-motion'
import React from 'react'
import { fadeAnimation } from '../config/motion'

const Hero = ({ startSharing }) => {
    return (
        <motion.section {...fadeAnimation} className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-16 items-center justify-center flex-col">
                <img className="lg:w-1/6 md:w-3/6 w-5/6 mb-5 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/360x300" />
                <div className="text-center lg:w-2/3 w-full">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Microdosing synth tattooed vexillologist</h1>
                    <p className="mb-8 leading-relaxed">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
                    <div className="flex justify-center">
                        <button onClick={startSharing} className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">Start Sharing</button>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Hero