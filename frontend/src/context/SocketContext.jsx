import { Children, createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

export const socketDataContext = createContext()

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider = ({children})=>{

    useEffect(()=>{
        socket.on('connect', ()=>{
            console.log('Connect to the server');
        })
        socket.on('disconnect', ()=>{
            console.log('Diconnected');
        })
    },[])


    return(
        <>
        <socketDataContext.Provider value={{ socket }}>
            {children}
    </socketDataContext.Provider>
        </>
    )

}

export default SocketProvider