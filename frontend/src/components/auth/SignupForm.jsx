import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const SignupForm = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const [emptyFields, setEmptyFields] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmptyFields('');

    const formData = {
      name,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      address
    };

    console.log('Sending data:', formData);

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        register();
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed');
        setEmptyFields(data.message);
      }
    } catch (error) {
      console.log('Error details:', error);
      toast.error('Server error. Please try again later.');
    }
    setIsSubmitted(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 md:w-full" onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2">Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && name === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} />

          <label className="block text-gray-700 mb-2">Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && email === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} />

          <label className="block text-gray-700 mb-2">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && password === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} />

          <label className="block text-gray-700 mb-2">Date of Birth:</label>
          <input type="date" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && dateOfBirth === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} />

          <label className="block text-gray-700 mb-2">Phone Number:</label>
          <input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && phoneNumber === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} />

          <label className="block text-gray-700 mb-2">Address:</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} className={`w-full px-4 py-2 border rounded-lg ${isSubmitted && address === '' ? 'border-red-500 bg-red-100' : 'border-gray-300'}`} />

          {emptyFields && <p className="text-red-600 mt-2 ml-6">{emptyFields}</p>}

          <button type="submit" className="w-full py-2 px-4 bg-gray-600 text-white rounded-md mt-4">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
