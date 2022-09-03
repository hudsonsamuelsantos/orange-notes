import styles from './DeleteNote.module.css'

import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import { toast } from 'react-toastify'

const DeleteNote = () => {

    const { id, index } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

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

        updateDocument(id, data)

        navigate(`/notes/${id}`)

        toast.success('Anotação excluída com sucesso')

    }

    const cancel = () => navigate(`/notes/${id}`)
    return (
        <div className={styles.confirm}>
            <h2>Tem certeza que deseja excluir essa anotação?</h2>
            <div className={styles.btns}>
                <button className={styles.btn} onClick={deleteNote}>Sim</button>
                <button className={styles.btn} onClick={cancel}>Não</button>
            </div>
        </div>
    );
};

export default DeleteNote