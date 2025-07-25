import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignUp = () => {
    const navigate = useNavigate();

    // Form validation
    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required')
            .matches(/^[A-Za-z ]+$/, "Name must not include numbers or special characters"),
        email: yup
            .string()
            .required('Email is required')
            .email('Enter a valid email address'),
        password: yup
            .string()
            .required("Password is required")
            .min(4, "Password must be at least 4 characters")
            .max(30, "Password shouldn't be more than 30 characters."),
        confirmPassword: yup
            .string()
            .required("You have to confirm your password")
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:3000/auth/sign-up', data);
            navigate('/');
        } catch (error) {
            console.error("Error during sign-up:", error);
            if (error.response) console.error("Response:", error.response.data)
        }
    }
    
    return (
        <>
        <div className='flex items-center justify-center h-screen'>
            <div className='shadow-xl px-8 py-5 border border-[#F51D28]/30 w-96'>
                
                <h2 className='text-xl font-bold mb-4'>
                    Create Your Aplyzer Account
                    <span className='block text-sm font-light'>Track smarter. Apply better.</span>
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className='mb-4'>
                        <label htmlFor="name" className='block text-gray-700' >Name</label>
                        <input id="name" type="text" placeholder='Enter your name'
                        className='w-full px-3 py-2 border border-gray-400'
                        { ...register('name') } />
                        { 
                            errors.name &&
                            <p className='text-sm text-red-600'>{ errors.name.message }</p> 
                        }
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-gray-700' >Email</label>
                        <input id="email" type="email" placeholder='Enter your Email'
                        className='w-full px-3 py-2 border border-gray-400'
                        { ...register('email') } />
                        { 
                            errors.email &&
                            <p className='text-sm text-red-600'>{ errors.email.message }</p> 
                        }
                    </div>
                    
                    <div className='mb-4'>
                        <label htmlFor="password" className='block text-gray-700' >Password</label>
                        <input id="password" type="password" placeholder='Create a password'
                        className='w-full px-3 py-2 border border-gray-400'
                        { ...register('password') } />
                        { 
                            errors.password &&
                            <p className='text-sm text-red-600'>{ errors.password.message }</p> 
                        }
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="confirmPassword" className='block text-gray-700' >Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder='Confirm your password'
                        className='w-full px-3 py-2 border border-gray-400'
                        { ...register('confirmPassword') } />
                        { 
                            errors.confirmPassword &&
                            <p className='text-sm text-red-600'>{ errors.confirmPassword.message }</p> 
                        }
                    </div>

                    {/* Submit button */}
                    <input
                    type='submit'
                    value='Create Account'
                    className='w-full bg-[#F51D28] text-white py-2 rounded cursor-pointer' />
                </form>

                <div className='text-center text-sm mt-2'>
                    <span>Already have an account? </span>
                    <Link to='/signin' className='text-[#F51D28]'>Sign in</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignUp
