import React from 'react'

import { useAppDispatch } from '@/hooks/useAppHooks'
import { saveQueryData } from '@/redux/vacanciesSlice'
import { processNoAgreement } from '@/utils/helpers/processNoAgreement'

import { ISubmitButton } from './interface'

import s from './styles.module.scss'

export const SubmitButton = ({ text, classNameProp, formData }: ISubmitButton) => {
  const dispatch = useAppDispatch()

  const onSubmitButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { catalogue, paymentFrom, paymentTo, searchKeyWord } = formData
    const agreed = processNoAgreement(paymentFrom, paymentTo)

    dispatch(
      saveQueryData({
        agreed,
        catalogue,
        paymentFrom,
        paymentTo,
        searchKeyWord,
      }),
    )
  }

  return (
    <button
      type='button'
      className={`${s[classNameProp]} ${s.defaultButtonStyles}`}
      onClick={onSubmitButtonClick}
    >
      {text}
    </button>
  )
}
