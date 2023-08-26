import axios from "axios"
import { useEffect, useState } from "react"

// GET METHODS
export const getAxios = (url) => {


    const [ data, setData] = useState(null)


    useEffect(() => {
            const fetchData = async () => {
                const { data } = await axios.get(url);
                setData(data);
        };

        fetchData();

    },[])

    return {data}

}

// POST METHODS
export const postAxios = (url) => {


    const [ data, setData] = useState(null)


    useEffect(() => {
        const fetchData = async (nombre, email, password) => {
            try{
                const { data } = await axios.post(
                    url,
                    { 
                        nombre,
                        email,
                        password
                    });
                setData(data);
            }
            catch (error){
                console.log(error)
            }
                
        };

        fetchData();

    },[])
    return { data }
    
}

// PUT METHODS
export const putAxios = (url) => {


    const [ data, setData] = useState(null)


    useEffect(() => {
        const fetchData = async (id, userId, title, body) => {
            try{
                const { data } = await axios.put(
                    url,
                    { 
                        id,
                        userId,
                        body,
                        title
                    });
                setData(data);
            }
            catch (error){
                console.log(error)
            }
                
        };

        fetchData(
            1,
            1,
            'Loncha',
            'Loncha description'
        );

    },[])

    return { data }
    
}

// DELETE METHODS
export const deleteAxios = (url) => {

    const [ data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try{ 
                const { data } = await axios.delete(url);
                setData(data);
            }
            catch (error){
                console.log(error)
            }
                
        };

        fetchData(285);

    },[])

    return { data }
    
}

