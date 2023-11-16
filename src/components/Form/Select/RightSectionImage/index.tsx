import { memo } from 'react'

import { IRightSectionImage } from './interface'

export const RightSectionImage = memo(({ src, alt }: IRightSectionImage) => {
  return <img src={src} alt={alt} width='24px' height='24px' />
})
