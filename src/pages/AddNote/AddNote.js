import { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { useAuthValue } from "../../context/AuthContext"

import { useFetchDocument } from "../../hooks/useFetchDocuments"

const AddNote = () => {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('')
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const navigate = useNavigate();

    //const { insertDocument, response } = useInsertDocument('notepads');

    const handleSubmit = (e) => {

        e.preventDefault()

        setFormError('')

        insertDocument({
            notes,
            uid: user.uid,
            createdBy: user.displayName,
        });

        navigate('/dashboard');
    };

    return (
        <div>
            <h2>Adicionar anotação</h2>
            <p>Adicione uma anotação ao seu bloco de notas!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Anotação:</span>
                    <input
                        type='text'
                        name='notes'
                        required
                        placeholder='Insira sua anotação'
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
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