import React, {FC, memo} from "react";

type PropsType = {
    text: string,
    statisticsNumber: number
    statisticsAmountClick: number
}
export const StatisticsNumber: FC<PropsType> = memo((
    { text, statisticsNumber, statisticsAmountClick }
) => {
    return (
        <p className={'statistics__text'}>
            {text}
            <span className={'statistics__accent'}>{' ' + statisticsNumber}</span> and
            <span className={'statistics__accent'}>{' ' + statisticsAmountClick}</span> click
        </p>
    )
})