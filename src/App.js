import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/header/HeaderContainer';
import VacanciesContainer from './components/vacancies/VacanciesContainer';
import FavouritesContainer from './components/favourites/FavouritesContainer';
import VacancyContainer from './components/vacancies/Vacancy';
import EmptyState from './components/common components/emptyState/EmptyState';

function App() {
  return (
    <div>
      <HeaderContainer />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Navigate to='/vacancies' />} />
          <Route path='/vacancies/*' element={<VacanciesContainer />} />
          <Route path='/favourites/*' element={<FavouritesContainer />} />
          <Route path='/vacancy/:vacancyId' element={<VacancyContainer />} />
          <Route path='*' element={<div className='demoMessageAlert'>404 NOT FOUND</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
