import React from 'react'
import People from '../assets/people.png'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { register } from "../actions/auth";
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'

const initialValues = {
    user_name: '',
    user_username: '',
    user_email: '',
    user_password: '',
}

const validationSchema = Yup.object({
    user_name: Yup.string().required('Required'),
    user_username: Yup.string().required('Required'),
    user_email: Yup.string().email('Invalid email format').required('Required'),
    user_password: Yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.')
})

const Register = () => {
    const onSubmit = async values => {
        const user = {
            email: formik.values.user_email,
            name: formik.values.user_name,
            username: formik.values.user_username,
            password: formik.values.user_password,
        }
        try {
            dispatch(register(user))
            formik.resetForm()
            navigate("/login")
        }
        catch (err) {
            console.log(err)
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const dispatch = useDispatch();
    const email = useRef()
    const name = useRef()
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [animate, setAnimate] = useState(false);

    const show = () => {
        setShowPassword(!showPassword)
        setAnimate(!animate)
    }

    return (
        <div className='items-center justify-evenly md:justify-center flex h-screen w-full bg-[url("https://cdn.glitch.global/5288658f-8afb-4ac7-b1fa-300b8de8635f/Rectangle%2054%20(1).png?v=1672430722934")] bg-cover bg-center'>
            <div className='flex-col justify-center w-[450px] h-[450px] items-center mr-10 bg-grey-blue rounded-full hidden lg:flex'>
                <img src={People} alt="" />
                <div className='mt-5'>
                    <h1 className='bg-[#717B7A] py-1 px-2 w-30 mb-2 rounded-md text-center text-white font-bold text-5xl pb-2'>CONNECT</h1>
                    <h3 className='font-light text-center'>A place to connect like no other</h3>
                </div>
            </div>
            <div className='bg-white rounded-xl p-5 w-4/5 lg:w-1/4'>
                <h1 className='text-5xl text-center mb-5 font-bold'>Sign Up</h1>
                <h3 className='mb-5'>Welcome to <b>CONNECT!</b> Sign up and start connecting.</h3>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                    <fieldset className='w-full'>
                        <input
                            value={formik.values.user_email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='user_email'
                            className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                            placeholder='Enter Email' type="email"
                        />
                        {formik.touched.user_email && formik.errors.user_email ?
                            <div className='text-red-500 text-sm absolute'>{formik.errors.user_email}</div> : null
                        }
                    </fieldset>
                    <fieldset className='w-full'>
                        <input required value={formik.values.user_name}
                            onChange={formik.handleChange}
                            name='user_name'
                            onBlur={formik.handleBlur}
                            className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                            placeholder='Enter Full Name' type="text" />
                        {formik.touched.user_name && formik.errors.user_name ?
                            <div className='text-red-500 text-sm absolute'>{formik.errors.user_name}</div> : null
                        }
                    </fieldset>
                    <fieldset className='w-full'>
                        <input required value={formik.values.user_username}
                            onChange={formik.handleChange}
                            name="user_username"
                            onBlur={formik.handleBlur}
                            className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                            placeholder='Enter Username' type="text" />
                        {formik.touched.user_username && formik.errors.user_username ?
                            <div className='text-red-500 text-sm absolute'>{formik.errors.user_username}</div> : null
                        }
                    </fieldset>
                    <fieldset className='w-full flex flex-col justify-between relative '>
                        <div className='w-full flex items-center'>
                            <input required value={formik.values.user_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='user_password'
                                className='rounded-xl w-full bg-[#E7E7E7] p-3 outline-none'
                                placeholder='Enter Password' type={showPassword ? "text" : "password"} />

                            <div className={animate ? 'animate-pulse ml-2' : 'ml-2'} onClick={show}>
                                {showPassword ? <AiOutlineEyeInvisible size={30} /> : <AiOutlineEye size={30} />}
                            </div>
                        </div>
                        {formik.touched.user_password && formik.errors.user_password ?
                            <div className='text-red-500 text-sm'>{formik.errors.user_password}</div> : null
                        }
                    </fieldset>

                    <p className='text-center'>Already a member?
                        <Link to='/login'>
                            <b className='cursor cursor-pointer'> Login</b>
                        </Link>
                    </p>
                    <button type='submit'
                        className='bg-[#313C3E] p-3 hover:bg-[#2b3536]  text-white rounded-md'
                    >Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register