import preloader from '@/resources/preloader/preloader.svg'
import { IIsFullScreen } from '@/types/isFullScreen.interface'

import s from './styles.module.scss'

export const Loader = ({ isFS }: IIsFullScreen) => {
  return (
    <div className={`${s.preloader} ${s[`preloader${isFS}`]}`}>
      <img alt='preloader' src={preloader} />
    </div>
  )
}
