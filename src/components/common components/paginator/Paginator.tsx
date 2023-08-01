import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'tabler-icons-react'
import s from './Paginator.module.css'
import { setPageNumber } from '../../../redux/favSlice'
import { saveQueryData } from '../../../redux/vacanciesSlice'
import { useAppDispatch } from '../../../hooks/useAppHooks'
import { IVacanciesQuery } from '../../../types/vacanciesQuery.interface'

interface IPaginationProps {
    pageCount: number;
    pageNumber: number;
    handlePageChange: ({ selected }: { selected: number }) => void;
}

export const Pagination = ({ pageCount, pageNumber, handlePageChange }: IPaginationProps) => {
    return (
        <ReactPaginate
            previousLabel={
                <ChevronLeft
                    className={s.icon}
                    viewBox='0 0 24 24'
                    height={14}
                    width={20}
                />
            }
            nextLabel={
                <ChevronRight
                    className={s.icon}
                    viewBox='-2 0 24 24'
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

interface IFavPaginationProps {
    totalCount: number;
    itemsPerPage: number;
    pageNumber: number;
}

export const FavPagination = ({ totalCount, itemsPerPage, pageNumber }: IFavPaginationProps) => {
    const pageCount = Math.ceil(totalCount / itemsPerPage)
    const dispatch = useAppDispatch()

    const handlePageChange = ({ selected }: { selected: number }) => {
        dispatch(setPageNumber(selected))
    }

    return (
        <Pagination
            pageCount={pageCount}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
        />
    )
}

interface IVacPaginationProps {
    totalCount: number;
    query: IVacanciesQuery;
}

export const VacPagination = ({ totalCount, query }: IVacPaginationProps) => {
    const dispatch = useAppDispatch()

    const pageCount = Math.ceil(totalCount / query.count)

    const handlePageChange = ({ selected }: { selected: number }) => {
        dispatch(saveQueryData({ ...query, page: selected }))
    }

    return (
        <Pagination
            pageCount={pageCount}
            pageNumber={query.page}
            handlePageChange={handlePageChange}
        />
    )
}