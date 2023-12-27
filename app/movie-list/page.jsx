"use client"
import React, { useEffect, useState } from 'react'
import "./movieList.css"
import Image from 'next/image'
import plusIcon from "../../assets/plus.svg"
import logoutIcon from "../../assets/logout.svg"
import { useRouter } from 'next/navigation'

const MovieList = () => {
    const pageSize = 8
    const router = useRouter()
    const [movieData, setMovieData] = useState([])
    const [page , setPage] = useState(1)
    const [totalPage , setTotalPage] = useState(1)
    const fetchData =async() => {
        try {
            await fetch("/api/movie" , {
               method: "POST",
               body: JSON.stringify({page : page , pageSize:pageSize})
             }).then(res => res.json()).then(data =>  {
                setMovieData(data.data)
                setTotalPage(Math.ceil(data.totalRecords / pageSize))
            }).catch(err => console.log(err))
           
            
          } catch (error) {
            console.log(error); 
          }
    }

    useEffect(() => {
        fetchData()
    } , [page])

    const handleLogout = async() => {
        await fetch("/api/auth/logout" , {
            method: "GET",
          }).then(res => router.push("/")).catch(err => console.log(err))
    }

    const handlePrevious =() => {
        setPage(page -1 )
    }

    const handleNext =() => {
        setPage(page + 1)
    }
  return (
   <> { !movieData?.length ? <div className="movie-list-page">
        <div className="container">
            <div className=" text-center">
                <h3 className="heading-text mb-5 mb-n2">Your movie list is empty</h3>
                <button type="button" className="btn btn-primary d-inlin-block" onClick={() => router.push("/create-movie")}>Add a new movie</button>
            </div>
        </div>
    </div>
    :  <div className="movie-list-page">
    <div className="container">
        <div className="movieList-top d-sm-flex justify-content-between align-items-center theme-gap-vertical d-block">
            <div className="heading-box d-flex align-items-center">
                <h3 className="heading-text mb-0 d-inline-block">My movies</h3>
                <button type="submit" className="btn d-inlin-block ms-3 p-0 button-padding">
                    <Image src={plusIcon} alt="plus" onClick={() => router.push('/create-movie')}/></button>
            </div>
            <div className="logout-box d-flex align-sm-items-center justify-content-end mt-sm-0 mt-3">
                <span className="logout-text">Logout</span>
                <button type="submit" className="btn d-inlin-block ms-3 p-0 button-padding" onClick={handleLogout}>
                    <Image src={logoutIcon} alt="logout" />
                </button>
            </div>
        </div>
        <div className="movie-list-item">
            <div className="row g-4">
                {
                  movieData?.map(movieDetails => {
               return <div className="col-xl-3 col-md-4 col-6" role='button' key={movieDetails?._id} onClick={() => router.push(`/edit-movie/${movieDetails?._id}`)}>
                    <div className="card">
                        <Image src={movieDetails?.moviePoster} className="card-img-top" height="400" width="266" alt="Movie Poster"/>
                        <div className="card-body">
                            <h5 className="card-title">{movieDetails?.title}</h5>
                            <p className="card-text">{movieDetails?.publishedYear}</p>
                        </div>
                    </div>
                </div>

                  })  
                }
            </div>
            <div className="theme-gap-vertical">
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center m-0">
                        <button className="page-item bg-transparent" onClick={handlePrevious} disabled={page == 1} >
                            <span className={`page-link  ${page == 1 ? 'link-disabled' : ''}`} href="#">Prev</span>
                        </button>
                        {
                            Array.from({ length: Math.ceil(totalPage) }, () => 0)?.map((_, index) => {
                                return<li className={`page-item ${page === index+ 1 ? 'active': '' }`}><span className="page-link">{index + 1}</span></li>
                            })
                        }
                        <button className="page-item bg-transparent border-none" disabled={page == totalPage}>
                            <span className={`page-link  ${page == totalPage ? 'link-disabled' : ''}`} href="#" onClick={handleNext}>Next</span>
                        </button>
                    </ul>
                </nav>
            </div>

        </div>

    </div>
</div>
}
    </>
  )
}

export default MovieList