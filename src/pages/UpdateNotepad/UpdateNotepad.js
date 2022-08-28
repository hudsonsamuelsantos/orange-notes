import { useEffect, useState } from 'react'

import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useAuthValue } from '../../context/AuthContext'

import { useNavigate, useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'

function UpdateNotepad() {

    const { id } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const [notepadTitle, setNotepadTitle] = useState('')
    const [tags, setTags] = useState('')
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
        <div>
            <Link to={`/dashboard`}>- Voltar</Link>
            <h1>Editar bloco de notas</h1>
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
                {!response.loading && <button className='btn'>Criar</button>}
                {response.loading && <button className='btn' disabled>Aguarde...</button>}
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default UpdateNotepad