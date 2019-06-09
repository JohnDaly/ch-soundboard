import React from 'react'
import styled from 'styled-components'

interface Props {
    isDarkTheme: boolean,
    onClick: () => any,
    className?: string
}

export const ThemeToggle: React.FC<Props> = styled(({ isDarkTheme, onClick, className }: Props) => (
    <button className={`btn btn-primary ${className}`} onClick={() => onClick()}>
        <i className={(isDarkTheme) ? 'fas fa-sun' : 'fas fa-moon'}/>
    </button>
))`
    margin: 5px;
`
