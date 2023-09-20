//React
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Image
import illustrationIMG from '../../Assets/images/Illustration.svg';
import logoImg from '../../Assets/images/Logo.svg';
import googleIconImg from '../../Assets/images/google-icon.svg';

//Components
import { Button } from '../../Components/Button';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import './styles.scss'

//Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
// import { database } from '../../Services/firebase';
// import { DataSnapshot, get, ref } from 'firebase/database';


export function Login() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        navigate('/home');

    }


    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            toast.error("Erro ao fazer login. Verifique suas credenciais")

        }
    }


    return (
        <div id='page-auth-login'>
            <aside>
                <img src={illustrationIMG} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content-login">
                    <img src={logoImg} alt="Letmeask" />
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder='Digite seu e-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type='submit'>Fazer Login</Button>
                    </form>
                    <div className="separator-login">ou Faça seu login com o Google</div>
                    <button onClick={handleCreateRoom} className="create-room-login">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                    <span >Cadastre-se!!  <Link to='/register'> Crie sua conta. </Link> </span>

                </div>

            </main>

        </div>
    );
}
