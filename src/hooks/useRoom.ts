import { useEffect, useState } from "react"


import { database } from "../Services/firebase";
import { off, onValue, ref } from "firebase/database";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        nome: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>


type QuestionType = {
    id: string;
    author: {
        nome: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}



export function useRoom(roomId: string) {
    const { user } = useAuth()
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')


    useEffect(() => {
        const roomRef = ref(database, `rooms/${roomId}`);

        const unsubscribe = onValue(roomRef, (snapshot) => {
            const databaseRoom = snapshot.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom?.questions || {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        });

        return () => {
            off(roomRef, 'value', unsubscribe);
        };
    }, [roomId, user?.id]);

    return { questions, title };
}