import React, { useEffect } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getLoginData } from "../../redux/authReducer";

const HeaderContainer = ({ getLoginData }) => {
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            getLoginData();
        }
    }, [getLoginData]);

    return <Header />;
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, { getLoginData })(HeaderContainer);