import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'tabler-icons-react'
import s from './FilterPage.module.css'
import { getFavourites } from '../../../redux/favSlice'

export const Pagination = ({ pageCount, pageNumber, handlePageChange }) => {
    return (
        <ReactPaginate
            previousLabel={
                <ChevronLeft
                    className={s.icon}
                    viewBox="0 0 24 24"
                    height={14}
                    width={20}
                />
            }
            nextLabel={
                <ChevronRight
                    className={s.icon}
                    viewBox="-2 0 24 24"
                    height={14}
                    width={20}
                />
            }
            breakLabel={null}
            pageCount={pageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={4}
            onPageChange={handlePageChange}
            forcePage={pageNumber}
            containerClassName={s.pagination}
            breakClassName={s.navLi}
            previousClassName={s.navLi}
            nextClassName={s.navLi}
            pageClassName={s.navLi}
            activeLinkClassName={s.active}
            breakLinkClassName={s.navA}
            pageLinkClassName={s.navA}
            previousLinkClassName={`${s.navA} ${s.moveButton}`}
            nextLinkClassName={`${s.navA} ${s.moveButton}`}
        />
    )
}

export const FavPagination = ({ favourites, totalCount }) => {
    const dispatch = useDispatch()

    const [pageNumber, setPageNumber] = useState(0)
    const itemsPerPage = 4
    const pageCount = Math.ceil(totalCount / itemsPerPage)

    const handlePageChange = (e) => {
        dispatch(getFavourites(JSON.parse(JSON.stringify(favourites))
            .slice(e.selected * itemsPerPage, e.selected * itemsPerPage + 4)))

        setPageNumber(e.selected)
    }

    return (
        <Pagination
            pageCount={pageCount}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
        />
    )
}

export const VacPagination = ({ totalCount, getVacancies }) => {
    const filterFata = useSelector(state => state.vacancies.filterData)

    const [pageNumber, setPageNumber] = useState(0)
    const itemsPerPage = 4
    const pageCount = Math.ceil(totalCount / itemsPerPage)

    const handlePageChange = (e) => {
        getVacancies(itemsPerPage, e.selected, filterFata.catalogue,
            filterFata.paymentFrom, filterFata.paymentTo, filterFata.keyWord)

        setPageNumber(e.selected)
    }

    return (
        <Pagination
            pageCount={pageCount}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
        />
    )
}