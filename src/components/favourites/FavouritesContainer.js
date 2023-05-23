import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    setFavourites, setCurrentPage,
    modifyFavArray, setFavTotalCount
} from '../../redux/favReducer';
import Favourites from './Favourites';

const FavouritesContainer = ({ setFavourites, setCurrentPage,
    favourites, count, currentPage, currentFavArray, modifyFavArray,
    setFavTotalCount, totalCount, portionSise }) => {
    useEffect(() => {
        setFavourites(JSON.parse(JSON.stringify(favourites))
            .slice(currentPage * count, currentPage * count + 4));
    }, [setFavourites]);

    const changeCurrentPageOnClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        setFavourites(JSON.parse(JSON.stringify(favourites))
            .slice(pageNumber * count, pageNumber * count + 4));
    };

    return <Favourites
        favourites={favourites}
        currentFavArray={currentFavArray}
        count={count}
        currentPage={currentPage}
        changeCurrentPageOnClick={changeCurrentPageOnClick}
        modifyFavArray={modifyFavArray}
        setFavTotalCount={setFavTotalCount}
        totalCount={totalCount}
        portionSise={portionSise}
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
    setFavourites, setCurrentPage, setFavTotalCount, modifyFavArray
})(FavouritesContainer);