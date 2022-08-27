import styles from './Dashboard.module.css'

import { useState } from 'react'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

import { useAuthValue } from '../../context/AuthContext'

import { useNavigate, Link } from 'react-router-dom'

function Dashboard() {

    const { user } = useAuthValue()
    const uid = user.uid

    const [query, setQuery] = useState('')

    const { documents: notepads, loading } = useFetchDocuments('notepads', null, uid)

    const navigate = useNavigate()

    const { deleteDocument } = useDeleteDocument('notepads')

    const handleSearch = e => {

        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }

    }

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Ou busque por tags...' onChange={e => setQuery(e.target.value)} />
                <button>Pesquisar</button>
            </form>

            <div>
                <div>
                    {loading && <p>Carregando...</p>}
                    <div>
                        <div>
                            <span>- Meus Blocos de Notas</span>
                            <Link to={'/add-notepad'}>+ Novo Bloco</Link>
                        </div>

                        <div>
                            {notepads &&
                                notepads.map(notepad => (
                                    <div key={notepad.id}>
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
                                        <Link to={'/'}>- Ver anotações</Link>
                                        <Link to={'/'} onClick={() => deleteDocument(notepad.id)}>- Excluir</Link>
                                    </div>
                                ))
                            }
                            {notepads && notepads.length === 0 && (
                                <tr>
                                    <td>Você ainda não criou nenhum Bloco de Notas...</td>
                                </tr>
                            )}
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}

export default Dashboard