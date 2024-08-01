'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { asyncAddEditCollection } from '../../../../../redux/thunks/movieList.Thunk'
import Image from 'next/image'
import downloadIcon from '../../../../../public/images/download-icon.svg'

const AddEditMovie:React.FC = (movieId) => {

    const dispatch = useDispatch()

    const AddEditSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        publishyear: yup.string().required('Publish year is required'),
      });

    const {register, handleSubmit, formState:{errors},reset} = useForm({
        resolver: yupResolver(AddEditSchema),
      })

    const {movie, loading} = useSelector((state: RootState) => state.MovieListSlice)

    useEffect(()=>{
       
    },[])

    const handleAddEditMovie=(data:any)=>{
        if(!movieId){
            dispatch(asyncAddEditCollection({data}))
        }
        else{
            dispatch(asyncAddEditCollection({movieId,...data}))
        }
    }

  return (


    <form  onSubmit={handleSubmit(handleAddEditMovie)}>
    <div className="add-movie-wrapper">
        <div className="drag-image-box">
            <input type="file" className="file-btn" />
            <div className='drop-content'>
                <Image src={downloadIcon} alt="download icon" />
                <span>Drop an image here</span>
            </div>

            {/* show this image when user upload image from upload file */}
            {/* <Image src={downloadIcon} alt="movie image" className="uploded-img" /> */}
        </div>
        <div className="add-details">
    <div className="inner-form">
        {/* <form onSubmit={handleSubmit(handleAddEditMovie)}> */}
        <div className="input-wrapper">
            <input type="text" placeholder="Title" {...register("title")} />
            {errors.title && <span className="error-msg">{errors.title.message}</span>}
            {/* <span className="error-msg">Enter movie title</span> */}
        </div>
        <div className="input-wrapper year-input">
            <input type="number" placeholder="Publishing year" {...register("publishyear")} />
            {errors.publishyear && <span className="error-msg">{errors.publishyear.message}</span>}
            {/* <span className="error-msg">Enter publishing year</span> */}
        </div>
        <div className="btn-wrapper">
            <button type="button" className="common-btn white-border-btn" onClick={()=>reset()}>Cancel</button>
            <button type="submit" className="common-btn">Submit</button>
        </div>
        {/* </form> */}
    </div>
</div>
    </div>
</form>

    
  )
}

export default AddEditMovie