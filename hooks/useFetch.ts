// hooks/useFetch.ts
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function useFetch<T>(fn: () => Promise<T>, deps: any[] = []) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        let isMounted = true

        async function load() {
            setLoading(true)
            try {
                const result = await fn()
                if (isMounted) setData(result)
            } catch (err: any) {
                if (isMounted) {
                    setError(err)
                    toast.error(err.message || "Fehler beim Abrufen")
                }
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        load()
        return () => {
            isMounted = false
        }
    }, deps)

    return { data, loading, error }
}
