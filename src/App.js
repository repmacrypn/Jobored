import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import VacanciesContainer from './components/vacancies/VacanciesContainer';
import FavouritesContainer from './components/favourites/FavouritesContainer';
import VacancyContainer from './components/vacancies/Vacancy';
import PageNotFound from './components/common components/404/PageNotFound';

function App() {
  return (
    <>
      <HeaderContainer />
      <div className='appWrapper'>
        <Routes>
          <Route path='/' element={<Navigate to='/vacancies' />} />
          <Route path='/vacancies/*' element={<VacanciesContainer />} />
          <Route path='/favourites/*' element={<FavouritesContainer />} />
          <Route path='/vacancy/:vacancyId' element={<VacancyContainer />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
