import React from 'react'
import s from './Preloader.module.css'
import preloader from '../../../resources/preloader/preloader.svg'

const Preloader = () => {
    return (
        <div className={s.preloader}>
            <img alt='preloader' src={preloader} />
        </div>
    )
}

export default Preloader