import styles from './Notepad.module.css'

import { useState } from 'react'

import { Link } from 'react-router-dom'

import { useDeleteDocument } from '../../hooks/useDeleteDocument'

function Notepad({ notepad }) {

    const { deleteDocument } = useDeleteDocument('notepads')

    const notepadId = notepad.id

    return (
        <div className={styles.block_table}>
            <table>
                <thead>
                    <tr>
                        <th>{notepad.notepadTitle}</th>
                        <th>
                            <Link to={`/notes/add/${notepad.id}`} className="btn btn-outline">
                                + Adicionar anotação
                            </Link>
                        </th>
                        <th>
                            <button onClick={() => deleteDocument(notepadId)}>Excluir Bloco</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {notepad.notes &&
                        notepad.notes.map((note, index) => (
                            <tr key={Math.floor(Math.random() * 999999)}>
                                <td>
                                    {note}
                                </td>
                                <td>
                                    <Link to={`/notes/delete/${notepad.id}/${index}`}>Excluir</Link>
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
                <tfoot>
                    <tr>
                        <th>Tags:</th>
                        <td>
                            {notepad.tagsArray &&
                                notepad.tagsArray.map((tag, index) => (
                                    <span key={index}>
                                        {`#${tag}   `}
                                    </span>
                                ))
                            }
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Notepad