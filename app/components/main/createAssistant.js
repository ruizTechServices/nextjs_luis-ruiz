//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\components\main\createAssistant.js
import { useState } from 'react';

const CreateAssistantForm = () => {
    const [assistantName, setAssistantName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [modelName, setModelName] = useState("");
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/openai/createAssistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ assistantName, instructions }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Assistant created successfully!');
            } else {
                setMessage(data.error || 'Failed to create assistant');
            }
        } catch (error) {
            setMessage('Error connecting to the server');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="px-4 py-2 border rounded-md"
                    value={assistantName}
                    onChange={(e) => setAssistantName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Instruction"
                    className="px-4 py-2 border rounded-md"
                    rows="4"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Creating...' : 'Create Assistant'}
                </button>
                {message && <p className="text-center">{message}</p>}
            </form>
        </div>
    );
};

export default CreateAssistantForm;
