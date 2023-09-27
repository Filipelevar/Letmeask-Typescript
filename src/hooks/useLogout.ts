import { useCallback } from 'react';
import { getAuth, signOut } from 'firebase/auth';

type LogoutFunction = () => Promise<void>;

export function useLogout(): LogoutFunction {
    const logout: LogoutFunction = useCallback(async () => {
        const auth = getAuth();

        try {

            await signOut(auth);
            console.log('Usuário desconectado com sucesso.');

            localStorage.removeItem('userStorage')
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }, []);

    return logout;
}
