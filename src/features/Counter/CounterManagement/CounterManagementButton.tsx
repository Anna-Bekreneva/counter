import React, {ButtonHTMLAttributes, FC, memo, ReactNode} from "react";

type PropsType = {
    disabled: boolean
    callback: () => void
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>
export const CounterManagementButton: FC<PropsType> = memo(({ disabled, children, callback, ...props } ) => {
    return (
        <button
            {...props}
            className={'management__button button'}
            disabled={disabled}
            onClick={callback}
            type={'button'}
        >
            {children}
        </button>
    )
})