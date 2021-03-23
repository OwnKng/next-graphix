import { createContext, useState } from 'react'
import { gapMinder } from '../data/GapMinder'

export const SelectionContext = createContext()

export default function SelectionProvider({ children }) {
  const [selections, setSelection] = useState({
    data: gapMinder,
    x: 'gdpPerCap',
    y: 'lifeExpectancy',
    color: 'region',
    geometry: 'point',
    reordered: false,
    label: 'country',
    theme: 'dark',
    title: 'Chart title',
    subtitle: 'Subtitle',
    palette: 'default',
    interaction: 'none',
    public: true,
    styles: {
      xAxis: {
        textDirection: 'horizontal',
      },
    },
  })

  const updateSelections = (value) => {
    const key = Object.keys(value).toString()
    let newSelections

    if (key === 'data') {
      newSelections = {
        ...value,
        theme: selections.theme,
        palette: selections.palette,
        title: selections.title,
        subtitle: selections.subtitle,
        styles: selections.styles,
        public: true,
      }
    } else if (key === 'geometry') {
      newSelections = {
        ...selections,
        ...value,
        x: false,
        y: false,
        label: false,
        color: 'none',
        title: selections.title,
        subtitle: selections.subtitle,
        styles: selections.styles,
        public: true,
      }
    } else {
      newSelections = { ...selections, ...value }
    }
    setSelection(newSelections)
  }

  return (
    <SelectionContext.Provider value={{
      ...selections, updateSelections, setSelection, selections,
    }}
    >
      {children}
    </SelectionContext.Provider>
  )
}
