import React, {FC, memo, ReactNode} from "react";

type ButtonPropsType = {
    disabled?: boolean
    callback: () => void
    children: ReactNode
}

export const SettingsManagementButton: FC<ButtonPropsType> = memo(( { disabled, callback, children } ) => {
    return (
        <button
            className={'management__button button'}
            type={'button'}
            onClick={callback}
            disabled={disabled}
        >
            {children}
        </button>
    )
})