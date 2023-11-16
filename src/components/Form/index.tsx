import { useState } from 'react'

import { Filters } from '@/components/Form/Filters'
import { CustomSearchInput } from '@/components/Form/SearchInput'
import { useAppSelector } from '@/hooks/useAppHooks'
import { selectQueryData } from '@/redux/vacanciesSlice'

import s from './styles.module.scss'

export const Form = () => {
  const {
    catalogue = null,
    paymentFrom = '',
    paymentTo = '',
    searchKeyWord = '',
  } = useAppSelector(selectQueryData)

  const [formData, setFormData] = useState({
    paymentFrom,
    paymentTo,
    catalogue,
    searchKeyWord,
  })

  return (
    <div className={s.wrapper}>
      <Filters formData={formData} setFormData={setFormData} />
      <CustomSearchInput formData={formData} setFormData={setFormData} />
    </div>
  )
}
