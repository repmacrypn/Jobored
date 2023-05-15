import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    setFavourites, setCurrentPage,
    modifyFavArray, setFavTotalCount,
    modifyCurFavArray
} from '../../redux/favReducer';
import Favourites from './Favourites';

const FavouritesContainer = (props) => {
    const [paginatorPortionNum, setPaginatorPortionNum] = useState(Math.ceil(props.currentPage === 0 ?
        1 : props.currentPage / props.portionSise));

    const favCopy = JSON.parse(JSON.stringify(props.favourites));

    useEffect(() => {
        props.setFavourites(favCopy.slice(props.currentPage * props.count, props.currentPage * props.count + 4));
        return () => props.setCurrentPage(0);
    }, []);

    const changeCurrentPageOnClick = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        props.setFavourites(favCopy.slice(pageNumber * props.count, pageNumber * props.count + 4));
    };

    return <Favourites
        paginatorPortionNum={paginatorPortionNum}
        setPaginatorPortionNum={setPaginatorPortionNum}
        favourites={props.favourites}
        currentFavArray={props.currentFavArray}
        count={props.count}
        currentPage={props.currentPage}
        setFavourites={props.setFavourites}
        setCurrentPage={props.setCurrentPage}
        changeCurrentPageOnClick={changeCurrentPageOnClick}
        modifyFavArray={props.modifyFavArray}
        modifyCurFavArray={props.modifyCurFavArray}
        setFavTotalCount={props.setFavTotalCount}
        totalCount={props.totalCount}
    />
};

const mapStateToProps = (state) => {
    return {
        favourites: state.favReducer.favourites,
        currentFavArray: state.favReducer.currentFavArray,
        count: state.favReducer.count,
        portionSise: state.vacanciesReducer.portionSise,
        totalCount: state.favReducer.totalCount,
        currentPage: state.favReducer.currentPage,
    };
};

export default connect(mapStateToProps, {
    setFavourites, modifyCurFavArray,
    setCurrentPage, setFavTotalCount, modifyFavArray
})(FavouritesContainer);