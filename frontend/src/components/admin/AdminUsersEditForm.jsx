import { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminUsersEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshUsers } = useOutletContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    role: 'user',
  });
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(5);

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchUser(), fetchUserReservations()]);
      setLoading(false);
    };
    initializeData();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      const data = await response.json();

      setFormData({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth.split('T')[0],
        address: data.address,
        role: data.role,
      });
    } catch (error) {
      toast.error('Failed to fetch user data');
      navigate('/admin/users');
    }
  };

  const fetchUserReservations = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/reservations/user/${id}?status=active`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      setUserReservations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch reservations');
      setUserReservations([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        refreshUsers();
        toast.success('User updated successfully');
        navigate('/admin/users');
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        const response = await fetch(
          `http://localhost:3000/reservations/${reservationId}`,
          {
            method: 'DELETE',
            credentials: 'include',
          }
        );

        if (!response.ok) throw new Error('Failed to delete reservation');

        setUserReservations((prev) =>
          prev.filter((res) => res._id !== reservationId)
        );
        toast.success('Reservation deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = userReservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );
  const totalPages = Math.ceil(userReservations.length / reservationsPerPage);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl my-8">
        <h2 className="text-2xl font-bold mb-6">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">User Reservations</h3>
          {userReservations && userReservations.length > 0 ? (
            <>
              <table className="min-w-full bg-white shadow-md rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left w-1/3">Tool</th>
                    <th className="px-6 py-3 text-left w-1/6">Start Date</th>
                    <th className="px-6 py-3 text-left w-1/6">End Date</th>
                    <th className="px-6 py-3 text-left w-1/6">Status</th>
                    <th className="px-6 py-3 text-center w-1/6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReservations.map((reservation) => (
                    <tr
                      key={reservation._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 w-1/3">
                        {reservation.product?.description?.nameRetail}
                      </td>
                      <td className="px-6 py-4 w-1/6">
                        {new Date(
                          reservation.dateRange.from
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 w-1/6">
                        {new Date(
                          reservation.dateRange.to
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 w-1/6">{reservation.status}</td>
                      <td className="px-6 py-4 w-1/6 text-center">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() =>
                              handleEditReservation(reservation._id)
                            }
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteReservation(reservation._id)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              No reservations found for this user.
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersEditForm;
