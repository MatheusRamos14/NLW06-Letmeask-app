import logoImg from '../assets/images/logo.svg'
import checkIcon from '../assets/images/check.svg'
import answerIcon from '../assets/images/answer.svg'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { useHistory, useParams } from 'react-router-dom';

import '../styles/room.scss'
import deleteIcon from '../assets/images/delete.svg'
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    } 

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        }) 
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo do Letmeask" id="icon"/>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>
                        Sala {title}
                    </h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
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
                                        type="button"
                                        onClick={
                                            () => handleCheckQuestionAsAnswered(question.id)
                                        }>
                                            <img src={checkIcon} alt="Marcar como respondida"/>
                                        </button>
                                        <button
                                        type="button"
                                        onClick={
                                            () => handleHighlightQuestion(question.id)
                                        }>
                                            <img src={answerIcon} alt="Destacar pergunta"/>
                                        </button>
                                    </>
                                )}
                                <button
                                type="button"
                                onClick={
                                    () => handleDeleteQuestion(question.id)
                                }>
                                    <img src={deleteIcon} alt="Remover pergunta"/>
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}