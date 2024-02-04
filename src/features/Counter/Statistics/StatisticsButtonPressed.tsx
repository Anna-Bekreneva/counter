import React, {FC, memo} from "react";

type PropsType = {
    text: string
    amountButtonPressed: number
}
export const StatisticsButtonPressed: FC<PropsType> = memo(( { text, amountButtonPressed } ) => {
    return (
        <p className={'statistics__text'}>
            {text}
            <span className={'statistics__accent'}>{' ' + amountButtonPressed}</span>
        </p>
    )
})