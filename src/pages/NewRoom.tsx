import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

import '../styles/auth.scss'
// import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
    // const { user } = useAuth()

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração representando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form action="">
                        <input type="text"
                        placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}