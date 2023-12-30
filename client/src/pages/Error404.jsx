import React from 'react'
import CenteralizeComponent from '../components/Center'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <>
            <div class="flex items-center justify-center">
                <div class="flex-col space-y-4 text-center">
                    <div class="text-purple-500 text-xl font-medium">Oops</div>
                    <div class="text-5xl font-medium">Page not found</div>
                    <div class="text-gray-500">Sorry, the page you're looking for isn't available.</div>
                    <div class="flex items-center justify-center">
                        <Link to="/" class="bg-purple-500 px-4 py-1 text-white font-medium rounded-lg  hover:scale-105 cursor-pointer">Visit Homepage</Link>

                    </div>
                </div>
            </div>



        </>
    )
}


export default CenteralizeComponent(Error404)