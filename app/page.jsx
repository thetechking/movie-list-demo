"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

export default function Home() {
  const [formdata, setFormdata] = useState({});
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handelOnchange = (event) => {
    if (event.target.type === "checkbox") {
      setFormdata((prevstate) => ({
        ...prevstate,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setFormdata((prevstate) => ({
        ...prevstate,
        [event.target.name]: event.target.value,
      }));
    }
    setIsError(isError);
  };
  const getCookie = (name) => {
    var cookieName = window.btoa(name) + "=";
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return window.atob(
          decodeURIComponent(cookie.substring(cookieName.length))
        );
      }
    }

    return null;
  };

  const setCookie = (name, value) => {
    var cookieString = name + "=" + encodeURIComponent(value) + ";path=/";
    document.cookie = cookieString;
  };
  const deleteCookie = (name)  =>{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formdata),
      });
      
      if (response.ok) {
        router.push("/movie-list");
        if (formdata.isRemember) {
          setCookie(window.btoa("isRemember"), window.btoa(formdata.isRemember));
          setCookie(window.btoa("email"), window.btoa(formdata.email));
          setCookie(window.btoa("password"), window.btoa(formdata.password));
        }
        else{
          document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isRemember = getCookie("isRemember")
    let email = getCookie("email");
    let password = getCookie("password")
    if(isRemember){
      setFormdata({isRemember : isRemember , email: email , password: password})
    }
  }, []);


  return (
    <main>
      <div className="login-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 mx-auto text-center">
              <h2 className="heading-text mb-5 mb-n2">Sign in</h2>
              <form className="login-form">
                <div className="mb-4">
                  <input
                    type="email"
                    className={`form-control ${isError ? "input-error" : ""}`}
                    placeholder="Email"
                    name="email"
                    value={formdata.email}
                    onChange={handelOnchange}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    className={`form-control ${isError ? "input-error" : ""}`}
                    placeholder="Password"
                    name="password"
                    value={formdata.password}
                    onChange={handelOnchange}
                  />
                </div>
                {isError ? (
                  <span className="text-danger">Invalid Credentials</span>
                ) : (
                  <></>
                )}
                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    name="isRemember"
                    checked={formdata.isRemember}
                    onChange={handelOnchange}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
