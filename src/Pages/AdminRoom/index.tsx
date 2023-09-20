//React and Hooks
import { useParams, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'


import './styles.scss'
import logoImg from '../../Assets/images/Logo.svg'
import deleteImg from '../../Assets/images/delete.svg'
import checkImg from '../../Assets/images/check.svg'
import answerImg from '../../Assets/images/answer.svg'

//Components
import { Button } from '../../Components/Button'
import { RoomCode } from '../../Components/RoomCode'
import { Question } from '../../Components/Question'
import { get, ref, remove, update } from 'firebase/database';
import { database } from '../../Services/firebase'




type RoomParams = {
    id: string;
}


export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id || "";
    const { title, questions } = useRoom(roomId)
    const navigate = useNavigate();

    async function handleEndRoom() {
        if (window.confirm('Tem certeza que você deseja encerrar esta sala?')) {
            await update(ref(database, `rooms/${roomId}`), {
                endedAt: new Date().toISOString(),
            });

            navigate('/home');
        }
    }
    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`);
            await remove(questionRef);
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`);

        try {
            await update(questionRef, {
                isAnswered: true,
            });
        } catch (error) {
        }
    }

    async function handleHighlightQuestion(questionId: string) {
        const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`);

        try {
            const snapshot = await get(questionRef);
            const currentIsHighlighted = snapshot.val().isHighlighted;

            await update(questionRef, {
                isHighlighted: !currentIsHighlighted,
            });
        } catch (error) {

        }
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>


            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>



                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >

                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar Pergunta como respondida" />
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a Pergunta" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    )
}