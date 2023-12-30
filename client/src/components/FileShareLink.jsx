import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function FileUploadSuccess() {
    // Assuming that you have a Redux store set up to store the shareable URL
    const shareableURL = useSelector((state) => state.fileSharingLink);

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyURL = () => {
        navigator.clipboard.writeText(shareableURL)
        setIsCopied(true);
    };

    return (
        <div className="w-full mx-auto p-4 bg-purple-50 rounded-lg shadow-md text-center">
            {/* Success Message */}
            <div className="text-purple-600 text-3xl mb-4">
                File Upload Successful!
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg mx-6">
                You've successfully uploaded your file. Share the link below with anyone to allow them to download the file.
            </p>

            {/* Shareable URL Display */}
            <div className="bg-purple-100 p-4 rounded border border-blue-500 mt-4 relative">

                <div className="relative">
                    <input
                        type="text"
                        value={shareableURL}
                        readOnly
                        className="w-full text-lg text-blue-800 bg-purple-200 p-2 rounded mt-2"
                    />
                    <button
                        className={`absolute top-2 right-2 px-4 py-2 rounded bg-purple-600 text-white ${isCopied ? 'bg-green-500' : ''
                            }`}
                        onClick={handleCopyURL}
                    >
                        {isCopied ? 'Copied!' : 'Click to Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FileUploadSuccess;
