//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\components\main\catalog\catalogItemForm.js
import { useState } from 'react';
import { createClient } from '../../../../lib/utils/supabase/supabaseClient';

const CatalogItemForm = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [options, setOptions] = useState('');

    const supabase = createClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('catalog')
            .insert([
                { name, description, imageUrl, options: options.split(',') }
            ]);

        if (error) {
            console.error('Error inserting data: ', error);
        } else {
            console.log('Data added:', data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" placeholder="Enter item name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea id="description" placeholder="Enter item description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" rows="3"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" id="image" onChange={(e) => setImageUrl(e.target.files[0])} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" accept="image/*" />
            </div>
            <div className="mb-6">
                <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                <input type="text" id="options" placeholder="Enter options (comma-separated)" value={options} onChange={(e) => setOptions(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Add Catalog Item</button>
        </form>
    );
};

export default CatalogItemForm;
