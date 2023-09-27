import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'


import illustrationIMG from '../../Assets/images/Illustration.svg'
import logoImg from '../../Assets/images/Logo.svg'

import { Button } from '../../Components/Button'
import { useAuth } from '../../hooks/useAuth'


import './styles.scss'
import { database } from '../../Services/firebase'
import { push, ref } from 'firebase/database'
import { useLogout } from '../../hooks/useLogout'




export function NewRoom() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();


        try {
            if (newRoom.trim() === '' || !user) {
                return;

            }


            const roomRef = ref(database, 'rooms');

            const firebaseRoom = await push(roomRef, {
                title: newRoom,
                authorId: user.id,
            });

            navigate(`/rooms/${firebaseRoom.key}`);
        }

        catch (error) {
            console.log(error)
        }
    }



    const handleLogout = async () => {
        await logout();
        navigate('/')
    }


    return (
        <div id='page-auth-Room'>
            <aside>
                <img src={illustrationIMG} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência en tempo-real</p>
            </aside>
            <main>
                <Button onClick={handleLogout}>Logout</Button>
                <div className="main-content-Room">
                    <img src={logoImg} alt="Letmeask" />
                    <h1>{user?.nome}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder='Nome da Sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>

                </div>
            </main>
        </div>
    )
}