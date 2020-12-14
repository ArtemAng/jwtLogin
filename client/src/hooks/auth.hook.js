import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
    const [token, setTocken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwt, id) => {
        setTocken(jwt);
        setUserId(id);
        localStorage.setItem('userData', JSON.stringify({ userId, token }))
    }, [])

    const logout = useCallback(() => {
        setTocken(null);
        setUserId(null);
        localStorage('userData', JSON.stringify({ userId: null, token: null }))
    })

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userData'))

        if (data && data.token) {
            login(data.token, data.userId);
        }
    }, login)

    return {login, logout, token, userId}
}