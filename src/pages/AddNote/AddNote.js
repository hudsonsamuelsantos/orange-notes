import styles from './AddNote.module.css'

import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"

import { Link } from "react-router-dom"

const AddNote = () => {

    const { id } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

    const [notes, setNotes] = useState('')
    const [initialNote, setInitialNote] = useState()
    const [formError, setFormError] = useState("")

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { updateDocument, response } = useUpdateDocument('notepads')

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

        navigate(`/notes/${id}`)

    }

    useEffect(() => {
        if (notepad && notepad !== undefined) {
            setInitialNote(notepad.notes)
        } else if (notepad === undefined) {
            setInitialNote([])
        }
    }, [notepad])

    return (
        <div>
            <Link to={`/notes/${id}`}>- Voltar</Link>
            <h1>Adicionar anotação</h1>
            <p>Adicione uma anotação ao seu bloco de notas!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Anotação:</span>
                    <input
                        type='text'
                        name='notes'
                        required
                        placeholder='Insira sua anotação'
                        onChange={(e) => setNotes([e.target.value])}
                        value={notes}
                    />
                </label>
                {!response.loading && <button className="btn">Criar anotação!</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde.. .
                    </button>
                )}
                {(response.error || formError) && (
                    <p className="error">{response.error || formError}</p>
                )}
            </form>
        </div>
    );
};

export default AddNote