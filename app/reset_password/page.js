//C:\Users\Gio\Desktop\ruizTechServices\websites\nextjs_luis-ruiz\app\reset_password\page.js
import { useState } from 'react';
import supabase from '../../lib/utils/supabase/supabaseClient'; // Adjust the import path accordingly

function ResetPasswordPage() {
  const [email, setEmail] = useState('');

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
    <form onSubmit={handleResetPassword}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ResetPasswordPage;
