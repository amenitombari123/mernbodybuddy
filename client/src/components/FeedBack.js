import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css';// Update the module CSS file if needed

export default function FeedbackForm() {
  const formik = useFormik({
    initialValues: {
      shortFeedback: '',
      longFeedback: '',
    },
    onSubmit: async (values) => {
      // Handle sending feedback, e.g., API call or other logic
      console.log('Feedback submitted:', values);

      // Display a success message
      toast.success('Feedback Sent Successfully!', { duration: 3000 });
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
}
