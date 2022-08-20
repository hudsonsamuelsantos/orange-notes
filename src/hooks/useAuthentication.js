import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'
import { useState } from 'react'

export const useAuthentication = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return
        }
    }

} 