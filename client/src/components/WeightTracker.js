// WeightTracker.js
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import useFetch from '../hooks/fetch.hook';
import { addWeight, getWeightEntries } from '../helper/helper';
import styles from '../styles/WeightTracker.module.css';

export default function WeightTracker() {
  const [weightEntries, setWeightEntries] = useState([]);
  const [{ isLoading, apiData, serverError }, fetchData] = useFetch('getWeightEntries');

  const formik = useFormik({
    initialValues: {
      weight: '',
    },
    onSubmit: async (values) => {
      try {
        // Add weight and wait for the promise to resolve
        await addWeight({ weight: values.weight });

        // Fetch data and wait for the promise to resolve
        const data = await fetchData('getWeightEntries');

        // Update the weightEntries state with the new data
        setWeightEntries(data);

        // Reset the form
        formik.resetForm();
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  useEffect(() => {
    // Fetch initial weight entries
    fetchData('getWeightEntries')
      .then((data) => setWeightEntries(data))
      .catch((error) => console.error('Error fetching weight entries:', error));
  }, [fetchData]);

  if (isLoading) return <h1>Loading...</h1>;
  if (serverError) return <h1>Error: {serverError.message}</h1>;

  return (
    <div className={styles.container}>
      <h2>Weight Tracker</h2>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <label htmlFor="weight">Enter Weight:</label>
        <input
          id="weight"
          name="weight"
          type="number"
          step="0.1"
          onChange={formik.handleChange}
          value={formik.values.weight}
        />
        <button type="submit">Add Weight</button>
      </form>

      <div className={styles.weightEntries}>
        <h3>Your Weight Entries:</h3>
        <ul>
          {weightEntries.map((entry) => (
            <li key={entry._id}>
              <strong>{new Date(entry.date).toLocaleDateString()}</strong>: {entry.weight} kg
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
