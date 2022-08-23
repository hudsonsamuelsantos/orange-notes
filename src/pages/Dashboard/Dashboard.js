import styles from './Dashboard.module.css'

import { useState } from 'react'

import { useIsertDocument } from '../../hooks/useInsertDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import { useAuthValue } from '../../context/AuthContext'

import Notepad from '../../components/Notepad/Notepad'

function Dashboard() {

    const [notepadTitle, setNotepadTitle] = useState('')
    const [notes, setNotes] = useState([])
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')

    const { insertDocument, response } = useIsertDocument('notepads')

    const { user } = useAuthValue()

    const [query, setQuery] = useState('')
    const { documents: notepads, loading } = useFetchDocuments('notepads')

    const handleSearch = e => {

        e.preventDefault()

    }

    const handleSubmit = e => {

        e.preventDefault()

        setFormError('')

        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())

        insertDocument({
            notepadTitle,
            notes,
            tagsArray,
        })

    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <div>
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
                        {!response.loading && <button className='btn'>Criar</button>}
                        {response.loading && <button className='btn' disabled>Aguarde...</button>}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </div>
            </div>

            <div>
                <form onSubmit={handleSearch} className={styles.search_form}>
                    <input type="text" placeholder='Ou busque por tags...' onChange={e => setQuery(e.target.value)} />
                    <button className='btn btn-dark'>Pesquisar</button>
                </form>
                <div>
                    <h1>Meus Blocos de notas</h1>
                    {loading && <p>Carregando...</p>}
                    {notepads && notepads.map(notepad => <Notepad notepad={notepad} key={notepad.id} />)}
                    {notepads && notepads.length === 0 && (
                        <>
                            <p>Não foram encontrados blocos</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard