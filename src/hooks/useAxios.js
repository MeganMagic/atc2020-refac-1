import {useState, useEffect} from 'react';
import defaultAxios from 'axios';
import parser from './useGoogleDataParsing';

const useAxios = (url, table, axiosInstance = defaultAxios) => {
    const [ state, setState ] = useState({
        data : null,
        loading : true,
        error : null
    })
    const [ trigger, setTrigger ] = useState(0);
    const refetch = () => {
        setState({
            ...state,
            loading : true
        })
        setTrigger(Date.now());
    }
    useEffect( () => {
        defaultAxios.get(url)
        .then( (res) => {
            setState({
                ...state,
                loading : false,
                data : parser(res.data, table)
            })
        })
        .catch((error) => {
            setState({
                ...state,
                loading : false,
                error
            })
        })
    }, [trigger])

    return { ...state, refetch }
}

export default useAxios