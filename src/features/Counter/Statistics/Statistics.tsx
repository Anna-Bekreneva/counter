import React, {FC, memo} from 'react'
import {useStatistics} from "./useStatistics";
import {StatisticsNumber} from "./StatisticsNumber";
import {StatisticsButtonPressed} from "./StatisticsButtonPressed";

export const Statistics: FC = memo(() => {

  const {
    isRunStatistics,
    statisticsMaxNumber,
    statisticsAmountMaxClick,
    statisticsMinNumber,
    statisticsAmountMinClick,
    amountIncreaseButtonPressed,
    amountDecreaseButtonPressed
  } = useStatistics()

  const result = isRunStatistics ? (
    <>
      <div className={'statistics__left'}>
        <StatisticsNumber
            text={'up to the max number:'}
            statisticsNumber={statisticsMaxNumber}
            statisticsAmountClick={statisticsAmountMaxClick}
        />
        <StatisticsNumber
            text={'up to the min number:'}
            statisticsNumber={statisticsMinNumber}
            statisticsAmountClick={statisticsAmountMinClick}
        />
      </div>
      <div className={'statistics__right'}>
        <StatisticsButtonPressed text={'the button «inc» was pressed:'} amountButtonPressed={amountIncreaseButtonPressed}/>
        <StatisticsButtonPressed text={'the button «dec» was pressed:'} amountButtonPressed={amountDecreaseButtonPressed}/>
      </div>
    </>
  ) : (
    <p className={'statistics__default'}>stats will be here</p>
  )

  return <div className={'statistics tablo tablo--mini'}>{result}</div>
})
