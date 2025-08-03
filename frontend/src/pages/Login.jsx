import { useState } from 'react';
import { loginUser } from '../api/Auth';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate('/'); // Redirect to home
    },
    onError: (error) => {
      setFormError(error?.response?.data?.message || 'Login failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return setFormError('All fields are required');
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>

         <p className="text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Create one
        </Link>
      </p>
      </form>
     
    </div>
  );
};

export default Login;
