import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Loader } from '@/components/Loader'
import { routes } from '@/constants/routes'

export const Pages = () => {
  return (
    <Suspense fallback={<Loader isFS />}>
      <Routes>
        {routes.map(({ path, element }) => {
          return <Route key={path} path={path} element={element} />
        })}
      </Routes>
    </Suspense>
  )
}
