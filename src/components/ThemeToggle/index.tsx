import React from 'react'
import styled from 'styled-components'

interface Props {
    isDarkTheme: boolean,
    onClick: () => any,
    className?: string
}

export const ThemeToggle: React.FC<Props> = styled(({ isDarkTheme, onClick, className }: Props) => (
    <button className={`btn btn-primary ${className}`} onClick={() => onClick()}>
        <ThemeIcon isDarkTheme={isDarkTheme} />
    </button>
))`
    margin: 5px 5px 5px auto;
`
ThemeToggle.displayName = 'ThemeToggle'

const ThemeIcon: React.FC<{ isDarkTheme: boolean}> = ({ isDarkTheme }) => {
    const iconClass = (isDarkTheme) ? 'fas fa-sun' : 'fas fa-moon'
    return <i className={iconClass} />
}
