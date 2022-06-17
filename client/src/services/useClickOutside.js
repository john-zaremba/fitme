import { useRef, useEffect } from "react"

export const useClickOutside = (callBack) => {
  const ref = useRef()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        callBack()
      }
    }

    document.addEventListener("click", handleOutsideClick)

    return () => document.removeEventListener("click", handleOutsideClick)
  }, [])

  return ref
}