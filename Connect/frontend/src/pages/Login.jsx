import React, { useRef, useState } from 'react'
import People from '../assets/people.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import * as Yup from 'yup'
import { useFormik } from 'formik'

const initialValues = {
    user_username: '',
    user_password: '',
}

const validationSchema = Yup.object({
    user_username: Yup.string().required('Required'),
    user_password: Yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.')
})

const Login = () => {
    const onSubmit = values => {
        console.log(formik.values)
        dispatch(login(formik.values.user_username, formik.values.user_password)).then(() => {
            console.log("logged in")
            formik.resetForm()
            navigate("/")
            window.location.reload()
        })
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    const navigate = useNavigate()
    const dispatch = useDispatch();



    return (
        <div className='items-center justify-evenly md:justify-center flex h-screen w-full bg-backgroundImg bg-cover bg-center'>
            <div className='flex-col justify-center w-[450px] h-[450px] items-center mr-10 bg-grey-blue rounded-full hidden lg:flex'>
                <img src={People} alt="" />
                <div className='mt-5'>
                    <h1 className='bg-[#717B7A] py-1 px-2 w-30 mb-2 rounded-md text-center text-white font-bold text-5xl pb-2'>CONNECT</h1>
                    <h3 className='font-light text-center'>A place to connect like no other</h3>

                </div>
            </div>
            <div className='bg-white rounded-xl p-5 w-4/5 lg:w-1/4'>
                <h1 className='text-5xl text-center mb-5 font-bold'>Login</h1>
                <h3 className='mb-5 text-center'>Enter your information to sign in.</h3>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <fieldset className='w-full'>
                        <input value={formik.values.user_username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='user_username'
                            className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                            placeholder='Enter Username'
                            type="text"
                        />
                        {formik.touched.user_username && formik.errors.user_username ?
                            <div className='text-red-500 text-sm absolute'>{formik.errors.user_username}</div> : null
                        }
                    </fieldset>
                    <fieldset>
                        <input value={formik.values.user_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='user_password'
                            className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                            placeholder='Enter Password'
                            type="password"
                        />
                        {formik.touched.user_password && formik.errors.user_password ?
                            <div className='text-red-500 text-sm'>{formik.errors.user_password}</div> : null
                        }
                    </fieldset>
                    <p className='text-center'>New here?
                        <Link to='/register'>
                            <b className='cursor cursor-pointer'> Sign Up</b>
                        </Link>
                    </p>
                    <button type='submit' className='bg-[#313C3E] p-3 hover:bg-[#2b3536]  text-white rounded-md'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login