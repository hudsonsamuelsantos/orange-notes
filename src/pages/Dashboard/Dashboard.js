import styles from './Dashboard.module.css'

import { useState } from 'react'

import { useIsertDocument } from '../../hooks/useInsertDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import { useAuthValue } from '../../context/AuthContext'

import Notepad from '../../components/Notepad/Notepad'

import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const [notepadTitle, setNotepadTitle] = useState('')
    const [notes, setNotes] = useState([])
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState('')

    const { insertDocument, response } = useIsertDocument('notepads')

    const { user } = useAuthValue()
    const uid = user.uid

    const [query, setQuery] = useState('')

    const { documents: notepads, loading } = useFetchDocuments('notepads', null, uid)

    const navigate = useNavigate()

    const handleSearch = e => {

        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }

    }

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

    }

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={handleSearch} className={styles.search_form}>
                <input type="text" placeholder='Ou busque por tags...' onChange={e => setQuery(e.target.value)} />
                <button className='btn btn-dark'>Pesquisar</button>
            </form>

            <div>
                <div className={styles.my_blocks}>
                    <h1>Meus Blocos de notas</h1>
                    {loading && <p>Carregando...</p>}
                    {notepads && notepads.map(notepad => <Notepad notepad={notepad} key={Math.floor(Math.random() * 999999)} />)}
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