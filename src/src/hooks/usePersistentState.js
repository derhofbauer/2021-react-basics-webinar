import { useState, useEffect } from 'react'

export default function usePersistentState (key, initialState) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  )

  const length = (state.length) || 0

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state, length])

  return [state, setState]
}
