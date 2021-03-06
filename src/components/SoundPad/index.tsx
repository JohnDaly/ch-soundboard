import React from 'react'
import styled from 'styled-components'

interface Props {
    title: string
    trackID: string
    onClick: (trackID: string) => any
    className?: string
}

export const SoundPad: React.FC<Props> = styled(({ title, trackID, onClick, className }: Props) => (
    <div className={className}>
        <SoundPadCard onClick={() => onClick(trackID)}>
            <SoundPadBody>
                {title}
            </SoundPadBody>
        </SoundPadCard>
    </div>
))`
    margin-left: 5px;
    margin-right: 5px;
`
SoundPad.displayName = 'SoundPad'

const SoundPadCard = styled.button`
    cursor: pointer;

    /* Dimensions */
    width: 40vw;
    height: 40vw;
    max-height: 120px;
    max-width: 120px;

    /* Margin/Padding */
    margin-bottom: 15px;

    /* Border */
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 3px;
    box-shadow: 2px 3px ${({ theme }) => theme.shadowColor};

    /* Font */
    font-size: 11px;
    color: ${({ theme }) => theme.color};

    /* Color */
    background-color: ${({ theme }) => theme.cardBgColor};

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
SoundPadCard.displayName = 'SoundPadCard'


const SoundPadBody = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`
SoundPadBody.displayName = 'SoundPadBody'