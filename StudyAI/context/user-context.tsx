"use client";

import { createContext, useContext, ReactNode, useState,useEffect } from "react";
import { signUp } from "@/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {useRouter } from "next/navigation"

type UserContextType = {
    createUser: (payload: any) => Promise<any>;
    data: any[];
    error: string | null;
    setError: (error: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within a UserProvider");
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);


    const router = useRouter()
    const createUser = async (payload: any) => {
        try {

            const response = await signUp(payload);
            if (response.status === 200) {
                
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                });

                router.push("/dashboard")
                 
            }

        } catch (error) {
            const err = error as AxiosError;

            if (!err.response) {
                toast.error("No hay conexión a internet", {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                const data = err.response.data as any;

                let message = data.detail;

                if (message === "User already registered") {
                    message = "El usuario ya está registrado";
                }

                if (message === "Passwords do not match") {
                    message = "Las contraseñas no coinciden";
                }

                if (message === "Invalid email") {
                    message = "Correo electrónico inválido";
                }

                setError(message);

            }
        }
    };



    return (
        <UserContext.Provider value={{ createUser, data, error, setError }}>
            {children}
        </UserContext.Provider>
    );
};

