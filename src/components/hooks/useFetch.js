import { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useFetch = (url, fetchEnabled) => {
   const [data, setData] = useState(null)
   const [isPending, setIsPending] = useState(true)
   const [error, setError] = useState(null)
   const history = useHistory();
   const token = localStorage.getItem('token')
   
   if (!token) {
      history.push('/');
   }
   
   useEffect(() => {
      if (fetchEnabled) {
         setIsPending(true)
         axios({
            url: url,
            method: "GET",         
            headers: {
               'Accept': '*/*',
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${JSON.parse(token).access_token}`
            },
            withCredentials: true
         })
         .then(response => {
            if (response.status !== 200){
               throw new Error('Could not fetch the data')
            }
            return response.data
         })
         .then(data => {
            setData(data);
            setIsPending(false);
            setError(null)
         })
         .catch(error => {
            setIsPending(false)
            setError(error.message)
            localStorage.removeItem('login');
            localStorage.removeItem('token');
         })
      }
   }, [url, fetchEnabled, token]);

   return { data, isPending, error };
}

export default useFetch;
