import React, { memo, SetStateAction, useState } from 'react'
import { NumberInput, Select, TextInput } from '@mantine/core'
import { Search } from 'tabler-icons-react'

import { useAppDispatch, useAppSelector } from '@/hooks/useAppHooks'
import {
  IAllCataloguesResponseData,
  saveQueryData,
  selectQueryData,
  useGetAllCataloguesQuery,
} from '@/redux/vacanciesSlice'
import dropDown from '@/resources/images/dropDown.png'
import dropDownOnFocus from '@/resources/images/dropDownOnFocus.png'
import { ms } from '@/styles/mantineStyles'
import { processNoAgreement } from '@/utilites/processNoAgreement'

import '@/styles/defaultStyles.css'
import s from './FilterForm.module.css'

interface IInputDataProps {
  paymentFrom: number | ''
  paymentTo: number | ''
  catalogue: string | null
  searchKeyWord: string
}

interface ITextClassName {
  text: string
  classNameProp: string
}

export const Form = () => {
  const {
    catalogue = null,
    paymentFrom = '',
    paymentTo = '',
    searchKeyWord,
  } = useAppSelector(selectQueryData)

  const [fromNum, setFromNum] = useState<number | ''>(paymentFrom)
  const [toNum, setToNum] = useState<number | ''>(paymentTo)
  const [selectValue, setSelectValue] = useState<string | null>(catalogue)
  const [searchValue, setSearchValue] = useState<string>(searchKeyWord)

  return (
    <div className={s.filterField}>
      <FilterForm
        paymentFrom={fromNum}
        paymentTo={toNum}
        catalogue={selectValue}
        searchKeyWord={searchValue}
        setFromNum={setFromNum}
        setToNum={setToNum}
        setSelectValue={setSelectValue}
        setSearchValue={setSearchValue}
      />
      <SearchInput
        paymentFrom={fromNum}
        paymentTo={toNum}
        catalogue={selectValue}
        searchKeyWord={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  )
}

interface IFilterFormProps extends IInputDataProps {
  setFromNum: React.Dispatch<SetStateAction<number | ''>>
  setToNum: React.Dispatch<SetStateAction<number | ''>>
  setSelectValue: React.Dispatch<SetStateAction<string | null>>
  setSearchValue: React.Dispatch<SetStateAction<string>>
}

const FilterForm = ({
  paymentFrom,
  paymentTo,
  catalogue,
  searchKeyWord,
  setFromNum,
  setToNum,
  setSelectValue,
  setSearchValue,
}: IFilterFormProps) => {
  const dispatch = useAppDispatch()

  const { data: allCatalogues = [] } = useGetAllCataloguesQuery(null)

  const [focused, setFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const resetAllOnClick = () => {
    const agreed = processNoAgreement('', '')

    setFromNum('')
    setToNum('')
    setSelectValue('')
    setSearchValue('')
    dispatch(
      saveQueryData({
        agreed,
        count: 4,
        page: 0,
        catalogue: '',
        paymentFrom: '',
        paymentTo: '',
        searchKeyWord: '',
      }),
    )
  }

  const cataloguesResult = allCatalogues.map((optObj: IAllCataloguesResponseData) => ({
    value: String(optObj.key),
    label: optObj.title_trimmed,
  }))

  return (
    <form className={s.filterFormField}>
      <div className='titleSBold'>Фильтры</div>
      <div className={`${s[`filterFormProps${isVisible}`]}`}>
        <div onClick={resetAllOnClick} className={s.resetAllField}>
          Сбросить все
        </div>
        <Title text='Отрасль' classNameProp='factoryLabel' />
        <Select
          value={catalogue}
          onChange={setSelectValue}
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
        <Title text='Оклад' classNameProp='salaryLabel' />
        <CustomNumberInput value={paymentFrom} setNum={setFromNum} placeholder='От' />
        <CustomNumberInput value={paymentTo} setNum={setToNum} placeholder='До' />
        <SubmitButton
          paymentFrom={paymentFrom}
          paymentTo={paymentTo}
          catalogue={catalogue}
          searchKeyWord={searchKeyWord}
          text='Применить'
          classNameProp='submitButton'
        />
      </div>
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={`${s[`filterDropDown${isVisible}`]} ${s.fdd}`}
      />
    </form>
  )
}

interface ISearchInputProps extends IInputDataProps {
  setSearchValue: React.Dispatch<SetStateAction<string>>
}

const SearchInput = ({
  catalogue,
  paymentFrom,
  paymentTo,
  searchKeyWord,
  setSearchValue,
}: ISearchInputProps) => {
  return (
    <form className={s.searchField}>
      <TextInput
        value={searchKeyWord}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        icon={<Search size={16} />}
        iconWidth={30}
        placeholder='Введите название вакансии'
        radius='md'
        rightSectionWidth={107}
        rightSection={
          <SubmitButton
            catalogue={catalogue}
            paymentFrom={paymentFrom}
            paymentTo={paymentTo}
            searchKeyWord={searchKeyWord}
            text='Поиск'
            classNameProp='searchButton'
          />
        }
        styles={{
          input: ms.textInput.input,
        }}
      />
    </form>
  )
}

interface IRightSectionImageProps {
  src: string
  alt: string
}

const RightSectionImage = memo(({ src, alt }: IRightSectionImageProps) => {
  return <img src={src} alt={alt} width='24px' height='24px' />
})

interface ICustomNumberInputProps {
  value: number | ''
  placeholder: string
  setNum: React.Dispatch<SetStateAction<number | ''>>
}

const CustomNumberInput = memo(
  ({ value, placeholder, setNum }: ICustomNumberInputProps) => {
    return (
      <NumberInput
        value={value}
        onChange={(value) => setNum(value)}
        placeholder={placeholder}
        radius='md'
        rightSectionWidth={35}
        step={500}
        min={0}
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        styles={{
          input: ms.numberInput.input,
          control: ms.numberInput.control,
          controlUp: ms.numberInput.controlUp,
          controlDown: ms.numberInput.controlDown,
        }}
      />
    )
  },
)

const SubmitButton = ({
  text,
  classNameProp,
  catalogue,
  paymentFrom,
  paymentTo,
  searchKeyWord,
}: IInputDataProps & ITextClassName) => {
  const dispatch = useAppDispatch()

  const onSubmitButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const agreed = processNoAgreement(paymentFrom, paymentTo)

    dispatch(
      saveQueryData({
        agreed,
        count: 4,
        page: 0,
        catalogue,
        paymentFrom,
        paymentTo,
        searchKeyWord,
      }),
    )
  }

  return (
    <button
      type='button'
      className={`${s[classNameProp]} ${s.defaultButtonStyles}`}
      onClick={onSubmitButtonClick}
    >
      {text}
    </button>
  )
}

const Title = memo(({ text, classNameProp }: ITextClassName) => {
  return <div className={`${s[classNameProp]} textBaseMBold`}>{text}</div>
})
