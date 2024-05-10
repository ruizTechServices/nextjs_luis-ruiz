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
        <form onSubmit={handleSubmit} className="p-4">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg p-2 text-sm border input input-bordered w-full mb-4" />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-lg p-2 text-sm border textarea textarea-bordered w-full mb-4"></textarea>
            {/*I want to upload files here not add a url of an image...=====>*/}<input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="rounded-lg p-2 text-sm border input input-bordered w-full mb-4" />
            <input type="text" placeholder="Options (comma-separated)" value={options} onChange={(e) => setOptions(e.target.value)} className="rounded-lg p-2 text-sm border input input-bordered w-full mb-4" />
            <button type="submit" className="border rounded-xl p-2 bg-blue-200 hover:bg-blue-300">Add Catalog Item</button>
        </form>
    );
};

export default CatalogItemForm;
