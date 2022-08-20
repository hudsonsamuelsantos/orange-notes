import styles from './NavBar.module.css'

import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../../hooks/useAuthentication'

import { useAuthValue } from '../../context/AuthContext'

export function NavBar() {

    const { user } = useAuthValue()

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
                            <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>Sair</NavLink>
                        </li>
                    </ul>
                    <div>Logado como:
                        <span>{user.displayName}</span>
                    </div>
                </>
            }

        </nav>
    )
}

export default NavBar