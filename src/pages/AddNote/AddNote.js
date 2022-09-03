import styles from './AddNote.module.css'

import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"

import { Link } from "react-router-dom"

import { ArrowCircleLeft } from 'phosphor-react'

import { toast } from 'react-toastify'

const AddNote = () => {

    const { id } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

    const [notes, setNotes] = useState([''])
    const [initialNote, setInitialNote] = useState()

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { updateDocument, response } = useUpdateDocument('notepads')

    const handleSubmit = (e) => {

        e.preventDefault()

        const notesArrayClean = notes[0].trim()

        if (!notesArrayClean) {
            toast.error('Por favor preencha o campo de anotação.')
            return
        }

        const notesArray = initialNote.concat(notes)

        const data = {
            notes: notesArray,
            uid: user.uid,
            createdBy: user.email
        }

        updateDocument(id, data)

        navigate(`/notes/${id}`)

        toast.success('Anotação criada com sucesso!')

    }

    useEffect(() => {
        if (notepad && notepad !== undefined) {
            setInitialNote(notepad.notes)
        } else if (notepad === undefined) {
            setInitialNote([])
        }
    }, [notepad])

    return (
        <div className={styles.add_note}>
            <div className={styles.back_to_note_box}>
                <Link to={`/notes/${id}`} className={styles.back_to_note}>
                    <ArrowCircleLeft size={32} />
                    <span>Voltar</span>
                </Link>
            </div>
            <h1>Adicionar Anotação</h1>
            <p>Adicione uma anotação ao seu bloco de notas!</p>
            <div className={styles.add_note_display}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Anotação:</span>
                        <textarea
                            name='notes'
                            required
                            placeholder='Insira sua anotação'
                            onChange={(e) => setNotes([e.target.value])}
                            value={notes}
                            cols="30"
                            rows="6">
                        </textarea>
                    </label>
                    {!response.loading && <button onClick={handleSubmit} className={styles.btn}>Criar anotação!</button>}
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

export default AddNote