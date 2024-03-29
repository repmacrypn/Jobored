import { Header } from '@/components/Header'
import { Main } from '@/components/Main'

import s from './styles.module.scss'

export const App = () => {
  return (
    <div className={s.appWrapper}>
      <Header />
      <Main />
    </div>
  )
}
