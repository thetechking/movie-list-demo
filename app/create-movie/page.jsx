'use client'
import React, { useState } from "react";
import "./createMovie.css";
import downloadIcon from "../../assets/download.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CreateMovie = () => {
  const [movieData, setMovieData] = useState({})
  const router = useRouter()
  const handleFile = (event) => {
    setMovieData(prevstate => ({...prevstate , "moviePoster" : event?.target?.files[0] }))
  };

  const handleCreateMovie = async (event) => {
    event.preventDefault()
    try {
      
      const formData = new FormData();
      formData.append('file', movieData.moviePoster);
      formData.append('title' ,movieData.title )
      formData.append('publishedYear' ,movieData.publishedYear )

      const response = await fetch("/api/movie" , {
         method: "PUT",
         body: formData
       })
     
       if (response.ok) {
         router.push("/movie-list");
       }
    } catch (error) {
      console.log(error); 
    }
  }

  const handleFormChange =(event) => {
    setMovieData(prevstate => ({...prevstate , [event.target.name] : event.target.value}))
  }

  return (
    <div className="movie-list-page">
      <div className="container">
        <div className="heading-box theme-gap-vertical">
          <h3 className="heading-text mb-0 d-inline-block">
            Create a new movie
          </h3>
        </div>
        <div className="create-movie-box">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-12">
              <div className="drop-box">
                <input
                  type="file"
                  className="file-Upload"
                  onChange={handleFile}
                />
                <div className="drop-info">
                  {!movieData.moviePoster ? 
                  <><Image src={downloadIcon} alt="download" />
                  <span className="drop-info-text d-block w-100">
                    Drop an image here
                  </span></> : 
                  <>
                  <Image src={URL.createObjectURL(movieData.moviePoster)} alt="Movie Poster" layout="fill" style={{borderRadius: "10px"}}/>
                  </>}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-12 mt-md-0 mt-5 offset-md-1 offset-0">
              <form className="addMove-form">
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control d-inline-block"
                    placeholder="Title "
                    name="title"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-5 mb-n1 d-inline-block">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Publishing year"
                    name="publishedYear"
                    onChange={handleFormChange}
                  />
                </div>

                <div className="d-flex mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-light me-3 w-50"
                    onClick={()=> router.push('/movie-list')}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary w-50" onClick={handleCreateMovie}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
