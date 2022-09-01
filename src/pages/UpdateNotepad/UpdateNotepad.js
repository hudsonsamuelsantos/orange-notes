import styles from './UpdateNotepad.module.css'

import { useEffect, useState } from 'react'

import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useAuthValue } from '../../context/AuthContext'

import { useNavigate, useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'

import { ArrowCircleLeft } from 'phosphor-react'

function UpdateNotepad() {

    const { id } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const [notepadTitle, setNotepadTitle] = useState('Carregando...')
    const [tags, setTags] = useState('Carregando...')
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if (notepad) {
            setNotepadTitle(notepad.notepadTitle)

            const textTags = notepad.tagsArray.join(", ");

            setTags(textTags)
        }
    }, [notepad])

    const { updateDocument, response } = useUpdateDocument('notepads')

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        setFormError('')

        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())

        const data = {
            notepadTitle,
            tagsArray,
            uid: user.uid,
            createdBy: user.email
        }

        updateDocument(id, data)

        navigate('/dashboard')

    }

    return (
        <div className={styles.update_notepad}>
            <div className={styles.back_to_dashboard_box}>
                <Link to={`/dashboard`} className={styles.back_to_dashboard}>
                    <ArrowCircleLeft size={32} />
                    <span>Voltar</span>
                </Link>
            </div>
            <h1>Editar Bloco De Notas</h1>
            <div className={styles.update_notepad_display}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Título do Bloco:</span>
                        <input
                            type="text"
                            name='notepadTitle'
                            required
                            placeholder='Insira um título para o seu bloco de notas'
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
                    {!response.loading && <button className={styles.btn}>Salvar</button>}
                    {response.loading && <button className={styles.btn} disabled>Aguarde...</button>}
                    {response.error && <p className='error'>{response.error}</p>}
                    {formError && <p className='error'>{formError}</p>}
                </form>
            </div>
        </div>
    )
}

export default UpdateNotepad