import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

import styles from '../styles/Username.module.css';

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'exemple.bb@gmail.com',
      username: 'example123',
      password: 'admin@123',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });

      setIsLoading(true); // Set loading state to true

      try {
        const response = await registerUser(values);

        if (response.error) {
          toast.error(response.error);
        } else if (response.msg === 'User Registered Successfully') {
          toast.success('User Registered Successfully');

          // Use setTimeout to delay navigation after success message
          setTimeout(() => {
            setIsLoading(false); // Set loading state to false
            navigate('/');
          }, 2000); // Adjust the delay as needed
        }
      } catch (error) {
        setIsLoading(false); // Set loading state to false
        console.error(error);
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '45%', paddingTop: '3em' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Glad you've joined Us! &#9829;
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={file || avatar} className={styles.profile_img} alt="avatar" />
              </label>

              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps('email')}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps('username')}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps('password')}
                className={styles.textbox}
                type="text"
                placeholder="password"
              />
              <button className={styles.btn} type="submit">
                {isLoading ? 'Creating...' : 'Register'}
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already have an account?{' '}
                <Link className="text-red-500" to="/">
                  Login in Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
