import { useContext } from 'react'
import { SelectionContext } from './SelectionProvider'

export const useSelections = () => useContext(SelectionContext)
