import styles from './Notepad.module.css'

function Notepad({ notepad }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{notepad.notepadTitle}</th>
                    </tr>
                </thead>
                <tbody>
                    {notepad.notes &&
                        notepad.notes.map(note => (
                            <tr key={note}>
                                {note}
                            </tr>
                        ))
                    }
                    {notepad.notes && notepad.notes.length === 0 && (
                        <>
                            <p>Não foram encontradas anotações</p>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Notepad