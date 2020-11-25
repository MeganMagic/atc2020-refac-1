import {useState, useEffect} from 'react';
import defaultAxios from 'axios';
import parser from './useGoogleDataParsing';

const useAxiosTwice = (urls, tables, axiosInstance = defaultAxios) => {

    const [ state, setState ] = useState({
        loading : true,
        error : null,
        data : null
    });
    const [trigger, setTrigger] = useState(0);
    const refetch = () => {
        setState({
            ...state,
            loading : true
        })
        setTrigger(Date.now());
    }

    useEffect( () => {
        let getRequests = []
        urls.map(url => getRequests.push(axiosInstance.get(url)))

        axiosInstance.all( getRequests )
        .then(axiosInstance.spread( (...response) => {
            setState({
                ...state,
                loading : false,
                data : response.map( (r, index) => parser(r.data, tables[index]))
            })
        }))
        .catch(error => {
            setState({
                ...state,
                loading : false,
                error
            })
        })
    }, [trigger])

    return { ...state, refetch }
}

export default useAxiosTwice