//Path:C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\login\page.js
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../lib/utils/supabase/supabaseClient";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const toggleForm = () => setIsLogin(!isLogin);

  const resetPass = () => {
    router.push("/reset_password", { scroll: true });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!isLogin) {
        if (password !== confirmPass) {
          setErrorMessage("Passwords must match!");
          setIsLoading(false);
          return; // Return early if passwords do not match
        }
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        }, {
          data: { username: username }
        });
        if (error) throw error;
        router.push(`/login`); // Navigate after successful registration
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        // Check if the logged-in user is "giosterr44@gmail.com"
        if (data.user.email === "giosterr44@gmail.com") {
          router.push("/dashboard", { scroll: false }); // Navigate to dashboard for this specific user
        } else {
          router.push(`/user/${data.user.id}`, { scroll: false }); // Navigate to user-specific page for other users
        }
      }
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false); // Ensure isLoading is set to false after all operations
    }
  };


  return (
    <form className="flex justify-center items-center flex-col w-full h-screen" onSubmit={handleFormSubmit}>
      {isLogin ? (
        <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Login</h2>
          <input className="border p-2 mb-2 w-full" id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="border p-2 mb-2 w-full" id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full" type="submit">
            {isLoading ? "Processing..." : "Login"}
          </button>
          <p className="text-blue-500 cursor-pointer mt-2" onClick={resetPass}>Forgotten your password?</p>
          <p className="text-blue-500 cursor-pointer mt-2" onClick={toggleForm}>Don't have an account? Register</p>
        </div>
      ) : (
        <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Register</h2>
          <input className="border p-2 mb-2 w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input className="border p-2 mb-2 w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input className="border p-2 mb-2 w-full" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm Password" required />
          <input className="border p-2 mb-2 w-full" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p className="text-blue-500 cursor-pointer mt-2" onClick={toggleForm}>Already have an account? Login</p>
        </div>
      )}
    </form>
  );
}

export default LoginForm;
