import styles from './Dashboard.module.css'

import { useState, useEffect } from 'react'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

import { useAuthValue } from '../../context/AuthContext'

import { useNavigate, Link } from 'react-router-dom'

import { MagnifyingGlass, Notepad, PlusCircle, Trash, TrendUp, Trophy, UserCircle } from 'phosphor-react'

function Dashboard() {

    const { user } = useAuthValue()
    const uid = user.uid

    const [query, setQuery] = useState('')
    const [points, setPoints] = useState('...')
    const [mylevel, setMyLevel] = useState('...')
    const [myNextLevelRequirement, setMyNextLevelRequirement] = useState('...')

    const { documents: notepads, loading } = useFetchDocuments('notepads', null, uid)

    const navigate = useNavigate()

    const { deleteDocument } = useDeleteDocument('notepads')

    const handleSearch = e => {

        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }

    }

    const checkedLevel = points => {

        let level
        let nextLevelRequirement

        if (points < 10) {
            level = 'Nível 1'
            nextLevelRequirement = '10'
        } else if (points >= 10 && points < 20) {
            level = 'Nível 2'
            nextLevelRequirement = '20'
        } else if (points >= 20 && points < 30) {
            level = 'Nível 3'
            nextLevelRequirement = '30'
        } else if (points >= 30 && points < 40) {
            level = 'Nível 4'
            nextLevelRequirement = '40'
        } else if (points >= 20 && points < 50) {
            level = 'Nível 5'
            nextLevelRequirement = '50'
        } else {
            level = 'Nível Expert (Max)'
            nextLevelRequirement = 'Infinite'
        }

        return { level, nextLevelRequirement }
    }

    useEffect(() => {

        setPoints('...')
        setMyLevel('...')
        setMyNextLevelRequirement('...')

        if (notepads) {

            let notesCounter = 0
            let notepadCounter = notepads.length

            notepads.map(notepad => {
                notesCounter = notesCounter + notepad.notes.length
            })

            let poitsPerNotepads = 3
            let notesPoints = notesCounter
            let notepadPoints = notepadCounter * poitsPerNotepads
            let totalPoints = notesPoints + notepadPoints

            setPoints(totalPoints)

            let currentLevel = checkedLevel(totalPoints).level
            let currentNextLevelRequirement = checkedLevel(totalPoints).nextLevelRequirement

            setMyLevel(currentLevel)
            setMyNextLevelRequirement(currentNextLevelRequirement)

        }

    }, [notepads])

    return (
        <div>
            <div
                onClick={() => navigate('/my-progress')}
                className={styles.user_stats_display}
            >
                <div className={styles.user_name_display}>
                    <UserCircle size={32} />
                    {user && user.displayName}
                </div>
                <div className={styles.user_level_display}>
                    <Trophy size={32} />
                    {mylevel}
                </div>
                <div className={styles.user_points_display}>
                    <TrendUp size={32} />
                    <span>Pontuação: {points}/{myNextLevelRequirement}</span>
                </div>
            </div>

            <h1>Dashboard</h1>

            <form onSubmit={handleSearch} className={styles.search_form}>
                <input type="text" placeholder='Busque por uma tag...' onChange={e => setQuery(e.target.value)} />
                <button>
                    <MagnifyingGlass size={24} />
                </button>
            </form>

            <div className={styles.dashboard_table}>
                {loading && <p>Carregando...</p>}
                <div>
                    <div className={styles.dashboard_table_header}>
                        <div className={styles.dashboard_table_header_title}>
                            <Notepad size={32} />
                            <span>Meus Blocos de Notas</span>
                        </div>

                        <div>
                            <Link to={'/add-notepad'} className={styles.dashboard_table_header_add}>
                                <PlusCircle size={32} color={'darkgreen'} />
                                <span>Adicionar</span>
                            </Link>
                        </div>

                    </div>

                    <div>
                        {notepads &&
                            notepads.map(notepad => (
                                <div key={notepad.id} className={styles.dashboard_table_notepad}>
                                    <div>
                                        <span>{notepad.notepadTitle}</span>
                                        <div>
                                            <span>Tags:</span>
                                            <span>
                                                {notepad.tagsArray &&
                                                    notepad.tagsArray.map((tag, index) => (
                                                        <span key={index}>
                                                            {`#${tag}   `}
                                                        </span>
                                                    ))
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={`/notes/${notepad.id}`}>
                                        Ver anotações
                                    </Link>
                                    <Link to={`/notepads/${notepad.id}`}>- Editar</Link>
                                    <Link to={'/'} onClick={() => deleteDocument(notepad.id)}>
                                        <Trash size={24} color={'red'} />
                                    </Link>
                                </div>
                            ))
                        }
                        {notepads && notepads.length === 0 && (
                            <span>Você ainda não criou nenhum bloco de notas...</span>
                        )}
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Dashboard