"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import downloadIcon from "../../../assets/download.svg";
import "../../create-movie/createMovie.css";
import { useRouter } from "next/navigation";

const EditMovie = ({ params }) => {
  const [movieData, setMovieData] = useState({});
  const router = useRouter();
  const fetchData = async () => {
    try {
      await fetch(`/api/movie/?id=${params.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setMovieData(data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);


  const handleFile = (event) => {
        setMovieData((prevstate) => ({
          ...prevstate,
          moviePoster: event?.target?.files[0],
        }));
  };

  const handleCreateMovie = async (event) => {
    event.preventDefault();
    try {

      const formData = new FormData();
      formData.append('file', movieData.moviePoster);
      formData.append('title' ,movieData.title )
      formData.append('publishedYear' ,movieData.publishedYear)
      formData.append('_id' ,movieData._id )

      const response = await fetch("/api/movie", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        router.push("/movie-list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (event) => {
    setMovieData((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="movie-list-page">
      <div className="container">
        <div className="heading-box theme-gap-vertical">
          <h3 className="heading-text mb-0 d-inline-block">Edit</h3>
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
                  <Image src={downloadIcon} alt="download" />
                  <span className="drop-info-text d-block w-100">
                    Drop an image here
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-12 mt-md-0 mt-5 offset-md-1 offset-0">
              <form className="addMove-form">
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control d-inline-block"
                    value={movieData?.title ?? ""}
                    name="title"
                    onChange={handleFormChange}
                    placeholder="Title "
                  />
                </div>
                <div className="mb-5 mb-n1 d-inline-block">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Publishing year"
                    name="publishedYear"
                    onChange={handleFormChange}
                    value={movieData?.publishedYear}
                  />
                </div>
                <div className="image-preview">
                  <Image
                    src={movieData?.moviePoster ? typeof movieData?.moviePoster == "string" ? movieData.moviePoster  :  URL.createObjectURL(movieData.moviePoster ?? {})  : ""}
                    alt="Movie Poster"
                    height="200"
                    width="200"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="d-flex mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-light me-3 w-50"
                    onClick={() => router.push("/movie-list")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-50"
                    onClick={handleCreateMovie}
                  >
                    Update
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

export default EditMovie;
