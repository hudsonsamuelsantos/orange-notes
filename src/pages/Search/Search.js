import styles from './Search.module.css'

import { useQuery } from "../../hooks/useQuery"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import { useNavigate, Link } from 'react-router-dom'

import { useDeleteDocument } from '../../hooks/useDeleteDocument'

function Search() {

    const query = useQuery()
    const search = query.get('q')

    const { documents: notepads } = useFetchDocuments('notepads', search)

    const { deleteDocument } = useDeleteDocument('notepads')

    return (
        <div>
            <Link to={'/dashboard'}>- Voltar</Link>
            <h1>Resultados</h1>
            <p>Voce buscou por: #{search}</p>
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
                            <Link to={`/notes/${notepad.id}`}>- Ver anotações</Link>
                            <Link to={'/'} onClick={() => deleteDocument(notepad.id)}>- Excluir bloco</Link>
                        </div>
                    ))
                }
                {notepads && notepads.length === 0 && (
                    <span>Não encontramos nenhum bloco de notas com essa tag...</span>
                )}
            </div>
        </div>
    )
}

export default Search 