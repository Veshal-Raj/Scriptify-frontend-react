import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const useDebounce = (value: string, delay: number, searchTerm, setSuggestions) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    const searchCache = useSelector((store) => store.search)

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchCache[searchTerm]) {
                setSuggestions(searchCache[searchTerm])
            } else {

                setDebouncedValue(value)
            }
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce