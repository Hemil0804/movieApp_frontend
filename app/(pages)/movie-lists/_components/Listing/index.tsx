'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncMovieListCollection } from '../../../../../redux/thunks/movieList.Thunk'
import { RootState } from '../../../../../redux/store';
import EmptyState from '../../../../Components/EmptyList';

export interface Movie {
  id: number;
  MovieName: string;
  ReleaseYear: string;
  MovieImage: string;
}

export interface MovieListState {
  movieList: Movie[];
  loading: boolean;
}

const Listing = () => {
  const dispatch = useDispatch();
  const { movieList, loading } = useSelector((state: RootState) => state.MovieListSlice);

  useEffect(() => {
    dispatch(asyncMovieListCollection());
  }, [dispatch]);

  console.log(movieList,"movieList");
  

  return (
    <>
      <div className="movies-wrapper pb-120">
        {
          loading ? 
              ("Loading")
          : 
          movieList.length ==0 ? 
          <EmptyState />
          :
           
          (
            movieList.map((movie: any, index: number) => (
              <div className='movie-card' key={index}>
                  <div className="image-box">
                      {movie.MovieImage && (
                          <Image src={movie.MovieImage} alt={`Image of ${movie.MovieName}`} />
                      )}
                  </div>
                  <div className="content">
                      <h3>{movie.MovieName}</h3>
                      <span>{movie.ReleaseYear}</span>
                  </div>
              </div>
          ))

        //  <ul className="pagination-wrapper">
        //   <li className="prev-btn">Prev</li>
        //   <li className="pagination-btn">1</li>
        //   <li className="pagination-btn">2</li>
        //   <li className="next-btn">Next</li>
        //  </ul>
        )
        }
      </div>
    </>
  )
}

export default Listing
