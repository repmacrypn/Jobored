import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router'

import { PATH } from '@/constants/paths'

const Vacancies = lazy(() =>
  import('@/pages/Vacancies').then(({ Vacancies }) => ({ default: Vacancies })),
)
const Favourites = lazy(() =>
  import('@/pages/Favourites').then(({ Favourites }) => ({ default: Favourites })),
)

const Vacancy = lazy(() =>
  import('@/pages/Vacancy').then(({ Vacancy }) => ({ default: Vacancy })),
)

const PageNotFound = lazy(() =>
  import('@/pages/PageNotFound').then(({ PageNotFound }) => ({ default: PageNotFound })),
)

export const routes: RouteObject[] = [
  { path: '/', element: <Navigate to={PATH.VACANCIES} /> },
  { path: PATH.VACANCIES, element: <Vacancies /> },
  { path: PATH.FAVOURITES, element: <Favourites /> },
  { path: PATH.VACANCY, element: <Vacancy /> },
  { path: '*', element: <PageNotFound /> },
]
