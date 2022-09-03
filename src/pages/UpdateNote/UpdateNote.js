import styles from './UpdateNote.module.css'

import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"

import { Link } from "react-router-dom"

import { ArrowCircleLeft } from 'phosphor-react'

const UpdateNote = () => {

    const { id, index } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

    const [notes, setNotes] = useState('Carregando...')
    const [initialNote, setInitialNote] = useState()

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { updateDocument, response } = useUpdateDocument('notepads')

    const handleSubmit = (e) => {

        e.preventDefault()

        const array = initialNote
        const noteString = notes.toString()
        array.splice(index, 1, noteString)

        const data = {
            notes: array,
            uid: user.uid,
            createdBy: user.email
        }

        updateDocument(id, data)

        navigate(`/notes/${id}`)

    }

    useEffect(() => {
        if (notepad && notepad !== undefined) {
            setInitialNote(notepad.notes)
        } else if (notepad === undefined) {
            setInitialNote([])
        }
    }, [notepad])

    useEffect(() => {
        if (notepad) {
            setNotes(notepad.notes[index])
        }
    }, [notepad])

    return (
        <div className={styles.update_note}>
            <div className={styles.back_to_note_box}>
                <Link to={`/notes/${id}`} className={styles.back_to_note}>
                    <ArrowCircleLeft size={32} />
                    <span>Voltar</span>
                </Link>
            </div>
            <h1>Editar Anotação</h1>
            <div className={styles.update_note_display}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Anotação:</span>
                        <textarea
                            name='notes'
                            required
                            placeholder='Insira sua anotação'
                            onChange={(e) => setNotes([e.target.value])}
                            value={notes}
                            id="text"
                            cols="30"
                            rows="6">
                        </textarea>
                    </label>
                    {!response.loading && <button className={styles.btn}>Salvar</button>}
                    {response.loading && (
                        <button className={styles.btn} disabled>
                            Aguarde.. .
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateNote