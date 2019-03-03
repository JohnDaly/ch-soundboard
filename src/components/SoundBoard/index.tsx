// tslint:disable
// External Dependencies
import * as React from 'react';

export interface AudioSpriteData {
    id: string
    title: string
    start: number
    length: number
}

interface ComponentProps {
    audio: HTMLAudioElement
    spriteData: { [key: string]: AudioSpriteData }
}

interface ComponentState {
    currentSprite: any
    audioLoaded: boolean
}

const initialState: ComponentState = {
    currentSprite: null,
    audioLoaded: false
}

type Props = ComponentProps
type State = ComponentState

class SoundBoard extends React.Component<Props, State> {
    private audio: HTMLAudioElement
    private audioData: AudioSpriteData[]
    
    constructor(props: Props) {
        super(props);
        this.audio = props.audio
        this.state = {...initialState}
        this.audio.addEventListener('timeupdate', () => this.onTimeUpdate(this.audio), false)
        this.audio.addEventListener('canplay', () => this.onAudioLoaded(), false)

        // Set up the audio sprites
        const spriteKeys = Object.keys(props.spriteData)
        this.audioData = spriteKeys.map((k) => props.spriteData[k])
    }

    //------------------------------
    // Event Handlers
    //------------------------------

    private onTimeUpdate = (that: HTMLAudioElement) => {
        const currentSprite = this.state.currentSprite
        if (that.currentTime >= currentSprite.start + currentSprite.length) {
            that.pause()
        }
    }

    private onAudioLoaded = () => {
        this.setState({ audioLoaded: true })
    }

    private onClickLoadAudio = () => {
        this.audio.load()
    }

    private onClick = async (trackID: string) => {
        this.setState({ currentSprite: this.props.spriteData[trackID] }, () => {
            this.audio.currentTime = this.state.currentSprite.start
            this.audio.play()
        })
    }

    //------------------------------
    // Content Builders
    //------------------------------

    private buildPads = (audioSprites: AudioSpriteData[]) => {
        return audioSprites.map((sprite, index) => {
            const key = `pads_${index}`
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
                    {this.buildPads(this.audioData)}
                </div>
            </div>
        )
    }
}

export default SoundBoard;