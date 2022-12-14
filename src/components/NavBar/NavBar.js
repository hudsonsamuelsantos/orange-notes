import styles from './NavBar.module.css'

import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../../hooks/useAuthentication'

import { useAuthValue } from '../../context/AuthContext'
import { Note } from 'phosphor-react'

export function NavBar() {

    const { user } = useAuthValue()
    const { logout } = useAuthentication()


    return (
        <nav className={styles.nav_bar}>
            <NavLink to='/' className={styles.brand}>
                <Note size={32} color={'orange'} />
                <span>Orange</span>Notes
            </NavLink>

            {user &&
                <>
                    <ul className={styles.links_list}>
                        <li>
                            <NavLink to='/dashboard' className={({ isActive }) => (isActive ? styles.active : '')}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to='/my-progress' className={({ isActive }) => (isActive ? styles.active : '')}>Meu Progresso</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} onClick={logout}>Sair</NavLink>
                        </li>
                    </ul>
                </>
            }
        </nav>
    )
}

export default NavBar