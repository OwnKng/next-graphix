import { useSelections } from './useSelections'

export const useActive = (key: string) => {
  const { selections } = useSelections()

  const getActive = (d: any) => d[key]

  return { active: getActive(selections) }
}
