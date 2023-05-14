import React, { useState } from "react";
import s from './FilterForm.module.css';
import '../../../styles/defaultStyles.css';
import dropDown from '../../../resources/images/dropDown.png';
import dropDownOnFocus from '../../../resources/images/dropDownOnFocus.png';
import { Input, Select, NumberInput } from '@mantine/core';
import { Search } from 'tabler-icons-react';

const FilterForm = ({ count, getVacancies, setCurrentPage,
    setPaymentFrom, setPaymentTo, setCatalogue, setKeyWord,
    setPaginatorPortionNum, allCatalogues }) => {
    const [fromNum, setFromNum] = useState('');
    const [toNum, setToNum] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [focused, setFocused] = useState(false);

    const onSubmitButtonClick = (e) => {
        e.preventDefault();
        setPaginatorPortionNum(1);
        setCurrentPage(0);
        getVacancies(count, 0, selectValue, fromNum, toNum, searchValue);
    };

    const resetAllOnClick = (e) => {
        e.preventDefault();
        setPaginatorPortionNum(1);
        setCurrentPage(0);
        setPaymentFrom('');
        setFromNum('');
        setPaymentTo('');
        setToNum('');
        setCatalogue('');
        setSelectValue('');
        setKeyWord('');
        setSearchValue('');
        getVacancies(count, 0, '', '', '', '');
    };

    return (
        <>
            <form className={s.filterFormField}>
                <div className='titleSBold'>
                    Фильтры
                </div>
                <div onClick={resetAllOnClick} className={`${s.resetAllField}`}>
                    Сбросить все
                </div>
                <div className={`${s.factoryLabel} textBaseMBold`}>
                    Отрасль
                </div>
                <Select
                    value={selectValue}
                    onChange={setSelectValue}
                    maxDropdownHeight={188}
                    data={allCatalogues.map(optObj => ({ value: optObj.key, label: optObj.title_trimmed }))}
                    placeholder="Выберите отрасль"
                    radius="md"
                    rightSectionWidth={40}
                    rightSection={focused ?
                        <img
                            src={dropDownOnFocus}
                            alt='dropDownOnFocus'
                            width='24px'
                            height='24px'
                        /> :
                        <img
                            src={dropDown}
                            alt='dropDown'
                            width='24px'
                            height='24px'
                        />
                    }
                    onDropdownClose={() => setFocused(false)}
                    onDropdownOpen={() => setFocused(true)}
                    styles={{
                        input: {
                            width: 275,
                            height: 42,

                            marginBottom: 20,
                            padding: '8px 12px',

                            borderColor: '#D5D6DC',
                            color: '#232134',
                            font: 'normal 400 14px/20px Inter, sans-serif',
                            '&:hover': {
                                borderColor: '#5E96FC',
                            },
                        },
                        dropdown: {
                            border: 'none',
                            borderRadius: 8,

                            width: 275,
                            height: 188,

                            padding: 4,
                        },
                        item: {
                            width: 267,
                            height: 36,

                            padding: 8,

                            borderRadius: 8,
                            font: 'normal 400 14px/20px Inter, sans-serif',
                            color: '#232134',
                            '&[data-hovered]': {
                                backgroundColor: "#DEECFF",
                                padding: '8px 12px',
                            },
                            '&[data-selected]': {
                                backgroundColor: "#5E96FC",
                                color: "white",
                                padding: '8px 12px',
                                font: 'normal 500 14px/20px Inter, sans-serif',
                            },
                        },
                        rightSection: { pointerEvents: 'none' }
                    }}
                />
                <NumberInput
                    value={fromNum}
                    onChange={(value) => setFromNum(+value)}
                    placeholder="От"
                    radius="md"
                    step={500}
                    min={0}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                />
                <NumberInput
                    value={toNum}
                    onChange={(value) => setToNum(+value)}
                    placeholder="До"
                    radius="md"
                    step={500}
                    min={fromNum}
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                />
                <div>
                    <button onClick={onSubmitButtonClick}>Применить</button>
                </div>
            </form>
            <form className={s.searchField}>
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    icon={<Search />}
                    placeholder="Введите название вакансии"
                    radius="md"
                    rightSection={<button onClick={onSubmitButtonClick}>Поиск</button>}
                />
            </form>
        </>
    );
};

export default FilterForm;