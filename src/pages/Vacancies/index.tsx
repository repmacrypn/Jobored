import { Loader } from '@/components/Loader'
import { VacanciesBlock } from '@/components/Main/VacanciesBlock'
import { Form } from '@/components/vacancies/forms/FilterForm'
import { useAppSelector } from '@/hooks/useAppHooks'
import { selectIsAuth } from '@/redux/authSlice'

import '@/styles/defaultStyles.css'
import s from './styles.module.scss'

export const Vacancies = () => {
  const isAuth = useAppSelector(selectIsAuth)

  if (!isAuth) return <Loader isFS={false} />

  return (
    <div className={`_mainContentField ${s.vacanciesWrapperField}`}>
      <Form />
      <VacanciesBlock />
    </div>
  )
}
