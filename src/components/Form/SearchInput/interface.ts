import React from 'react'

import { IFormData } from '@/types/formData.interface'

export interface ICustomSearchInput {
  formData: IFormData
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}
