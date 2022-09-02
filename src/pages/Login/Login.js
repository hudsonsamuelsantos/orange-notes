import { ReactComponent as LoginSvg } from '../../assets/LoginSvg.svg'

import styles from './Login.module.css'

import { useEffect, useState } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'
import { Link, useNavigate } from 'react-router-dom'

import { toast, ToastContainer } from 'react-toastify'
import { async } from '@firebase/util'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login, error: authError, loading } = useAuthentication()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        //setError('')

        const user = {
            email,
            password,
        }

        const res = await login(user)
        console.log(res)

    }

    useEffect(() => {
        if (authError) {
            toast.error(authError)
        }
    }, [authError])

    return (
        <div className={styles.login}>
            <h1>Bem vindo ao OrangeNotes!</h1>
            <p>Seu connhecimento registrado e organizado em um só lugar!</p>
            <LoginSvg className={styles.svg} />
            <div className={styles.login_display}>
                <form onSubmit={handleSubmit}>
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

                    <div className={styles.actions}>
                        {!loading && <button className={styles.btn}>Entrar</button>}
                        {loading && <button className={styles.btn} disabled>Aguarde...</button>}
                        {!loading && <button onClick={() => navigate('/register')} className={styles.btn}>Registre-se</button>}
                    </div>
                    {error && <p className='error'>{error}</p>}
                </form>
            </div>

        </div>
    )
}

export default Login