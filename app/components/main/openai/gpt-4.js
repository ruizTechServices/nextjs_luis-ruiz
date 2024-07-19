// app/components/main/openai/gpt-4.js
import { useState } from 'react';
import axios from 'axios';

function GPT4Component() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const characterLimit = 500;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponse('');

        try {
            const res = await axios.post('/api/openai/gpt-4o_mini', { prompt: message });
            if (res.status === 200) {
                setResponse(res.data.message); 
            } else {
                throw new Error('Failed to fetch response'); 
            }
        } catch (error) {
            setError('Error submitting message. Please try again. ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setMessage('');
        setResponse('');
        setError('');
    };

    return (
        <div className="max-w-full mx-auto p-4 max-h-[500px]">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    maxLength={characterLimit}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-right text-gray-500">
                    {message.length}/{characterLimit}
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Clear
                    </button>
                </div>
            </form>
            <div className='container flex overflow-y-scroll max-h-[300px] p-5'>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {response && <div className="border h-fit bg-gray-200">{response}</div>}
            </div>
        </div>
    );
}

export default GPT4Component;
