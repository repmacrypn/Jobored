import { useAppDispatch } from '@/hooks/useAppHooks'
import { saveQueryData } from '@/redux/vacanciesSlice'
import { IFiltersControl } from '@/types/filtersControl.interface'
import { processNoAgreement } from '@/utils/helpers/processNoAgreement'

export const useFiltersControl = ({ formData, setFormData }: IFiltersControl) => {
  const dispatch = useAppDispatch()

  const handleSelectChange = (currentValue: string | null) => {
    setFormData({ ...formData, catalogue: currentValue })
  }

  const handleNumberInputChange = (currentValue: number | '', keyWord: 'От' | 'До') => {
    setFormData({ ...formData, [keyWord]: currentValue })
  }

  const resetAllOnClick = () => {
    const agreed = processNoAgreement('', '')

    setFormData({
      ...formData,
      catalogue: '',
      paymentFrom: '',
      paymentTo: '',
      searchKeyWord: '',
    })
    dispatch(saveQueryData({ agreed }))
  }

  return {
    resetAllOnClick,
    handleSelectChange,
    handleNumberInputChange,
  }
}
