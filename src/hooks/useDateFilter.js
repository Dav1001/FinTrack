import { useState, useMemo } from 'react'
import { isWithinInterval, parseISO } from 'date-fns'

export function useDateFilter(items) {
  const [range, setRange] = useState({ from: null, to: null })

  const filtered = useMemo(() => {
    if (!range.from || !range.to) return items
    return items.filter(item => {
      const date = parseISO(item.date)
      return isWithinInterval(date, { start: range.from, end: range.to })
    })
  }, [items, range])

  return { filtered, range, setRange }
}
