// components/Feedback.js

import React from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import Toaster here
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css';

const Feedback = () => {
  const formik = useFormik({
    initialValues: {
      shortFeedback: '',
      longFeedback: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8080/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success('Feedback submitted successfully!', { duration: 3000 });
        } else {
          toast.error('Failed to submit feedback. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error('An error occurred. Please try again later.');
      }
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '45%', paddingTop: '3em' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Feedback Form</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              We appreciate your input! &#128077;
            </span>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                {/* Short text field for brief feedback */}
                <input
                  {...formik.getFieldProps('shortFeedback')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Brief Feedback*"
                />

                {/* Long text field for detailed feedback */}
                <textarea
                  {...formik.getFieldProps('longFeedback')}
                  className={styles.textarea}
                  placeholder="Detailed Feedback*"
                ></textarea>

                {/* Submit button */}
                <button className={styles.btn} type="submit">
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
