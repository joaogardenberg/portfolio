import { ReactNode } from 'react'
import RouterProvider from './Router'

interface ProvidersProps {
  children?: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <RouterProvider>{children}</RouterProvider>
}
