'use client'

import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../../../redux/thunks/Auth/authentication.Thunk';

const SigninForm:React.FC = () => {

    const dispatch = useDispatch()

    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required'),
        remember: yup.boolean(),
      });

      const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(loginSchema),
      
      });
   
      const handleLogin = async (data: any) => {
        const { email, password, remember } = data;
        try {
          dispatch(signIn({ email, password }));
    
          if (remember) {
            localStorage.setItem('email', email);
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('rememberMe');
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
    
      useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        if (rememberMe) {
          const savedEmail = localStorage.getItem('email');
          if (savedEmail) {
            setValue('email', savedEmail);
          }
        }
      }, [setValue]);
    

    return (
        <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="input-wrapper">
          <input type="email" placeholder="Email" {...register('email')} />
          {errors.email && <span className="error-msg">{errors.email.message}</span>}
        </div>
        <div className="input-wrapper">
          <input type="password" placeholder="Password" {...register('password')} />
          {errors.password && <span className="error-msg">{errors.password.message}</span>}
        </div>
        <div className="remember-me">
        <input type="checkbox" id="remember" {...register('remember')} />
          <label htmlFor="remember"> Remember me</label>
        </div>
        <button type="submit" className="common-btn">
          Login
        </button>
      </form>
    </div>
    )
}

export default SigninForm
