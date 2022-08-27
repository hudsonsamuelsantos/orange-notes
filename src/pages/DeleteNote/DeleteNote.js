import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"

const DeleteNote = () => {

    const { id, index } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

    const [notes, setNotes] = useState('')
    const [initialNote, setInitialNote] = useState()

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

    const deleteNote = () => {

        const array = initialNote
        array.splice(index, 1)

        const data = {
            notes: array,
            uid: user.uid,
            createdBy: user.email
        }

        console.log(array);

        updateDocument(id, data)

        navigate(`/notes/${id}`)

    }

    console.log(id, index, initialNote);

    const cancel = () => navigate(`/notes/${id}`)
    return (
        <div>
            <h2>Tem certeza que deseja excluir essa anotação?</h2>
            <button onClick={deleteNote}>Sim</button>
            <button onClick={cancel}>Não</button>
        </div>
    );
};

export default DeleteNote