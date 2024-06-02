'use client'

import { createContext, useContext, useState } from "react"

interface ILoadingContext{
    isLoading: boolean;
    handleChangeIsLoading: (val: boolean) => void;
}

const LoadingContext = createContext({} as ILoadingContext);

export const useLoadingContext = () => {
    return useContext(LoadingContext);
}

interface ILoadingProvider{
    children: React.ReactNode;
}

export const LoadingProvider = ({children}: ILoadingProvider) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeIsLoading = (loading: boolean) => {
        setIsLoading(loading);
    }

    return(
        <LoadingContext.Provider value={{isLoading, handleChangeIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}