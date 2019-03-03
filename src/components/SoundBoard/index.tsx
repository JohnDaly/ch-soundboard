// tslint:disable
// External Dependencies
import * as React from 'react';
import { isEqual } from 'underscore';

// Internal Dependencies

// Components
import SoundPad from '../SoundPad';

// Interfaces / Types
import { AudioSpriteData } from 'src/boards/cheapHeat';
import { setStateAsync } from 'src/helpers/promise';

interface ComponentProps {
    soundboardConfig: { [key: string]: AudioSpriteData }
}

interface ComponentState {
    audioData: AudioSpriteData[]
}

const initialState: ComponentState = {
    audioData: []
}

type Props = ComponentProps
type State = ComponentState

class SoundBoard extends React.Component<Props, State> {    
    constructor(props: Props) {
        super(props);

        // Set up the audio data
        const soundboardKeys = Object.keys(props.soundboardConfig)
        const audioData = soundboardKeys.map((k) => props.soundboardConfig[k])
        this.state = {
            ...initialState,
            audioData,
        }
    }

    async componentDidUpdate(prevProps: Props) {
        if (!isEqual(prevProps.soundboardConfig, this.props.soundboardConfig)) {
            const soundboardKeys = Object.keys(this.props.soundboardConfig)
            const newAudioData = soundboardKeys.map((k) => this.props.soundboardConfig[k])
            await setStateAsync(this, { audioData: newAudioData })
        }
    }

    //------------------------------
    // Content Builders
    //------------------------------

    private buildPads = (audioData: AudioSpriteData[]) => {
        return audioData.map((data) => {
            return (
                <SoundPad
                    key={`soundpad_${data.id}`}
                    title={data.title}
                    audio={data.audio}
                />
            )
        })
    }

    public render() {
        return (
            <div className="row justify-content-center">
                {this.buildPads(this.state.audioData)}
            </div>
        )
    }
}

export default SoundBoard;