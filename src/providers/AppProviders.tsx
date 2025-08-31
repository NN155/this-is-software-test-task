import { QueryProvider } from './QueryProvider'
import { MUIThemeProvider } from './ThemeProvider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <MUIThemeProvider>
        {children}
      </MUIThemeProvider>
    </QueryProvider>
  )
}