import styles from './Search.module.css'

import { useQuery } from "../../hooks/useQuery"

function Search() {

    const query = useQuery()
    const search = query.get('q')

    return (
        <div>
            <p>{search}</p>
        </div>
    )
}

export default Search 