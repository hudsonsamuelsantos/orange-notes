import styles from './Register.module.css'

import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

function Register() {

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState('')

    const { createUser, error: authError, loading } = useAuthentication()

    const handleSubmit = async (e) => {

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

        const res = await createUser(user)
        console.log(res)

    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

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
                {!loading && <button className='btn' onClick={handleSubmit}>Cadastrar</button>}
                {loading && <button className='btn' onClick={handleSubmit} disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register