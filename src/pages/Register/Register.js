import styles from './Register.module.css'

import { useState } from 'react'

function Register() {

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState('')

    const handleSubmit = (e) => {

        e.preventDefault()

        setError('')

        const user = {
            displayName,
            email,
            password,
            confirmPassword,
        }

        if (password !== confirmPassword) {
            setError('As senhas precisam ser iguais. Tente novamente.')
        }

        console.log(user)

    }

    return (
        <div className={styles.register}>
            <h1>Cadastre-se para começar</h1>
            <p>Crie sua conta e começe a organizar suas anotações</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name='displayName'
                        required
                        placeholder='Insira seu nome de usuário'
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='Insira seu e-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Insira sua senha'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Confirmar senha:</span>
                    <input
                        type='password'
                        name='confirmPassword'
                        required
                        placeholder='Insira novamente sua senha'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className='btn'>Cadastrar</button>
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register