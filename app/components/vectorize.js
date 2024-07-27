import React, { useState } from 'react';
import axios from 'axios';

function PineconeFileQuery() {
    const [file, setFile] = useState(null);  // State to hold the uploaded file
    const [results, setResults] = useState([]);  // State to hold results from the API
    const [isLoading, setIsLoading] = useState(false);  // State for loading indicator
    const [error, setError] = useState(null);  // State for error messages

    // Function to handle file input changes
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);  // Set the file to the first file in the input
    };

    // Function to submit the file
    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent default form behavior
        if (!file) {
            setError('Please upload a file.');
            return;
        }

        setIsLoading(true);  // Indicate loading
        setError(null);  // Reset error state

        try {
            // Read the file content
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = async () => {
                const text = reader.result;

                // Request to generate vector from the backend
                const { data: embeddingResponse } = await axios.post('/api/pinecone', { text });
                const embedding = embeddingResponse.embedding;

                // Send vector to Pinecone API endpoint
                const response = await axios.post('/api/pinecone', { vector: embedding });
                setResults(response.data);
                setIsLoading(false);
            };
            reader.onerror = () => {
                setError('Error reading file.');
                setIsLoading(false);
            };
        } catch (err) {
            setError('Failed to process the file. Please try again.');
            setIsLoading(false);
            console.error('API call failed:', err);
        }
    };

    return (
        <div>
            <h1>Pinecone File Query Interface</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file">Upload your file:</label>
                <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Submit'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h2>Results:</h2>
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>{JSON.stringify(result)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PineconeFileQuery;
