import styles from './Register.module.css'

function Register() {
    return (
        <div className={styles.register}>
            <h1>Cadastre-se para começar</h1>
            <p>Crie sua conta e começe a organizar suas anotações</p>
            <form>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name='displayName'
                        required
                        placeholder='Insira seu nome de usuário'
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='Insira seu e-mail'
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Insira sua senha'
                    />
                </label>
                <label>
                    <span>Confirmar senha:</span>
                    <input
                        type='password'
                        name='confirmPassword'
                        required
                        placeholder='Insira novamente sua senha'
                    />
                </label>
                <button className='btn'>Cadastrar</button>
            </form>
        </div>
    )
}

export default Register