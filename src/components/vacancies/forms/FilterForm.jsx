import React, { memo, useState } from 'react'
import { Input, Select, NumberInput } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import s from './FilterForm.module.css'
import '../../../styles/defaultStyles.css'
import dropDown from '../../../resources/images/dropDown.png'
import dropDownOnFocus from '../../../resources/images/dropDownOnFocus.png'
import { ms } from '../../../styles/mantineStyles'
import {
    saveQueryData,
    selectQueryData,
    useGetAllCataloguesQuery,
} from '../../../redux/vacanciesSlice'
import { processNoAgreement } from '../../../utilites/processNoAgreement'

export const Form = () => {
    const { catalogue, paymentFrom, paymentTo, searchKeyWord } = useSelector(selectQueryData)

    const [fromNum, setFromNum] = useState(paymentFrom)
    const [toNum, setToNum] = useState(paymentTo)
    const [selectValue, setSelectValue] = useState(catalogue)
    const [searchValue, setSearchValue] = useState(searchKeyWord)

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
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
        </div>
    )
}

const FilterForm = ({ paymentFrom, paymentTo, catalogue, searchKeyWord,
    setFromNum, setToNum, setSelectValue, setSearchValue }) => {
    const dispatch = useDispatch()

    const { data: allCatalogues = [] } = useGetAllCataloguesQuery()

    const [focused, setFocused] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const resetAllOnClick = (e) => {
        const agreed = processNoAgreement('', '')

        setFromNum('')
        setToNum('')
        setSelectValue('')
        setSearchValue('')

        dispatch(saveQueryData({ agreed, count: 4, page: 0, catalogue: '', paymentFrom: '', paymentTo: '', searchKeyWord: '' }))
    }

    const cataloguesResult = allCatalogues.map(optObj => ({ value: optObj.key, label: optObj.title_trimmed }))

    return (
        <form className={s.filterFormField}>
            <div className='titleSBold'>
                Фильтры
            </div>
            <div className={`${s[`filterFormProps${isVisible}`]}`}>
                <div onClick={resetAllOnClick} className={s.resetAllField}>
                    Сбросить все
                </div>
                <Title
                    text='Отрасль'
                    className='factoryLabel'
                />
                <Select
                    value={catalogue}
                    onChange={setSelectValue}
                    maxDropdownHeight={188}
                    data={cataloguesResult}
                    placeholder='Выберите отрасль'
                    radius="md"
                    rightSectionWidth={40}
                    rightSection={focused ?
                        <RightSectionImage
                            src={dropDownOnFocus}
                            alt='dropDownOnFocus'
                        /> :
                        <RightSectionImage
                            src={dropDown}
                            alt='dropDown'
                        />
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
                <Title
                    text='Оклад'
                    className='salaryLabel'
                />
                <CustomNumberInput
                    value={paymentFrom}
                    setNum={setFromNum}
                    placeholder='От'
                />
                <CustomNumberInput
                    value={paymentTo}
                    setNum={setToNum}
                    placeholder='До'
                />
                <SubmitButton
                    catalogue={catalogue}
                    paymentFrom={paymentFrom}
                    paymentTo={paymentTo}
                    searchKeyWord={searchKeyWord}
                    text='Применить'
                    className='submitButton'
                />
            </div>
            <div
                onClick={() => setIsVisible(!isVisible)}
                className={`${s[`filterDropDown${isVisible}`]} ${s.fdd}`}>
            </div>
        </form>
    )
}

const SearchInput = ({ catalogue, paymentFrom, paymentTo, searchValue, setSearchValue }) => {
    return (
        <form className={s.searchField}>
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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
                        searchKeyWord={searchValue}
                        text='Поиск'
                        className='searchButton'
                    />
                }
                styles={{
                    input: ms.textInput.input,
                }}
            />
        </form>
    )
}

const RightSectionImage = memo(({ src, alt }) => {
    return (
        <img
            src={src}
            alt={alt}
            width='24px'
            height='24px'
        />
    )
})

const CustomNumberInput = memo(({ value, placeholder, setNum }) => {
    return (
        <NumberInput
            value={value}
            onChange={(value) => setNum(+value)}
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
})

const SubmitButton = ({ text, className, catalogue, paymentFrom, paymentTo, searchKeyWord }) => {
    const dispatch = useDispatch()

    const onSubmitButtonClick = (e) => {
        e.preventDefault()
        const agreed = processNoAgreement(paymentFrom, paymentTo)
        dispatch(saveQueryData({ agreed, count: 4, page: 0, catalogue, paymentFrom, paymentTo, searchKeyWord }))
    }

    return (
        <button
            className={`${s[className]} ${s.defaultButtonStyles}`}
            onClick={onSubmitButtonClick}
        /* disabled={isFetching} */
        >
            {text}
        </button>
    )
}

const Title = memo(({ text, className }) => {
    return (
        <div className={`${s[className]} textBaseMBold`}>
            {text}
        </div>
    )
})