import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { fadeAnimation } from '../config/motion'
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import Loading from './Loader/Loading'
import CenteralizeComponent from './Center'
import Error404 from '../pages/Error404';

export async function loaderFunc({ params }) {
    async function lookup() {
        let request = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/files/lookup/${params.fileId}`);

        if (request.status == 404) {
            throw new Response("Not Found", { status: 404 });
        }

        let response = await request.json();
        return response.fileName;
    }

    return defer({
        fileName: lookup(),
    });
}

const forceDownload = (blob, filename) => {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
}


const DownloadForm = ({ fileName }) => {
    const { fileId } = useParams();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false)

    const onChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async () => {

        setError(null);
        setSubmitted(true)

        const request = await fetch(`${import.meta.env.VITE_API_HOST}/api/v1/files/download/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                fileId
            })
        });

        const response = await request.json();
        setSubmitted(false);
        if (request.status !== 200) {
            setError(response.error)
            return
        }

        fetch(response.downloadLink, {
            headers: new Headers({
                Origin: location.origin,
            }),
            mode: "cors",
        })
            .then((response) => response.blob())
            .then((blob) => {
                let blobUrl = window.URL.createObjectURL(blob);
                forceDownload(blobUrl, fileName);
            })
            .catch((e) => console.error(e));

    }

    const buttonContent = submitted ? <Loading color="#fff" width="35px" /> : "Submit"

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-8">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{fileName}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Enter password to start downloading</p>
                </div>
                <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div className="relative flex-grow w-full">
                        <input disabled={submitted} value={password} onChange={onChange} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-transparent focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <button className="text-white flex justify-center items-center bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg h-[43px] w-48" onClick={handleSubmit}>{buttonContent}</button>
                </div>
                <p className="text-red-600 text-center">{error}</p>
            </div>
        </section>
    )

}

const FileDownload = () => {

    const LoadingComponent = CenteralizeComponent(Loading);
    const { fileName } = useLoaderData();

    return (
        <motion.section {...fadeAnimation} className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">

                <React.Suspense
                    fallback={<LoadingComponent />}
                >
                    <Await
                        resolve={fileName}
                        errorElement={
                            <Error404 />
                        }
                    >
                        {(fileName) =>
                            <DownloadForm fileName={fileName} />
                        }
                    </Await>
                </React.Suspense>
            </div>
        </motion.section>
    )

}

export default FileDownload