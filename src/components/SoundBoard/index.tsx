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
    private leftCol: AudioSpriteData[]
    private rightCol: AudioSpriteData[]
    
    constructor(props: Props) {
        super(props);
        this.audio = props.audio
        this.state = {...initialState}
        this.audio.addEventListener('timeupdate', () => this.onTimeUpdate(this.audio), false)
        this.audio.addEventListener('canplay', () => this.onAudioLoaded(), false)

        // Set up the columns
        const spriteKeys = Object.keys(props.spriteData)
        const midpoint = Math.ceil(spriteKeys.length / 2)
        const leftKeys = spriteKeys.slice(0, midpoint)
        const rightKeys = spriteKeys.slice(midpoint)
        this.leftCol = leftKeys.map((k) => props.spriteData[k])
        this.rightCol = rightKeys.map((k) => props.spriteData[k])
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

    private buildPads = (colSprites: AudioSpriteData[], groupIndex: string) => {
        return colSprites.map((sprite, index) => {
            const key = `pads_${groupIndex}_${index}`
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
                    <div className="col-6 left-col">
                        {this.buildPads(this.leftCol, 'leftCol')}
                    </div>
                    <div className="col-6 right-col">
                        {this.buildPads(this.rightCol, 'rightCol')}
                    </div>
                </div>
            </div>
        )
    }
}

export default SoundBoard;