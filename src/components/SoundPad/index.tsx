import React from 'react'
import styled from 'styled-components'

interface Props {
    title: string
    trackID: string
    onClick: (trackID: string) => any
}

export const SoundPad: React.FC<Props> = ({ title, trackID, onClick }: Props) => (
    <SoundPadCard onClick={() => onClick(trackID)}>
        <SoundPadBody>
            {title}
        </SoundPadBody>
    </SoundPadCard>
)

const SoundPadCard = styled.button.attrs({ className: 'card' })`
    cursor: pointer;

    /* Dimensions */
    width: 40vw;
    height: 40vw;
    max-height: 120px;
    max-width: 120px;

    /* Margin/Padding */
    margin-bottom: 15px;

    /* Border */
    border-radius: 3px;
    box-shadow: 2px 3px var(--shadow-color);

    /* Font */
    font-size: 11px;
    color: var(--color);

    /* Color */
    background-color: var(--card-bg);

    /* Transition */
    transition: all 0.2s ease;

    :hover {
        filter: brightness(85%);
    }

    :active {
        box-shadow: 0px 0px black;
        filter: brightness(60%);
        transform: scale(0.99) translateY(3px) translateX(2px);
    }
`

const SoundPadBody = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`