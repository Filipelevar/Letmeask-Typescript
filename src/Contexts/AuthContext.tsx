import { createContext, ReactNode } from "react";
import { useState } from 'react';
import { auth } from '../Services/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast from "react-hot-toast";
import { getAuth } from 'firebase/auth';

type User = {
    id: string;
    nome: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    loginUsernameAndPassword: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User | undefined>()


    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        try {

            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                const { displayName, photoURL, uid } = result.user

                if (!displayName || !photoURL) {
                    throw new Error(toast.error("Está faltando algumas informações de sua Google Account"));
                }

                setUser({
                    id: uid,
                    nome: displayName,
                    avatar: photoURL
                })

                localStorage.setItem('userStorage', uid)

            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loginUsernameAndPassword(email: string, password: string, navigate: (path: string) => void) {
        try {
            const authInstance = getAuth();
            await signInWithEmailAndPassword(authInstance, email, password);
            navigate('/home');

            localStorage.setItem('userStorage', email)
        } catch (error) {
            toast.error("Erro ao fazer login. Verifique suas credenciais");
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, loginUsernameAndPassword }}>
            {props.children}
        </AuthContext.Provider>
    );
}
