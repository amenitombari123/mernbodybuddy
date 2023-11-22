import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';

const WeightTracker = () => {
  const [entries, setEntries] = useState([]);
  const [username, setUsername] = useState('example123'); // Replace with actual username

  const formik = useFormik({
    initialValues: {
      weight: '',
      date: '',
    },
    onSubmit: async (values) => {
      const entry = {
        weight: values.weight,
        date: values.date || new Date().toLocaleString(),
      };

      // Send the new weight entry to the backend
      try {
        const response = await fetch('http://localhost:8080/api/addWeight', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, ...entry }),
        });

        if (response.ok) {
          toast.success('Weight entry added successfully!', { duration: 3000 });
          setEntries([...entries, entry]);
          formik.resetForm();
        } else {
          toast.error('Failed to add weight entry. Please try again.');
        }
      } catch (error) {
        console.error('Error adding weight entry:', error);
        toast.error('An error occurred. Please try again later.');
      }
    },
  });

  // Fetch user weight entries when the component mounts
  useEffect(() => {
    const fetchWeightEntries = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${username}`);
        if (response.ok) {
          const userData = await response.json();
          setEntries(userData.weights || []);
        } else {
          console.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchWeightEntries();
  }, [username]);

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '45%', paddingTop: '3em' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Weight Tracker</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Track your weight! &#128077;
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="textbox flex items-center gap-6">
                {/* Weight input field */}
                <input
                  {...formik.getFieldProps('weight')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Weight*"
                />

            

                {/* Submit button */}
                <button className={styles.btn} type="submit">
                  Add Entry
                </button>
              </div>
            </form>

            {/* Display entries */}
            <div className="py-4">
              <h5 className="text-xl font-bold">Entries:</h5>
              <ul>
                {entries.map((entry, index) => (
                  <li key={index}>
                    {entry.date} - Weight: {entry.weight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;
