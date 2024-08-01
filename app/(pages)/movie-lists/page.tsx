
import Image from "next/image";
import PlusImage from "../../../public/images/plus-rounded-icon.svg"
import LogoutImage from "../../../public/images/logout-icon.svg"
import MovieImage1 from "../../../public/images/movie-image-1.png"
import MovieImage2 from "../../../public/images/movie-image-2.png"
import MovieImage3 from "../../../public/images/movie-image-3.png"
import Link from "next/link";
import EmptyState from "../../Components/EmptyList";
import Listing from "./_components/Listing";
export default function MovieLists() {

    const movieLists = [
        {
            MovieImage: MovieImage1,
            MovieName: 'Movie 1',
            ReleaseYear: '2021'
        },
        {
            MovieImage: MovieImage2,
            MovieName: 'Movie 2',
            ReleaseYear: '2021'
        },
        {
            MovieImage: MovieImage2,
            MovieName: 'Movie 3',
            ReleaseYear: '2021'
        },
        {
            MovieImage: MovieImage3,
            MovieName: 'Movie 4',
            ReleaseYear: '2021'
        },
        {
            MovieImage: MovieImage1,
            MovieName: 'Movie 5',
            ReleaseYear: '2021'
        },
        {
            MovieImage: MovieImage2,
            MovieName: 'Movie 6',
            ReleaseYear: '2021'
        },
        {
            MovieImage: MovieImage2,
            MovieName: 'Movie 7',
            ReleaseYear: '2021'
        },
        {
            MovieImage: MovieImage3,
            MovieName: 'Movie 8',
            ReleaseYear: '2021'
        }
    ];
  return (
    <>
    <div className="movie-lists-wrapper pt-120">
        <div className="container">
            <div className="movie-title-wrap pb-120">
                <div className="title-wrapper">
                    <h2 className="">My movies</h2>
                    <Link href='/new-movie' className="add-movie">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="plus-icon">
                        <g clip-path="url(#clip0_3_196)">
                        <path d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_3_196">
                        <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

                        {/* <Image src={PlusImage} alt="plus icon" className="plus-icon" /> */}
                    </Link>
                </div>
                <Link className="logout-btn" href=''>
                    <span>Logout</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="logout-icon">
                    <path d="M18.6667 6.66667L16.7867 8.54667L18.8933 10.6667H8V13.3333H18.8933L16.7867 15.44L18.6667 17.3333L24 12L18.6667 6.66667ZM2.66667 2.66667H12V0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H12V21.3333H2.66667V2.66667Z" fill="white"/>
                    </svg>
                    {/* <Image src={LogoutImage} alt="logout icon" className="logout-icon" /> */}
                </Link>
            </div>
            <div className="movies-wrapper pb-120">
                {
                  movieLists.map((movie, index) => (
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
                ))}
            </div>

            {/* <Listing /> */}
            <ul className="pagination-wrapper">
                <li className="prev-btn">Prev</li>
                <li className="pagination-btn">1</li>
                <li className="pagination-btn">2</li>
                <li className="next-btn">Next</li>
            </ul>
        </div>
    </div>
    </>
  );
}