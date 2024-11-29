import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import Datepicker from "react-tailwindcss-datepicker";



function ReservationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    toolType: '',
    tool: '',
    startDate: null,
    endDate: null,
    pickupLocation: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  console.log('toolType', formData.toolType);

 
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({});
  const [tools, setTools] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  
  const disabledDates = [
    {
      startDate: new Date(2024, 11, 1), // December 1, 2024
      endDate: new Date(2024, 11, 10)   // December 10, 2024
    },
    {
      startDate: new Date(2024, 11, 20), // December 20, 2024
      endDate: new Date(2024, 11, 25)   // December 25, 2024
    },
  ];

  const pickupLocations = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys'];


  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const categorized = {};
        data.products.forEach((product) => {
          const toolType = product.toolType;
          if (!categorized[toolType]) {
            categorized[toolType] = [];
          }
          categorized[toolType].push({
            _id: product._id,
            name: product.name, 
          });
        });

        setCategories(categorized);
      } catch (error) {
        console.error('Error fetching products:', error);
        setFetchError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  
    if (name === 'tool') {
      const selectedTool = tools.find((tool) => tool._id === value);
      setFormData((prev) => ({
        ...prev,
        tool: value, // tool ID
        toolName: selectedTool ? selectedTool.name : '', 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === 'toolType' && { tool: '', toolName: '' }), // Atnaujina tool ir toolName kai pasikeicia toolType
      }));
  
      // Atnaujina tools state kai pasikeicia toolType
      if (name === 'toolType') {
        setTools(categories[value] || []);
      }
    }
  };

  
  const handleDateChange = (newValue) => {
    console.log('Pasirinktos startDate:', newValue.startDate);
    console.log('Pasirinktos endDate:', newValue.endDate);
    
    setFormData((prev) => ({
      ...prev,
      startDate: newValue.startDate,
      endDate: newValue.endDate,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Pasiimam token is localstorage ir tikrinam ar vartotojas authentifikuotas
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('You must be logged in to make a reservation.');
      setLoading(false);
      return;
    }

  
    const payload = {
      productId: formData.tool, 
      toolType: formData.toolType,
      tool: formData.toolName, 
      dateRange: {
        from: formData.startDate ? formData.startDate.toISOString() : null,
        to: formData.endDate ? formData.endDate.toISOString() : null
      },
      pickupLocation: formData.pickupLocation,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone
    };

    console.log('Form Data:', formData); 
    console.log('Payload:', payload);     

    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    
      if (response.ok) {
        const result = await response.json();
        onSubmit(result);
      } else {
        const errorData = await response.json();
        console.error('Failed to submit reservation:', errorData.message);
        alert('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-2xl rounded-xl border-2 border-red500">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-black">
        Tool Reservation
      </h2>
      {fetchError ? (
        <p className="text-red-500">{fetchError}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Category */}
          <div>
            <label className="block mb-1 font-bold text-black">Select Category</label>
            <select
              name="toolType"
              value={formData.toolType}
              onChange={handleChange}
              className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
              required
            >
              <option value="" className="text-gray-500">Categories</option>
              {Object.keys(categories).map(type => (
                <option key={type} value={type} className="text-black">{type}</option>
              ))}
            </select>
          </div>

          {/* Select Tool */}
          <div>
            <label className="block mb-1 font-bold text-black">Select Tool</label>
            <select
              name="tool"
              value={formData.tool}
              onChange={handleChange}
              className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black disabled:opacity-50"
              required
              disabled={!formData.toolType}
            >
              <option value="" className="text-gray-500">Tools</option>
              {tools.map(tool => (
                <option key={tool._id} value={tool._id} className="text-black">
                  {tool.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block mb-1 font-bold text-black">Pickup Location</label>
            <select
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
              required
            >
              <option value="" className="text-gray-500">Locations</option>
              {pickupLocations.map(location => (
                <option key={location} value={location} className="text-black">{location}</option>
              ))}
            </select>
          </div>

          {/* DatePicker */}
          <div className="grid md:grid-cols-1 gap-3">
            <p className="font-bold">Reservation date</p>
            <Datepicker
              primaryColor={"red"}
              value={{ startDate: formData.startDate, endDate: formData.endDate }}
              onChange={handleDateChange}
              showShortcuts={true}
              placeholder="Select your date"
              showFooter={true}
              disabledDates={disabledDates}
              className={""}
              configs={{
                shortcuts: {
                  today: {
                    text: "Today",
                    period: {
                      start: new Date(),
                      end: new Date()
                    }
                  },
                  tomorrow: {
                    text: "Tomorrow",
                    period: {
                      start: new Date(new Date().setDate(new Date().getDate() + 1)),
                      end: new Date(new Date().setDate(new Date().getDate() + 1))
                    }
                  },
                  next3Days: {
                    text: "Next 3 days",
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 3))
                    }
                  },
                  next5Days: {
                    text: "Next 5 days",
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 5))
                    }
                  },
                  next7Days: {
                    text: "Next 7 days",
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 7))
                    }
                  },
                  next14Days: {
                    text: "Next 14 days",
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 14))
                    }
                  },
                  next30days: {
                    text: "Next 30 days",
                    period: {
                      start: new Date(),
                      end: new Date(new Date().setDate(new Date().getDate() + 30))
                    }
                  }
                }
              }}
            />
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-black">Contact Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-black">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-black">Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full p-2 border-2 border-red500 rounded-lg focus:outline-none focus:ring-1 focus:ring-red500 text-black"
              required
            />
          </div>

          {/* Reservation button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-lg hover:bg-red-600 transition duration-300 transform hover:shadow-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <PulseLoader color="#ffffff" size={15} />
            ) : (
              "Make a Reservation"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default ReservationForm;