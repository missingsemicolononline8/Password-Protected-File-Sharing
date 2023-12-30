import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { fadeAnimation } from '../config/motion'
import CustomButton from './CustomButton'
import UploadForm from './UploadForm'
import Loading from './Loader/Loading'
import FileShareLink from './FileShareLink'
import { useSelector } from 'react-redux'
import CenteralizeComponent from './Center'


const ShareFile = ({ handleBack }) => {

    const activeComponent = useSelector((state) => state.fileShareComponent)
    const Loader = CenteralizeComponent(Loading);
    const [error, setError] = useState(null);

    const fileComponents = {
        form: <UploadForm {...{ error, setError }} />,
        loader: <Loader />,
        fileLink: <FileShareLink />
    }
    return (
        <section className='relative'>
            <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                <CustomButton color="rgb(168,85,247)" type="filled" title="Back" handleClick={handleBack} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
            </motion.div>
            <motion.div {...fadeAnimation} className="text-gray-600 body-font relative">
                <div className="container px-5 py-24">
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        {fileComponents[activeComponent]}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default ShareFile