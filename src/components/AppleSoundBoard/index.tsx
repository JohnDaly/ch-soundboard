// tslint:disable
// External Dependencies
import * as React from 'react';
import { isEqual } from 'underscore';

// Internal Dependencies

// Interfaces / Types
import { AudioSpriteData } from 'src/boards/cheapHeat';

// Helpers
import { setStateAsync } from 'src/helpers/promise';

interface ComponentProps {
    audio: HTMLAudioElement
    soundboardConfig: { [key: string]: AudioSpriteData }
}

interface ComponentState {
    audioData: AudioSpriteData[]
    currentSprite: any
    audioLoaded: boolean
}

const initialState: ComponentState = {
    audioData: [],
    currentSprite: null,
    audioLoaded: false
}

type Props = ComponentProps
type State = ComponentState

class AppleSoundBoard extends React.Component<Props, State> {
    private audio: HTMLAudioElement
    
    constructor(props: Props) {
        super(props);
        this.audio = props.audio
        this.audio.addEventListener('timeupdate', () => this.onTimeUpdate(this.audio), false)
        this.audio.addEventListener('canplay', () => this.onAudioLoaded(), false)

        // Set up the audio sprites
        const soundboardKeys = Object.keys(props.soundboardConfig)
        const audioData = soundboardKeys.map((k) => props.soundboardConfig[k])
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

    private onTimeUpdate = (that: HTMLAudioElement) => {
        const currentSprite = this.state.currentSprite
        if (!currentSprite) { return }
        if (that.currentTime >= currentSprite.start + currentSprite.length) {
            that.pause()
        }
    }

    private onAudioLoaded = async () => {
        setStateAsync(this, { audioLoaded: true })
    }

    private onClickLoadAudio = () => {
        this.audio.load()
    }

    private onClick = async (trackID: string) => {
        await setStateAsync(this, { currentSprite: this.props.soundboardConfig[trackID] })
        this.audio.currentTime = this.state.currentSprite.start
        this.audio.play()
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
        return (
            <div
                key={key}
                className='card sound-pad'
                onClick={() => this.onClick(trackID)}
            >
                <div className='card-body d-flex align-items-center justify-content-center'>
                    {title}
                </div>
            </div>
        )
    }

    public render() {
        if (!this.state.audioLoaded) {
            return (
                <div className="container mt-3">
                    <button onClick={this.onClickLoadAudio}>
                        Load Audio for Soundboard
                    </button>
                </div>
            )   
        }
        return (
            <div className="container mt-3">
                <div className="row justify-content-center">
                    {this.buildPads(this.state.audioData)}
                </div>
            </div>
        )
    }
}

export default AppleSoundBoard;