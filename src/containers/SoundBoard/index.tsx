// External Dependencies
import { Howl } from 'howler'
import * as React from 'react'
import styled from 'styled-components'
import { isEqual } from 'underscore'

// Internal Dependencies

// Interfaces / Types
import { AudioSpriteData } from '../../boards/cheapHeat'

// Components
import DimmedLoader from '../../components/DimmedLoader'
import { SoundPad } from '../../components/SoundPad'

// Helpers
import { setStateAsync } from '../../helpers/promise'

interface ComponentProps {
    audioSrc: string
    soundboardConfig: { [key: string]: AudioSpriteData }
}

const initialState = {
    audioData: [] as AudioSpriteData[],
    loading: true,
}

type Props = ComponentProps
type State = typeof initialState

class SoundBoard extends React.Component<Props, State> {
    private audio: Howl
    
    constructor(props: Props) {
        super(props)
        const { soundboardConfig, audioSrc } = props

        // Set up the audio sprites
        const soundboardKeys = Object.keys(soundboardConfig)
        const audioData = soundboardKeys.map((k) => soundboardConfig[k])

        // Set up Howler
        const spriteData = {}
        audioData.forEach(({ id, start, length }) => { spriteData[id] = [start, length] })
        this.audio = new Howl({ src: audioSrc, sprite: spriteData })
        this.audio.on('load', () => this.audioLoaded())

        this.state = { ...initialState, audioData }
    }

    async componentDidUpdate(prevProps: Props) {
        const prevSoundboardConfig = prevProps.soundboardConfig
        const { soundboardConfig } = this.props

        if (!isEqual(prevSoundboardConfig, soundboardConfig)) {
            const soundboardKeys = Object.keys(soundboardConfig)
            const newAudioData = soundboardKeys.map((k) => soundboardConfig[k])
            setStateAsync(this, { audioData: newAudioData })
        }
    }

    // ------------------------------
    // Event Handlers
    // ------------------------------

    private audioLoaded = async () => {
        await setStateAsync(this, { loading: false })
    }

    private onClick = async (trackID: string) => {
        this.audio.play(trackID)
    }

    // ------------------------------
    // Content Builders
    // ------------------------------

    private buildPads = (audioSprites: AudioSpriteData[]) => {
        return audioSprites.map(({ title, id }) => {
            const key = `pads_${id}`
            return this.buildPad(title, id, key)
        })
    }

    private buildPad = (title: string, trackID: string, key: string) => {
        const { loading } = this.state
        return (
            <DimmedLoader key={key} isLoading={loading}>
                <SoundPad title={title} trackID={trackID} onClick={this.onClick}/>
            </DimmedLoader>
        )
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.buildPads(this.state.audioData)}
                </Row>
            </Container>
        )
    }
}

const Container = styled.div.attrs({ className: 'container '})`
    margin-top: 1rem;
`
Container.displayName = 'Container'

const Row = styled.div.attrs({ className: 'row' })`
    justify-content: center;
`
Row.displayName = 'Row'

export default SoundBoard
