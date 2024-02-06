import React, {FC, memo} from 'react'

// todo: do i need to include styles here?
import './../styles/warning.css'

type PropsType = {
  text: string
}

export const Warning: FC<PropsType> = memo(({text}) => {
    return (
        <div className={'warning'}>
            <button className={'warning__button'} type={'button'}>
                !<span className={'sr-only'}>Warning</span>
            </button>
            <div className={'warning__text'}>{text}</div>
        </div>
    )
})
