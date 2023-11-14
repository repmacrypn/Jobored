import Preloader from '@/components/common components/preloader/Preloader'
import { Form } from '@/components/vacancies/forms/FilterForm'
import { ContentField } from '@/components/vacancies/VacanciesPage'
import { useAppSelector } from '@/hooks/useAppHooks'
import { selectIsAuth } from '@/redux/authSlice'

import '@/styles/defaultStyles.css'
import s from './styles.module.scss'

export const Vacancies = () => {
  const isAuth = useAppSelector(selectIsAuth)

  if (!isAuth) return <Preloader isFS={false} />

  return (
    <div className={`_mainContentField ${s.vacanciesWrapperField}`}>
      <Form />
      <ContentField />
    </div>
  )
}
