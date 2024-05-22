//C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\app\reset_password\page.js
'use client';
import { useState } from 'react';
import { createClient } from '../../lib/utils/supabase/supabaseClient'; // Adjust the import path accordingly

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const supabase = createClient();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.error('Error sending password reset email:', error.message);
    } else {
      console.log('Please check your email for password reset instructions:', data);
    }
    // I want to inform the user of the email dispatch
  };

  return (
    <div className="gap-10 container mx-auto text-center h-screen flex justify-center align-middle items-center flex-col bg-gray-100 py-10 px-4">
      <h1 className='text-4xl'>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className='rounded-xl bg-blue-200 p-2 ml-2' type="submit">Reset Password</button>
      </form>
    </div>

  );
}

export default ResetPasswordPage;
