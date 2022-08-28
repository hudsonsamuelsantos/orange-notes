import { useState, useEffect } from "react"

import { Link, useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from "../../hooks/useFetchDocuments"

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
            <Link to={`/dashboard`}>- Voltar</Link>
            <h1>{notepad && notepad.notepadTitle}</h1>

            <div>
                <div>
                    <Link to={`/notes/add/${id}`}>+ Nova Anotação</Link>
                </div>
                {notepad &&
                    notepad.notes.map((note, index) => (
                        <div key={index}>
                            <span>{note}</span>
                            <Link to={`/notes/update/${id}/${index}`}>- Editar</Link>
                            <Link to={`/notes/delete/${id}/${index}`}>- Excluir</Link>
                        </div>
                    ))
                }
                {notepad && notepad.notes.length === 0 &&
                    <span>Você ainda não criou nenhuma anotação...</span>
                }
            </div>
        </div>
    );
};

export default SeeNotepad