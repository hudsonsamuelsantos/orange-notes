import { useEffect, useState } from 'react'

import { useAuthValue } from '../../context/AuthContext'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'

function MyProgress() {

    const [notepadsNumber, setNotepadsNumber] = useState('Carregando...')
    const [notesNumber, setNotesNumber] = useState('Carregando...')
    const [points, setPoints] = useState('Carregando...')
    const [mylevel, setMyLevel] = useState('Carregando...')
    const [myNextLevelRequirement, setMyNextLevelRequirement] = useState('Carregando...')

    const { user } = useAuthValue()
    const uid = user.uid

    const { documents: notepads, loading } = useFetchDocuments('notepads', null, uid)

    const checkedLevel = points => {

        let level
        let nextLevelRequirement

        if (points < 10) {
            level = 'Nível 1'
            nextLevelRequirement = '10'
        } else if (points >= 10 && points < 20) {
            level = 'Nível 2'
            nextLevelRequirement = '20'
        } else if (points >= 20 && points < 30) {
            level = 'Nível 3'
            nextLevelRequirement = '30'
        } else if (points >= 30 && points < 40) {
            level = 'Nível 4'
            nextLevelRequirement = '40'
        } else if (points >= 20 && points < 50) {
            level = 'Nível 5'
            nextLevelRequirement = '50'
        } else {
            level = 'Nível Expert (Max)'
            nextLevelRequirement = 'Infinite'
        }

        return { level, nextLevelRequirement }
    }

    useEffect(() => {

        setNotepadsNumber('Carregando...')
        setNotesNumber('Carregando...')
        setPoints('Carregando...')
        setMyLevel('Carregando...')
        setMyNextLevelRequirement('Carregando...')

        if (notepads) {

            let notesCounter = 0
            let notepadCounter = notepads.length

            notepads.map(notepad => {
                notesCounter = notesCounter + notepad.notes.length
            })

            setNotepadsNumber(notepadCounter)
            setNotesNumber(notesCounter)

            let poitsPerNotepads = 3
            let notesPoints = notesCounter
            let notepadPoints = notepadCounter * poitsPerNotepads
            let totalPoints = notesPoints + notepadPoints

            setPoints(totalPoints)

            let currentLevel = checkedLevel(totalPoints).level
            let currentNextLevelRequirement = checkedLevel(totalPoints).nextLevelRequirement

            setMyLevel(currentLevel)
            setMyNextLevelRequirement(currentNextLevelRequirement)

        }

    }, [notepads])

    return (
        <div>
            <h1>Meu Progresso</h1>
            <p>Acompanhe seu progresso em registrar e organizar seu conhecimento!</p>

            <div>
                <span>User: {user && user.displayName}</span>
                <div>{mylevel}</div>
                <div>Pontuação: {points}/{myNextLevelRequirement}</div>
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