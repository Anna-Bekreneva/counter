import React, {FC, memo} from 'react'
import { Remained } from '../Remained'
import {useTablo} from "./useTablo";

export const Tablo: FC = memo(() => {

  const { counter, maxValue, minValue, isRemainedMax, remained  } = useTablo()

  const text =
    counter === maxValue ? (
      <span className={'counter-tablo__text'}>This is max value</span>
    ) : counter === minValue ? (
      <span className={'counter-tablo__text'}>This is min value</span>
    ) : null

  const isRemainedMaxLayout = isRemainedMax && (
    <Remained
      buttonText={'yes'}
      remained={remained}
      text={`Add remainder ${maxValue - counter}?`}
    />
  )

  return (
    <div className={'counter-tablo tablo'}>
      <span
        className={
          counter === maxValue
            ? 'counter-tablo__number' + ' ' + 'counter-tablo__number--active'
            : 'counter-tablo__number'
        }
      >
        {counter}
      </span>
      {text}
      {isRemainedMaxLayout}
    </div>
  )
})
