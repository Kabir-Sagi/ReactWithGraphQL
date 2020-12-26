import React, { useContext,useState,useEffect,useRef,useCallback } from "react";
import { Redirect } from "react-router-dom";
import Axios from 'axios'

import { AuthContext } from "../App";
import './Home.css'


 function Home() {
   const [state1,setState1] = useState([])
   const [state2,setState2] = useState(5)
   const [hasMoreData,setHasMoreData] = useState(false)

   let observer = useRef()
   let lastList = useCallback(node => {
     if(observer.current) observer.current.disconnect()
     observer.current = new IntersectionObserver(entries =>{
       if(entries[0].isIntersecting && hasMoreData) {
     
         setState2(state2 => state2 + 5)
    
       }
     })
     if(node) observer.current.observe(node)
   },[hasMoreData])
   const githubData = {
     "token":process.env.TOKENID,
   }
   const header = {
    "Content-Type": "application/json",
    Authorization:"bearer "+githubData["token"]
   
   
   }

   const queryGQL = {
     query:`
    query {
      viewer {
        repositories(first: ${state2}) {
          totalCount
          nodes {
            nameWithOwner,
            createdAt,
            url
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
     `
   }

   useEffect(()=>{
   
    fetch('https://api.github.com/graphql',{
      method:'POST',
      headers:header,
      mode:'cors',
      body:JSON.stringify(queryGQL)
    }).then(res=>res.json()).then(data=>{console.log(data.data.viewer.repositories.nodes)
       setState1(data.data.viewer.repositories.nodes)
       setHasMoreData(data.data.viewer.repositories.nodes > 0) }
    )
   })
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }



  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  return (
    <>
 
   

     
      
      <div className="container  h-100">
      <div className="navdiv mt-2">
      <button className="btn btn-rounded btn-dark" href="/" onClick={()=> handleLogout()}>Logout</button></div>
        <div>
        
          <div className="">
           
           {/* <p>{JSON.stringify(state1)}</p> */}
           
             
           <ul className="list-group">
          {state1.map((data,index)=>{
            if(state1.length === index + 1) {
              return (
                <>
                 <li className="list-group-item mt-4">Repository Name: {data.nameWithOwner}</li>
                <li className="list-group-item">Created On: {data.createdAt}</li>
                <li ref={lastList} className="list-group-item">Repository Link: <a href={data.url}>Link</a></li>
                </>
              )
            } else {
            return (
              <>
           
             <a href="/details"  > <li  className="list-group-item mt-4">Repository Name: {data.nameWithOwner}</li></a>
                <li className="list-group-item">Created On: {data.createdAt}</li>
                <li  className="list-group-item">Repository Link: <a href={data.url}>Link</a></li>
             
           
              </>
            )}
          })}
          </ul>
          </div>
        </div> 
      </div>
    </>
  );
}

export default Home