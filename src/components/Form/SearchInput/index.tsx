import React from 'react'
import { TextInput } from '@mantine/core'
import { Search } from 'tabler-icons-react'

import { SubmitButton } from '@/components/Form/SubmitButton'
import { ms } from '@/styles/mantineStyles'

import { ICustomSearchInput } from './interface'

import s from './styles.module.scss'

export const CustomSearchInput = ({ formData, setFormData }: ICustomSearchInput) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, searchKeyWord: e.currentTarget.value })
  }

  return (
    <form className={s.searchField}>
      <TextInput
        value={formData.searchKeyWord}
        onChange={handleInputChange}
        icon={<Search size={16} />}
        iconWidth={30}
        placeholder='Введите название вакансии'
        radius='md'
        rightSectionWidth={107}
        rightSection={
          <SubmitButton formData={formData} text='Поиск' classNameProp='searchButton' />
        }
        styles={{
          input: ms.textInput.input,
        }}
      />
    </form>
  )
}
