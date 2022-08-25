import { Link } from 'react-router-dom'
import styles from './Notepad.module.css'

function Notepad({ notepad }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{notepad.notepadTitle}</th>
                        <th>
                            <Link to={`/notes/add/${notepad.id}`} className="btn btn-outline">
                                + Adicionar anotação
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {notepad.notes &&
                        notepad.notes.map(note => (
                            <tr key={note}>
                                <td>
                                    {note}
                                </td>
                            </tr>
                        ))
                    }
                    {notepad.notes && notepad.notes.length === 0 && (
                        <>
                            <tr>
                                <td>
                                    Não foram encontradas anotações
                                </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Notepad