import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/header/Header'
import { VacanciesPage } from './components/vacancies/VacanciesPage'
import { Favourites } from './components/favourites/Favourites'
import { Vacancy } from './components/vacancies/Vacancy'
import PageNotFound from './components/common components/404/PageNotFound'

export const App = () => {
  return (
    <>
      <Header />
      <div className='appWrapper'>
        <Routes>
          <Route path='/' element={<Navigate to='/vacancies' />} />
          <Route path='/vacancies/*' element={<VacanciesPage />} />
          <Route path='/favourites/*' element={<Favourites />} />
          <Route path='/vacancy/:vacancyId' element={<Vacancy />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  )
}
