import styles from './NavBar.module.css'

import { NavLink } from 'react-router-dom'

export function NavBar() {
    return (
        <nav>
            <NavLink to='/'>
                <span>Orange</span> Notes
            </NavLink>
        </nav>
    )
}

export default NavBar