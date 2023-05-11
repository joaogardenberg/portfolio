import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom'
import Base from './Base'
import Home from './home/Home'

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Base />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  )
}
