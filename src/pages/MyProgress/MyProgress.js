import { useEffect, useState } from 'react'

import { useAuthValue } from '../../context/AuthContext'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'

function MyProgress() {

    const [notepadsNumber, setNotepadsNumber] = useState('Carregando...')
    const [notesNumber, setNotesNumber] = useState('Carregando...')

    const { user } = useAuthValue()
    const uid = user.uid

    const { documents: notepads, loading } = useFetchDocuments('notepads', null, uid)

    useEffect(() => {

        setNotepadsNumber('Carregando...')
        setNotesNumber('Carregando...')

        if (notepads) {

            var counter = 0

            setNotepadsNumber(notepads.length)

            notepads.map(notepad => {
                counter = counter + notepad.notes.length
            })

            setNotesNumber(counter)
        }

    }, [notepads])

    return (
        <div>
            <h1>Meu Progresso</h1>
            <p>Acompanhe seu progresso em registrar e organizar seu conhecimento!</p>

            <div>
                <span>User: {user && user.displayName}</span>
                <div>Nível 1</div>
                <div>Pontução 0/10</div>
            </div>

            <div>
                <h2>Minhas Estatísticas</h2>
                <span>Blocos de notas criados: {notepadsNumber}</span>
                <span>Anotações criadas: {notesNumber}</span>
            </div>
        </div>
    )
}

export default MyProgress