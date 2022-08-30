import styles from './SeeNotepad.module.css'

import { useState, useEffect } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { ArrowCircleLeft, Note, NotePencil, PlusCircle, Trash } from 'phosphor-react'

const SeeNotepad = () => {

    const { id } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

    const [notes, setNotes] = useState('')
    const [initialNote, setInitialNote] = useState()
    const [formError, setFormError] = useState("")

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { updateDocument, response } = useUpdateDocument('notepads')

    useEffect(() => {
        if (notepad && notepad !== undefined) {
            setInitialNote(notepad.notes)
        } else if (notepad === undefined) {
            setInitialNote([])
        }
    }, [notepad])

    const handleSubmit = (e) => {

        e.preventDefault()

        setFormError('')

        const notesArray = initialNote.concat(notes)

        const data = {
            notes: notesArray,
            uid: user.uid,
            createdBy: user.email
        }

        updateDocument(id, data)

        navigate('/dashboard')

    }

    return (
        <div>
            <Link to={`/dashboard`} className={styles.back_to_dashboard}>
                <ArrowCircleLeft size={32} />
                <span>Voltar</span>
            </Link>
            <h1>{notepad && notepad.notepadTitle}</h1>

            <div className={styles.notes_table}>
                <div className={styles.notes_table_header}>
                    <div className={styles.notes_table_title}>
                        <Note size={32} color={'black'} />
                        <span>Minhas Anotações</span>
                    </div>
                    <Link to={`/notes/add/${id}`} className={styles.notes_table_add}>
                        <PlusCircle size={24} color={'green'} />
                        <span>Adicionar</span>
                    </Link>
                </div>
                {!notepad &&
                    <span>Carregando...</span>
                }
                {notepad &&
                    notepad.notes.map((note, index) => (
                        <div key={index} className={styles.notes_table_body}>
                            <div className={styles.note}>
                                <span>{note}</span>
                            </div>
                            <div className={styles.actions}>
                                <Link to={`/notes/update/${id}/${index}`} className={styles.edit}>
                                    <NotePencil size={24} color={'blue'} />
                                    <span>Editar</span>
                                </Link>
                                <Link to={`/notes/delete/${id}/${index}`} className={styles.delete}>
                                    <Trash size={24} color={'red'} />
                                    <span>Excluir</span>
                                </Link>
                            </div>
                        </div>
                    ))
                }
                {notepad && notepad.notes.length === 0 &&
                    <span className={styles.message}>
                        Você ainda não criou nenhuma anotação...
                    </span>
                }
            </div>
        </div>
    );
};

export default SeeNotepad