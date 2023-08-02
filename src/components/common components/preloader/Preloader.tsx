import s from './Preloader.module.css'
import preloader from '../../../resources/preloader/preloader.svg'
import { IIsFullScreen } from '../../../types/isFullScreen.interface'

const Preloader = ({ isFS }: IIsFullScreen) => {
    return (
        <div className={`${s.preloader} ${s[`preloader${isFS}`]}`}>
            <img alt='preloader' src={preloader} />
        </div>
    )
}

export default Preloader