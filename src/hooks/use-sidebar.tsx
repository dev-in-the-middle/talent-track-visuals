import * as React from "react"

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  return {
    isCollapsed,
    toggleSidebar
  }
}