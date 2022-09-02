import styles from './Register.module.css'

import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

import { ArrowCircleLeft } from 'phosphor-react'

import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

function Register() {

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { createUser, error: authError, loading } = useAuthentication()

    const handleSubmit = async (e) => {

        e.preventDefault()

        const user = {
            displayName,
            email,
            password,
            confirmPassword,
        }

        if (!displayName || !email || !password || !confirmPassword) {
            toast.error('Por favor preencha todos os campos.')
        }

        if (password !== confirmPassword) {
            toast.error('As senhas precisam ser iguais.')
        }

        const res = await createUser(user)
        console.log(res)

    }

    useEffect(() => {
        if (authError) {
            toast.error(authError)
        }
    }, [authError])

    return (
        <div className={styles.register}>
            <div className={styles.back_to_login_box}>
                <Link to={`/dashboard`} className={styles.back_to_login}>
                    <ArrowCircleLeft size={32} />
                    <span>Voltar</span>
                </Link>
            </div>
            <h1>Crie sua conta</h1>
            <p>Comece agora a progredir em organizar seu conhecimento!</p>
            <div className={styles.register_display}>
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
                    {!loading && <button className={styles.btn} onClick={handleSubmit}>Cadastrar</button>}
                    {loading && <button className={styles.btn} onClick={handleSubmit} disabled>Aguarde...</button>}
                </form>
            </div>
        </div>
    )
}

export default Register