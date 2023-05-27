import React, { useState } from "react";
import s from './FilterForm.module.css';
import '../../../styles/defaultStyles.css';
import dropDown from '../../../resources/images/dropDown.png';
import dropDownOnFocus from '../../../resources/images/dropDownOnFocus.png';
import { Input, Select, NumberInput } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { ms } from '../../../styles/mantineStyles';

const FilterForm = React.memo(({ count, getVacancies, setCurrentPage,
    setPaginatorPortionNum, allCatalogues, paymentFrom,
    paymentTo, keyWord, catalogue }) => {

    const [fromNum, setFromNum] = useState(paymentFrom);
    const [toNum, setToNum] = useState(paymentTo);
    const [selectValue, setSelectValue] = useState(catalogue);
    const [searchValue, setSearchValue] = useState(keyWord);
    const [focused, setFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const callDefaultSubmitAction = (e) => {
        e.preventDefault();
        setPaginatorPortionNum(1);
        setCurrentPage(0);
    };

    const onSubmitButtonClick = (e) => {
        callDefaultSubmitAction(e);
        getVacancies(count, 0, selectValue, fromNum, toNum, searchValue);
    };

    const resetAllOnClick = (e) => {
        callDefaultSubmitAction(e);
        setFromNum('');
        setToNum('');
        setSelectValue('');
        setSearchValue('');
        getVacancies(count, 0);
    };

    return (
        <div className={s.filterField}>
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
                        data-elem='industry-select'
                        value={selectValue}
                        onChange={setSelectValue}
                        maxDropdownHeight={188}
                        data={allCatalogues.map(optObj => ({ value: optObj.key, label: optObj.title_trimmed }))}
                        placeholder="Выберите отрасль"
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
                        dataElem='salary-from-input'
                        value={fromNum}
                        setNum={setFromNum}
                        placeholder="От"
                    />
                    <CustomNumberInput
                        dataElem='salary-to-input'
                        value={toNum}
                        setNum={setToNum}
                        placeholder="До"
                    />
                    <SubmitButton
                        onSubmitButtonClick={onSubmitButtonClick}
                        text='Применить'
                        className='submitButton'
                    />
                </div>
                <div
                    onClick={() => setIsVisible(!isVisible)}
                    className={`${s[`filterDropDown${isVisible}`]} ${s.fdd}`}>
                </div>
            </form>
            <form className={s.searchField}>
                <Input
                    data-elem='search-input'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    icon={<Search size={16} />}
                    iconWidth={30}
                    placeholder="Введите название вакансии"
                    radius="md"
                    rightSectionWidth={107}
                    rightSection={
                        <SubmitButton
                            onSubmitButtonClick={onSubmitButtonClick}
                            text='Поиск'
                            className='searchButton'
                        />
                    }
                    styles={{
                        input: ms.textInput.input,
                    }}
                />
            </form>
        </div>
    );
});

const RightSectionImage = ({ src, alt }) => {
    return <img
        src={src}
        alt={alt}
        width='24px'
        height='24px'
    />;
};

const CustomNumberInput = ({ value, placeholder, setNum, dataElem }) => {
    return <NumberInput
        data-elem={dataElem}
        value={value}
        onChange={(value) => setNum(+value)}
        placeholder={placeholder}
        radius="md"
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
};

const SubmitButton = ({ text, className, onSubmitButtonClick }) => {
    return <button
        data-elem='search-button'
        className={`${s[className]} ${s.defaultButtonStyles}`}
        onClick={onSubmitButtonClick}>
        {text}
    </button>
};

const Title = ({ text, className }) => {
    return <div className={`${s[className]} textBaseMBold`}>
        {text}
    </div>
}

export default FilterForm;