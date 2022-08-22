import styles from './Dashboard.module.css'

import { useState } from 'react'

import { useIsertDocument } from '../../hooks/useInsertDocument'

import { useAuthValue } from '../../context/AuthContext'

function Dashboard() {

    const [notepadTitle, setNotepadTitle] = useState('')
    const [notes, setNotes] = useState([])
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')

    const { insertDocument, response } = useIsertDocument('posts')

    const { user } = useAuthValue()

    const handleSubmit = e => {

        e.preventDefault()

        setFormError('')

        insertDocument({
            notepadTitle,
            notes,
            tags,
        })

    }

    return (
        <div>
            <div>
                <div className={styles.create_post}>
                    <h2>Criar novo bloco de notas</h2>
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
                        {!response.loading && <button className='btn'>Criar Bloco de notas</button>}
                        {response.loading && <button className='btn' disabled>Aguarde...</button>}
                        {response.error && <p className='error'>{response.error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dashboard