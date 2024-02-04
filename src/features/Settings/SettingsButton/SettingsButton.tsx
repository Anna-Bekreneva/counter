import React, {ButtonHTMLAttributes, FC, memo, ReactNode} from "react";

type PropsType = {
    typeButton: 'minus' | 'plus'
    whichButtonDopClass: 'minus' | 'plus' | null
    isDopClassForButton: boolean
    buttonDisabled: boolean
    callback: () => void
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>
export const SettingsButton: FC<PropsType> = memo((
        { typeButton, whichButtonDopClass, isDopClassForButton, buttonDisabled,
         callback, children, ...props }
) => {
    return (
        <button
            { ...props}
            className={
                whichButtonDopClass === typeButton
                    ? `settings__button settings__button--${typeButton} button ${isDopClassForButton && 'settings__button--active' }`
                    : `settings__button settings__button--${typeButton} button`
            }
            disabled={buttonDisabled}
            onClick={callback}
            type={'button'}
        > {children} </button>
    )
})