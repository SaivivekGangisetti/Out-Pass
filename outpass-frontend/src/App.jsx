import React, { useState, useEffect } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    fathername: '',
    mobilenumber: '',
    rollnumber: '',
    reason: '',
    date: '',
    time: '',
  });

  const [outpasses, setOutpasses] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2030/outpass-backend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Form Submitted:', data);

      // Clear form
      setFormData({
        name: '',
        fathername: '',
        mobilenumber: '',
        rollnumber: '',
        reason: '',
        date: '',
        time: '',
      });

      // Refresh list
      fetchOutpasses();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Fetch all outpasses
  const fetchOutpasses = async () => {
    try {
      const response = await fetch('http://localhost:2030/outpass-backend/all'); // backend port updated
      const data = await response.json();
      setOutpasses(data);
    } catch (error) {
      console.error('Error fetching outpasses:', error);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchOutpasses();
  }, []);

  return (
    <div>
      <h1>Out Pass Application</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Your Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Father Name</label>
          <input type="text" name="fathername" value={formData.fathername} onChange={handleChange} />
        </div>

        <div>
          <label>Mobile Number</label>
          <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} />
        </div>

        <div>
          <label>Roll Number</label>
          <input type="text" name="rollnumber" value={formData.rollnumber} onChange={handleChange} />
        </div>

        <div>
          <label>Reason</label>
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} />
        </div>

        <div>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div>
          <label>Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>

      <h2>All Outpasses</h2>
      <ul>
        {outpasses.map((o) => (
          <li key={o.id}>
            {o.name} ({o.rollnumber}) — {o.reason} on {o.date} at {o.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
