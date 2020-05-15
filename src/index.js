import { useEffect, useRef } from 'react'

export default function useDelayedFunction(originalFunction, delay = 0) {
  const timeoutRef = useRef()
  function delayedFunction() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      originalFunction && originalFunction(...arguments)
      timeoutRef.current = null
    }, delay)
  }

  const cancelIt = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = null
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return [delayedFunction, cancelIt]
}
