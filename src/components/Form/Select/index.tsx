import { useMemo, useState } from 'react'
import { Select } from '@mantine/core'

import { RightSectionImage } from '@/components/Form/Select/RightSectionImage'
import { useGetAllCataloguesQuery } from '@/redux/vacanciesSlice'
import dropDown from '@/resources/images/dropDown.png'
import dropDownOnFocus from '@/resources/images/dropDownOnFocus.png'
import { ms } from '@/styles/mantineStyles'

import { ICustomSelect } from './interface'

export const CustomSelect = ({ handleSelectChange, value }: ICustomSelect) => {
  const [focused, setFocused] = useState(false)

  const { data: allCatalogues = [] } = useGetAllCataloguesQuery(null)

  const cataloguesResult = useMemo(
    () =>
      allCatalogues.map((c) => ({
        value: String(c.key),
        label: c.title_trimmed,
      })),
    [allCatalogues],
  )

  return (
    <Select
      value={value}
      onChange={handleSelectChange}
      maxDropdownHeight={188}
      data={cataloguesResult}
      placeholder='Выберите отрасль'
      radius='md'
      rightSectionWidth={40}
      rightSection={
        focused ? (
          <RightSectionImage src={dropDownOnFocus} alt='dropDownOnFocus' />
        ) : (
          <RightSectionImage src={dropDown} alt='dropDown' />
        )
      }
      onDropdownClose={() => setFocused(false)}
      onDropdownOpen={() => setFocused(true)}
      styles={{
        input: ms.select.input,
        dropdown: ms.select.dropdown,
        item: ms.select.item,
        rightSection: ms.select.rightSection,
      }}
    />
  )
}
