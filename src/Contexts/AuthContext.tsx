import { createContext, ReactNode } from "react";
import { useState, useEffect } from 'react'

import { auth } from '../Services/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import toast from "react-hot-toast";


type User = {
    id: string;
    nome: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}


type AuthContextProviderProps = {
    children: ReactNode;

}



export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error(toast.error("Está faltando algumas informações de sua Google Acount"));
                }

                setUser({
                    id: uid,
                    nome: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe();
        }

    }, [])

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                const { displayName, photoURL, uid } = result.user

                if (!displayName || !photoURL) {
                    throw new Error(toast.error("Está faltando algumas informações de sua Google Acount"));
                }

                setUser({
                    id: uid,
                    nome: displayName,
                    avatar: photoURL
                })
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}