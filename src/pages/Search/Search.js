import styles from './Search.module.css'

import { useAuthValue } from '../../context/AuthContext'

import { useQuery } from "../../hooks/useQuery"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import { useNavigate, Link } from 'react-router-dom'

import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import { ArrowCircleLeft, Eye, Notepad, NotePencil, Trash } from 'phosphor-react'

function Search() {

    const { user } = useAuthValue()
    const uid = user.uid

    const query = useQuery()
    const search = query.get('q')

    const { documents: notepads, loading } = useFetchDocuments('notepads', search, uid)

    const { deleteDocument } = useDeleteDocument('notepads')

    return (
        <div>
            <Link to={`/dashboard`} className={styles.back_to_dashboard}>
                <ArrowCircleLeft size={32} />
                <span>Voltar</span>
            </Link>
            <h1>Resultados</h1>

            <div>
                <p>Voce buscou por: <strong>#{search}</strong></p>
                <div className={styles.dashboard_table}>
                    {loading && <p>Carregando...</p>}
                    <div>
                        <div className={styles.dashboard_table_header}>
                            <div className={styles.dashboard_table_header_title}>
                                <Notepad size={32} />
                                <span>Blocos de Notas Encontrados</span>
                            </div>

                        </div>

                        <div>
                            {notepads &&
                                notepads.map(notepad => (
                                    <div key={notepad.id} className={styles.dashboard_table_notepad}>
                                        <div className={styles.notepad}>
                                            <span className={styles.notepad_title}>{notepad.notepadTitle}</span>
                                            <div className={styles.notepad_tags}>
                                                <span>Tags:</span>
                                                <span>
                                                    {notepad.tagsArray &&
                                                        notepad.tagsArray.map((tag, index) => (
                                                            <span key={index}>
                                                                {`#${tag}      `}
                                                            </span>
                                                        ))
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.actions}>
                                            <Link to={`/notes/${notepad.id}`} className={styles.see}>
                                                <Eye size={24} color={'blueviolet'} />
                                                <span>Ver Anotações</span>
                                            </Link>
                                            <Link to={`/notepads/${notepad.id}`} className={styles.edit}>
                                                <NotePencil size={24} color={'blue'} />
                                                <span>Editar</span>
                                            </Link>
                                            <Link to={`/notepads/delete/${notepad.id}`} className={styles.delete}>
                                                <Trash size={24} color={'red'} />
                                                <span>Excluir</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                            {notepads && notepads.length === 0 && (
                                <div className={styles.message}>
                                    <span>Nenhum bloco de notas foi encontrado...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default Search 