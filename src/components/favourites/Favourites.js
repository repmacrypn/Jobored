import React from "react";
import Paginator from '../../utilites/Paginator';
import starFavImage from '../../resources/images/StarFav.png';
/* import s from './Favorites.module.css'; */

const Favourites = (props) => {
    const onFavButtonClick = (fav) => {
        props.modifyFavArray(fav, true);
        props.modifyCurFavArray(fav);
        props.setFavTotalCount(--props.favourites.length);
    };

    return <div>
        <Paginator
            totalItemsCount={props.totalCount}
            pageSize={props.count}
            currentPage={props.currentPage}
            onPageChange={props.changeCurrentPageOnClick}
            paginatorPortionNum={props.paginatorPortionNum}
            setPaginatorPortionNum={props.setPaginatorPortionNum}
        />
        {
            props.favourites.length ?
                props.currentFavArray.map(obj => {
                    return <div key={obj.id}>
                        {obj.profession} - {obj.firm_name} - {obj.town?.title} - {obj.catalogues[0]?.title} - {obj.type_of_work?.title}
                        - {obj.payment_to}:{obj.payment_from}/{obj.currency}
                        <span onClick={() => onFavButtonClick(obj)}>
                            <img
                                height='22px'
                                width='22px'
                                alt='remove from favourites'
                                src={starFavImage}
                            />
                        </span>
                    </div>
                }) :
                <div>Empty state</div >
        }
    </div >;
};

export default Favourites;