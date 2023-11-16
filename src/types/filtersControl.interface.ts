import React from 'react'

import { IFormData } from '@/types/formData.interface'

export interface IFiltersControl {
  formData: IFormData
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}
