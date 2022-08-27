import { useState } from 'react'

import { useIsertDocument } from '../../hooks/useInsertDocument'

import { useAuthValue } from '../../context/AuthContext'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

function AddNotepad() {

    const [notepadTitle, setNotepadTitle] = useState('')
    const [notes] = useState([])
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')

    const { insertDocument, response } = useIsertDocument('notepads')

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        setFormError('')

        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())

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

    }

    return (
        <div>
            <Link to={`/dashboard`}>- Voltar</Link>
            <h1>Criar novo bloco de notas</h1>
            <p>Crie blocos para manter suas anotações organizadas!</p>
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

export default AddNotepad