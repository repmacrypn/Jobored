import { NumberInput } from '@mantine/core'

import { ms } from '@/styles/mantineStyles'

import { ICustomNumberInput } from './interface'

export const CustomNumberInput = ({
  value,
  keyWord,
  handleChange,
}: ICustomNumberInput) => {
  return (
    <NumberInput
      value={value}
      onChange={(curVal) => handleChange(curVal, keyWord)}
      placeholder={keyWord}
      radius='md'
      rightSectionWidth={35}
      step={500}
      min={0}
      stepHoldDelay={500}
      stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      styles={{
        input: ms.numberInput.input,
        control: ms.numberInput.control,
        controlUp: ms.numberInput.controlUp,
        controlDown: ms.numberInput.controlDown,
      }}
    />
  )
}
