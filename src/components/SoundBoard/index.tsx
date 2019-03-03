// tslint:disable
// External Dependencies
import * as React from 'react';
import { isEqual } from 'underscore';
import { Howl } from 'howler';

// Internal Dependencies
import './style.css';

// Interfaces / Types
import { AudioSpriteData } from 'src/boards/cheapHeat';

// Helpers
import { setStateAsync } from 'src/helpers/promise';
import DimmedLoader from '../Shared/DimmedLoader';

interface ComponentProps {
    audioSrc: string
    soundboardConfig: { [key: string]: AudioSpriteData }
}

interface ComponentState {
    audioData: AudioSpriteData[]
    loading: boolean
}

const initialState: ComponentState = {
    audioData: [],
    loading: true,
}

type Props = ComponentProps
type State = ComponentState

class SoundBoard extends React.Component<Props, State> {
    private audio: Howl
    
    constructor(props: Props) {
        super(props);

        // Set up the audio sprites
        const soundboardKeys = Object.keys(props.soundboardConfig)
        const audioData = soundboardKeys.map((k) => props.soundboardConfig[k])

        // Set up Howler
        const spriteData = {}
        for (const data of audioData) {
            spriteData[data.id] = [data.start, data.length]
        }
        this.audio = new Howl({
            src: props.audioSrc,
            sprite: spriteData
        })
        this.audio.on('load', () => this.audioLoaded())

        this.state = {
            ...initialState,
            audioData
        }
    }

    async componentDidUpdate(prevProps: Props) {
        if (!isEqual(prevProps.soundboardConfig, this.props.soundboardConfig)) {
            const soundboardKeys = Object.keys(this.props.soundboardConfig)
            const newAudioData = soundboardKeys.map((k) => this.props.soundboardConfig[k])
            setStateAsync(this, { audioData: newAudioData })
        }
    }

    //------------------------------
    // Event Handlers
    //------------------------------

    private audioLoaded = async () => {
        await setStateAsync(this, { loading: false })
    }

    private onClick = async (trackID: string) => {
        this.audio.play(trackID)
    }

    //------------------------------
    // Content Builders
    //------------------------------

    private buildPads = (audioSprites: AudioSpriteData[]) => {
        return audioSprites.map((sprite) => {
            const key = `pads_${sprite.id}`
            return this.buildPad(sprite.title, sprite.id, key)
        })
    }

    private buildPad = (title: string, trackID: string, key: string) => {
        const content = (
            <div
                className='card sound-pad'
                onClick={() => this.onClick(trackID)}
            >
                <div className='card-body d-flex align-items-center justify-content-center'>
                    {title}
                </div>
            </div>
        )

        return (
            <DimmedLoader
                key={key}
                component={content}
                isLoading={this.state.loading}
            />
        )
    }

    public render() {
        const content = (
            <div className="container mt-3">
                <div className="row justify-content-center">
                    {this.buildPads(this.state.audioData)}
                </div>
            </div>
        )

        return content
    }
}

export default SoundBoard;