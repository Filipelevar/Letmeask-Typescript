//React
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


//Image
import illustrationIMG from '../../Assets/images/Illustration.svg';
import logoImg from '../../Assets/images/Logo.svg';
import './styles.scss'

//Components
import { database } from '../../Services/firebase';
import { DataSnapshot, get, ref } from 'firebase/database';
import { Button } from '../../Components/Button';
import { useAuth } from '../../hooks/useAuth';




export function Home() {
    const navigate = useNavigate();
    const { user } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    // async function handleCreateRoom() {
    //     if (!user) {
    //         await signInWithGoogle()
    //     }

    //     navigate('/rooms/new');

    // }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (!roomCode) {

            toast.error('Digite o código da sala.');
            return;
        }
        const roomRef = ref(database, `rooms/${roomCode}`);
        const snapshot: DataSnapshot = await get(roomRef);

        if (!snapshot.exists()) {

            toast.error("Sala não encontrada")
            return;
        }

        const roomData = snapshot.val();


        if (roomData.endedAt) {
            toast.error("A Sala já está Fechada")
            return;
        }

        navigate(`/rooms/${roomCode}`);
    }



    return (
        <div id='page-auth-home'>
            <aside>
                <img src={illustrationIMG} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência en tempo-real</p>
            </aside>
            <main>
                <div className="main-content-home">
                    <img src={logoImg} alt="Letmeask" />
                    <h1>Olá, {user?.nome}</h1>
                    <div className="separator-home"> Entre em uma Sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder='Digite o código da sala'
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button id='button-enter-room' type='submit'>
                            Entrar na sala
                        </Button>

                        <div className="separator-home">Ou crie sua Sala</div>

                        <Button id='button-create-room' onClick={() => navigate('/rooms/new')} type='button'>
                            Crie uma sala
                        </Button>
                    </form>

                </div>
            </main>
        </div>
    )
}