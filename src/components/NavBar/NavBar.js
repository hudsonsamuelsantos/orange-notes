import styles from './NavBar.module.css'

import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../../hooks/useAuthentication'

import { useAuthValue } from '../../context/AuthContext'

export function NavBar() {

    const { user } = useAuthValue()
    const { logout } = useAuthentication()

    return (
        <nav className={styles.nav_bar}>
            <NavLink to='/' className={styles.brand}>
                <span>Orange</span>Notes
            </NavLink>

            {user &&
                <>
                    <ul className={styles.links_list}>
                        <li>
                            <NavLink to='/dashboard' className={({ isActive }) => (isActive ? styles.active : '')}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} onClick={logout}>Sair</NavLink>
                        </li>
                        <li>
                            <div>Logado como:
                                <span>{' ' + user.displayName}</span>
                            </div>
                        </li>
                    </ul>
                </>
            }

            {!user &&
                <NavLink to='/register' className={({ isActive }) => (isActive ? styles.active : '')}>Registre-se</NavLink>
            }

        </nav>
    )
}

export default NavBar