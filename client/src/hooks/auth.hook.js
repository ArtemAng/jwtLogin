// import { useState, useCallback, useEffect } from 'react'

// export const useAuth = () => {
//     const [toсken, setToсken] = useState(null);
//     const [userId, setUserId] = useState(null);
//     // const [datass, setDatas] = useState({t: null, i:null})
//     const login = useCallback((jwt, id) => {
//         console.log('login');
//         setUserId(id);
//         setToсken(jwt);
//         localStorage.setItem('userData', JSON.stringify({ userId: id, token: jwt }))
//     })

//     const logout = useCallback(() => {
//         console.log('logout');
//         setToсken(null);
//         setUserId(null);
//         localStorage.setItem('userData', JSON.stringify({ userId: null, token: null }))
//     },[])
//     localStorage.setItem('userData', JSON.stringify({logout}))
//     useEffect(()=>{
//         const data = JSON.parse(localStorage.getItem('userData'))

//         if (data && data.token) {
//             login(data.token, data.userId);
//         }
//     }, [login])

//     return {login: login, logout: logout, token: toсken, userId: userId}
// }