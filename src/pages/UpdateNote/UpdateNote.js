import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"

import { Link } from "react-router-dom"

const UpdateNote = () => {

    const { id, index } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

    const [notes, setNotes] = useState('Carregando...')
    const [initialNote, setInitialNote] = useState()
    const [formError, setFormError] = useState("")

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { updateDocument, response } = useUpdateDocument('notepads')

    const handleSubmit = (e) => {

        e.preventDefault()

        setFormError('')

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
        <div>
            <Link to={`/notes/${id}`}>- Voltar</Link>
            <h1>Editar anotação</h1>
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
                {!response.loading && <button className="btn">Salvar</button>}
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

export default UpdateNote