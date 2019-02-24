// tslint:disable
// External Dependencies
import * as React from 'react';

interface ComponentProps {
    title: string
    audio: HTMLAudioElement
}

type Props = ComponentProps
type State = any

class SoundPad extends React.Component<Props, State> {
    private audio: HTMLAudioElement
    
    constructor(props: Props) {
        super(props);
        this.audio = props.audio
    }

    private onClick = () => {
        this.audio.play()
    }

    private buildPad = () => {
        return (
            <div
                className='card sound-pad mx-auto'
                onClick={this.onClick}
            >
                <div className='card-body d-flex align-items-center justify-content-center'>
                    {this.props.title}
                </div>
            </div>
        )
    }

    public render() {
        return this.buildPad()
    }
}

export default SoundPad;