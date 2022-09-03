import styles from './AddNotepad.module.css'

import { useState } from 'react'

import { useIsertDocument } from '../../hooks/useInsertDocument'

import { useAuthValue } from '../../context/AuthContext'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import { ArrowCircleLeft } from 'phosphor-react'
import { toast } from 'react-toastify'

function AddNotepad() {

    const [notepadTitle, setNotepadTitle] = useState('')
    const [notes] = useState([])
    const [tags, setTags] = useState('')

    const { insertDocument, response } = useIsertDocument('notepads')

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())

        if (!notepadTitle || !tagsArray) {
            toast.error('Por favor preencha todos os campos')
            return
        }

        insertDocument({
            notepadTitle,
            notes,
            tagsArray,
            uid: user.uid,
            createdBy: user.email
        })

        setNotepadTitle('')
        setTags('')

        navigate('/dashboard')

        toast.success('Bloco criado com sucesso!')

    }

    return (
        <div className={styles.add_notepad}>
            <div className={styles.back_to_dashboard_box}>
                <Link to={`/dashboard`} className={styles.back_to_dashboard}>
                    <ArrowCircleLeft size={32} />
                    <span>Voltar</span>
                </Link>
            </div>
            <h1>Criar Novo Bloco De Notas</h1>
            <p>Crie blocos para manter suas anotações organizadas!</p>
            <div className={styles.add_notepad_display}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Título do Bloco:</span>
                        <input
                            type="text"
                            name='notepadTitle'
                            required
                            placeholder='Insira um título para o seu bloco'
                            value={notepadTitle}
                            onChange={e => setNotepadTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Tags:</span>
                        <input
                            type="text"
                            name='tags'
                            required
                            placeholder='Insira as tags separadas por vírgula'
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                        />
                    </label>
                    {!response.loading && <button onClick={handleSubmit} className={styles.btn}>Criar</button>}
                    {response.loading && <button className={styles.btn} disabled>Aguarde...</button>}
                </form>
            </div>
        </div>
    )
}

export default AddNotepad