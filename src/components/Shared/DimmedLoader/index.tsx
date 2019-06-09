// External Dependencies
import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

// Internal Dependencies

interface ComponentProps {
	isLoading: boolean
	children: any
}

type Props = ComponentProps

export default class DimmedLoader extends React.Component<Props> {
	constructor(props: Props) {
		super(props)
    }

	render() {
        const { isLoading, children } = this.props

        return (
            <Dimmer>
                <Loader active={isLoading} />
                <DimmerContent active={isLoading}>
                    {children}
                </DimmerContent>
            </Dimmer>
        )
	}
}

const Dimmer = styled.div`
    position: relative;
    height: 100%;
`

const loaderAnimationKeyframes = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

const loaderAnimation = css`
    animation: ${loaderAnimationKeyframes} .6s linear;
`

const Loader = styled.div<{ active: boolean }>`
    display: block;
    position: absolute;
    opacity: ${({ active }) => (active) ? 1 : 0 };
    z-index: ${({ active }) => (active) ? 10 : 0};
    margin: 0 auto;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    :before,:after {
        width: 2.5rem;
        height: 2.5rem;
        margin: -1.25rem 0 0 -1.25rem;
        position: absolute;
        content: '';
        top: 50%;
        bottom: 50%;
        border-radius: 50%;
    }
    :before {
        border: 3px solid currentColor;
        opacity: .15;
    }
    :after {
        ${loaderAnimation};
        animation-iteration-count: infinite;
        border: 3px solid;
        border-color: transparent;
        border-top-color: currentColor;
        box-shadow: 0 0 0 1px transparent;
    }
`

const DimmerContent = styled.div<{ active: boolean }>(({ active }) => (active) ? ({
    opacity: 0.5,
    pointerEvents: 'none',
}) : {})
