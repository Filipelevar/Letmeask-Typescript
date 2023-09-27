import { Button } from '../../Components/Button';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

import illustrationIMG from '../../Assets/images/Illustration.svg';
import logoImg from '../../Assets/images/Logo.svg';
import './styles.scss';
import { database } from '../../Services/firebase';
import { push, ref } from 'firebase/database';



export function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (!displayName) {
            toast.error('Nome completo é obrigatório.');
            return;
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email.match(emailRegex)) {
            toast.error('Email inválido.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!password.match(passwordRegex)) {
            toast.error('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('A confirmação de senha não corresponde à senha original.');
            return;
        }

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: displayName,
                });

                const userInfo = { 'id': userCredential.user.uid, 'email': email, 'password': password, 'displayName': displayName, 'role': 'Common' }

                // Common
                // AdminRoom 
                // Admin 

                const roomRef = ref(database, `user/${userInfo.id}`);
                await push(roomRef, userInfo);


                toast.success('Usuário registrado com sucesso. Email: ' + userCredential.user.email);
                navigate('/');
            } else {
                toast.error('Erro ao registrar. Verifique suas credenciais');
            }
        } catch (error) {
            console.log(error)
            toast.error('Erro ao registrar.');

        }
    }




    return (
        <div id='page-auth-register'>
            <main>
                <div className="main-content-register">
                    <img src={logoImg} alt="Letmeask" />
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Nome Completo"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirme Sua Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit">Registrar</Button>
                    </form>
                </div>
            </main>
            <aside>
                <img src={illustrationIMG} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
        </div>
    );
}