import { memo } from 'react'

import { ITitle } from './interface'

import '@/styles/defaultStyles.css'
import s from './styles.module.scss'

export const Title = memo(({ text, classNameProp }: ITitle) => {
  return <div className={`${s[classNameProp]} textBaseMBold`}>{text}</div>
})
