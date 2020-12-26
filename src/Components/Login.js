import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import './Login.css'
import GithubIcon from "mdi-react/GithubIcon";
import { AuthContext } from "../App";


export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

 

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
  
    const hasCode = url.includes("?code=");
  

    // If Github API returns the code parameter
    if (hasCode) {
      dispatch({
        type: "LOGIN",
            payload: { user: '', isLoggedIn: true }
         });
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      
    }
  });
  
  if (state.isLoggedIn) {
  
    return <Redirect to="/" />;
  }

  return (
    <>
      <section className="container">
        <div>
       
       
          <span>{data.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {
                  // Link to request GitHub access
                }
                <a
                  className="login-link"
                  href={"https://github.com/login/oauth/authorize?scope=user&client_id=dec544512026ef8abcf4&redirect_uri=http://localhost:3000/login/oauth/authorize"}
                  onClick={() => {
                    setData({ ...data, errorMessage: "" });
                  }}
                >
                  <GithubIcon />
                  <span>Login with GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

