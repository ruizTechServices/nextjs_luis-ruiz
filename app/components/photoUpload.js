import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '../../lib/utils/supabase/supabaseClient';

const supabase = createClient();

const PhotoUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0); // New state for progress tracking

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];
        setIsUploading(true);
        setUploadError(null);
        setUploadProgress(0); // Reset progress bar

        try {
            const { data, error } = await supabase
                .storage
                .from('uploads')
                .upload(`${file.name}`, file, {
                    onProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(percentCompleted);
                    },
                });

            if (error) {
                throw new Error(error.message);
            }

            setUploadedFile(data);
            console.log('File uploaded successfully:', data);
        } catch (err) {
            setUploadError(err.message);
            console.error('Error uploading file:', err);
        } finally {
            setIsUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="photo-upload">
            <div {...getRootProps()} className={`border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer ${isUploading ? 'bg-gray-100' : ''}`}>
                <input {...getInputProps()} aria-label="File upload input" />
                <p>Drag & drop a file here, or click to select one</p>
            </div>

            {/* Display progress bar during upload */}
            {isUploading && (
                <div className="mt-3 w-full bg-gray-200 rounded-lg h-5 relative">
                    <div className="absolute left-0 top-0 h-full bg-green-500 rounded-lg transition-width duration-200 ease-in-out" style={{ width: `${uploadProgress}%` }}></div>
                    <p className="absolute inset-0 text-white font-bold text-center leading-5">{uploadProgress}%</p>
                </div>
            )}

            {uploadError && <p className="text-red-500 mt-2">Error: {uploadError}</p>}
            {uploadedFile && <p className="text-green-500 mt-2">File uploaded successfully: {uploadedFile.path}</p>}
        </div>
    );
};

export default PhotoUpload;
