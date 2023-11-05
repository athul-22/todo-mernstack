import {useState,useEffect} from 'react'
import axios from 'axios'

export default function useAuthCheck() {    const [auth,setAuth] = useState();

    const verifyAuth = async() => {
        try{
            const res = await axios.get('/api/auth/is_logges_in');
            return res.data;

        }catch(error){
            console.log(error);
            return false
        }
    }

    useEffect(() => {
        (async () => {
            const data = await verifyAuth();
            setAuth(data);
        })();
    }, []); 


    return {auth};
}