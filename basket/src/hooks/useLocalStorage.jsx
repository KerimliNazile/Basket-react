import React, { useEffect, useState } from 'react'


function useLocalStorage(key) {
    const [localData, setlocalData] = useState(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) :[])

    useEffect(() => {
        localStorage.setItem("basket",JSON.stringify(localData))
    }, [localData])
    
    function handleLocalStorage(data) {
        setlocalData(data)
    }

return [localData,handleLocalStorage]
}
export default useLocalStorage