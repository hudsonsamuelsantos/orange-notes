import styles from './MyProgress.module.css'

import { useEffect, useState } from 'react'

import { useAuthValue } from '../../context/AuthContext'

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { ChartLineUp, Note, Notepad, TrendUp, Trophy, UserCircle } from 'phosphor-react'

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
        <div className={styles.my_progress}>

            <div className={styles.user_stats_display}>
                <div className={styles.user_name_display}>
                    <UserCircle size={32} />
                    {user && user.displayName}
                </div>
                <div className={styles.user_level_display}>
                    <Trophy size={32} />
                    {mylevel}
                </div>
                <div className={styles.user_points_display}>
                    <TrendUp size={32} />
                    <span>Pontuação: {points}/{myNextLevelRequirement}</span>
                </div>
            </div>

            <h1>Meu Progresso</h1>
            <p>Veja de forma quantificada o seu progresso em registrar e organizar seu conhecimento!</p>

            <div className={styles.stats_table}>
                <div className={styles.stats_table_header}>
                    <ChartLineUp size={32} color={'black'} />
                    <span>Minhas Estatísticas</span>
                </div>
                <div className={styles.stats_table_body}>
                    <div className={styles.stat}>
                        <Notepad size={24} color={'black'} />
                        <span>Blocos de notas criados: {notepadsNumber}</span>
                    </div>
                    <div className={styles.stat}>
                        <Note size={24} color={'black'} />
                        <span>Anotações criadas: {notesNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProgress