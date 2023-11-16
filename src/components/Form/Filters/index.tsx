import { useState } from 'react'

import { Title } from '@/components/Form/Filters/Title'
import { CustomNumberInput } from '@/components/Form/NumberInput'
import { CustomSelect } from '@/components/Form/Select'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { useFiltersControl } from '@/hooks/useFiltersControl'

import { IFilters } from './interface'

import '@/styles/defaultStyles.css'
import s from './styles.module.scss'

export const Filters = ({ formData, setFormData }: IFilters) => {
  const { resetAllOnClick, handleSelectChange, handleNumberInputChange } =
    useFiltersControl({
      formData,
      setFormData,
    })

  const [isVisible, setIsVisible] = useState(false)

  return (
    <form className={s.wrapper}>
      <div className='titleSBold'>Фильтры</div>
      <div className={`${s[`filters${isVisible}`]}`}>
        <div onClick={resetAllOnClick} className={s.resetAllField}>
          Сбросить все
        </div>
        <Title text='Отрасль' classNameProp='factoryLabel' />
        <CustomSelect
          handleSelectChange={handleSelectChange}
          value={formData.catalogue}
        />
        <Title text='Оклад' classNameProp='salaryLabel' />
        <CustomNumberInput
          value={formData.paymentFrom}
          handleChange={handleNumberInputChange}
          keyWord='От'
        />
        <CustomNumberInput
          value={formData.paymentTo}
          handleChange={handleNumberInputChange}
          keyWord='До'
        />
        <SubmitButton formData={formData} text='Применить' classNameProp='submitButton' />
      </div>
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={`${s[`filterDropDown${isVisible}`]} ${s.fdd}`}
      />
    </form>
  )
}
