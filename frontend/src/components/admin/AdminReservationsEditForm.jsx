import { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminReservationEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshReservations } = useOutletContext();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    pickupLocation: '',
    quantity: 1,
    dateRange: {
      from: '',
      to: ''
    },
    status: ''
  });

  useEffect(() => {
    fetchReservation();
  }, [id]);

  const fetchReservation = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();

      setFormData({
        contactName: data.reservation.contactName,
        contactEmail: data.reservation.contactEmail,
        contactPhone: data.reservation.contactPhone,
        pickupLocation: data.reservation.pickupLocation,
        quantity: data.reservation.quantity,
        dateRange: {
          from: data.reservation.dateRange.from.split('T')[0],
          to: data.reservation.dateRange.to.split('T')[0]
        },
        status: data.reservation.status
      });
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch reservation');
      navigate('/admin/reservations');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dateRange')) {
      const dateField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [dateField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })
      console.log(formData)
      if (response.ok) {
        refreshReservations();
        toast.success('Reservation updated successfully');
        navigate('/admin/reservations');
      } else {
        throw new Error('Failed to update reservation');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl my-8">
        <h2 className="text-2xl font-bold mb-6">Edit Reservation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" name="dateRange.from" value={formData.dateRange.from} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" name="dateRange.to" value={formData.dateRange.to} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/admin/reservations')} className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminReservationEditForm;
