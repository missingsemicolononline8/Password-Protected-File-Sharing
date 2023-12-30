import React, { useState } from 'react'
import { actionCreators } from '../state'
import { useDispatch } from 'react-redux';

const UploadForm = ({ error, setError }) => {
    const dispatch = useDispatch();
    const [newFile, setFile] = useState({
        file: undefined,
        password: ''
    })
    const onChange = (e) => {
        if (e.target.name == "file") {
            setFile({ ...newFile, file: e.target.files[0] })
            return
        }
        setFile({ ...newFile, [e.target.name]: e.target.value })
    }

    const handleNext = async () => {

        setError(null);
        dispatch(actionCreators.setFileShareComponent('loader'))

        let formData = new FormData();
        formData.append('sharedFile', newFile.file);
        formData.append('password', newFile.password)
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/files/upload`, {
            method: 'POST',
            body: formData
        });

        if (response.status !== 200) {
            dispatch(actionCreators.setFileShareComponent('form'))
            setError(await response.text());
            return
        }

        const parsedResponse = await response.json();
        let downloadURL = `${import.meta.env.VITE_APP_HOST}download/file/${parsedResponse._id}`
        dispatch(actionCreators.setFileSharingLink(downloadURL))
        dispatch(actionCreators.setFileShareComponent('fileLink'))

    }

    return (
        <>
            <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Send New File</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
            </div>

            <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                    <div className="relative">
                        <label htmlFor="file" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="file" id="file" name="file" onChange={onChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div className="relative">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Password</label>
                        <input placeholder='Set Password' type="text" id="password" name="password" value={newFile.password} onChange={onChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <button className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg" onClick={handleNext}>Next <i className="ml-2 mt-[6px] fa-solid fa-angle-right"></i></button>
                </div>

            </div>

            <div id="error" className='mt-10'>
                <p className="text-red-600 text-center">{error}</p>
            </div>

        </>
    )
}

export default UploadForm