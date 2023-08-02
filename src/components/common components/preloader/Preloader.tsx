import s from './Preloader.module.css'
import preloader from '../../../resources/preloader/preloader.svg'

const Preloader = ({ isFS }: { isFS: boolean }) => {
    return (
        <div className={`${s.preloader} ${s[`preloader${isFS}`]}`}>
            <img alt='preloader' src={preloader} />
        </div>
    )
}

export default Preloader