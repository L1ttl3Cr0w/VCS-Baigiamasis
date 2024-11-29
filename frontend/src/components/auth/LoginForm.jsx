import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [pswError, setPswError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPswError('');

    if (email === '') {
      setEmailError('Please enter your email address');
      return;
    }
    if (password === '') {
      setPswError('Please enter your password');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        login(data.token, data);
        navigate('/');
      } else {
        toast.error('Login failed.');
        setPswError(`${data.message}`);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <form className="bg-white p-8 rounded-lg shadow-lg md:w-full sm:w-96" onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2">Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          {emailError && <p className="text-red-600 mt-2 ml-6">{emailError}</p>}

          <label className="block text-gray-700 mb-2">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          {pswError && <p className="text-red-600 mt-2 ml-6">{pswError}</p>}

          <button type="submit" className="w-full py-2 px-4 bg-gray-600 text-white rounded-md mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
