import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

interface RootState {
    search: any
}

const useDebounce = (value: string, delay: number, searchTerm: string, setSuggestions: (suggestions: any []) => void) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    const searchCache = useSelector((store: RootState) => store.search)

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchCache[searchTerm]) {
                console.log(searchCache[searchTerm])
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