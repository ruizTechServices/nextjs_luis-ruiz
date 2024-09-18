import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '../../lib/utils/supabase/supabaseClient';

const supabase = createClient();

const PhotoUpload = () => {
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const { data, error } = await supabase
            .storage
            .from('uploads')
            .upload(`public/${file.name}`, file);
        if (error) {
            console.error('Error uploading file:', error.message);
        } else {
            console.log('File uploaded successfully:', data);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop a file here, or click to select one</p>
        </div>
    );
};

export default PhotoUpload;