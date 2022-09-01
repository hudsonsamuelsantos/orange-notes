import styles from './DeleteNotepad.module.css'

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const DeleteNotepad = () => {

    const { id } = useParams()
    const { document: notepad } = useFetchDocument('notepads', id)

    const { documents: initialNotepad } = useFetchDocuments('notepads')

    const { deleteDocument } = useDeleteDocument('notepads')

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const cancel = () => navigate(`/dashboard`)

    const deleteNotepad = () => {
        deleteDocument(id)
        navigate('/dashboard')
    }

    return (
        <div className={styles.confirm}>
            <h2>Tem certeza que deseja excluir esse bloco?</h2>
            <div className={styles.btns}>
                <button className={styles.btn} onClick={deleteNotepad}>Sim</button>
                <button className={styles.btn} onClick={cancel}>Não</button>
            </div>
        </div>
    );
};

export default DeleteNotepad