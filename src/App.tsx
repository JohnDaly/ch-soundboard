// tslint:disable
// External Dependencies
import * as React from 'react';

// Internal Dependencies
import './App.css';
import './components/SoundPad/style.css';

// Audio
import allAudio from './assets/all_audio.wav';
import notAWinner from './assets/hes_not_a_winner.wav';
import iSee from './assets/i_see_uhhuh.wav';
import soHappy from './assets/i_was_so_happy.wav';
import imSorry from './assets/oh_im_sorry.wav';
import hurtingMe from './assets/youre_hurting_me.wav';

// Images
import cheapheatLogo from './assets/cheap-heat-logo.png';

// Components
import SoundPad from './components/SoundPad';
import SoundBoard from './components/SoundBoard';

// State
import * as LocalStorage from './store/localStorage';

// Helpers
import { THEME_STATE_KEY, THEME_DARK, OS_STATE_KEY } from './constants/constants';

interface ComponentState {
    theme: string
    appleUser: boolean
}

const initialState: ComponentState = {
    theme: THEME_DARK,
    appleUser: false,
}

type Props = any
type State = ComponentState

class App extends React.Component<Props, State> {
    private allAudio = new Audio(allAudio);
    private notAWinner = new Audio(notAWinner);
    private iSee = new Audio(iSee)
    private soHappy = new Audio(soHappy);
    private imSorry = new Audio(imSorry);
    private hurtingMe = new Audio(hurtingMe);
    
    constructor(props: Props) {
        super(props)

        // Get saved theme state from local storage
        const theme: string = LocalStorage.loadStateForKey(THEME_STATE_KEY) || ''

        // Get saved OS state from local storage
        const appleUser: boolean = LocalStorage.loadStateForKey(OS_STATE_KEY) || false
        this.state = {
            ...initialState,
            theme,
            appleUser,
        }
    }

    private toggleOS = () => {
        // Save the option to local storage
        LocalStorage.saveStateForKey(!this.state.appleUser, OS_STATE_KEY)
        this.setState({ appleUser: !this.state.appleUser })
    }

    private toggleTheme = () => {
        const newTheme = (this.state.theme === THEME_DARK) ? '' : THEME_DARK

        // Save the theme to local storage
        LocalStorage.saveStateForKey(newTheme, THEME_STATE_KEY)
        this.setState({ theme: newTheme })
    }

    private buildThemeToggle = () => {
        const isDarkTheme = this.state.theme === THEME_DARK
        const buttonIcon = (isDarkTheme) ? 'fas fa-sun' : 'fas fa-moon'
        return (
            <button
                className='btn btn-primary'
                onClick={() => this.toggleTheme()}
            >
                <i className={`${buttonIcon}`}></i>
            </button>
        )
    }

    private buildStandardSoundboard = () => {
        return (
            <div className="row justify-content-center">
                <div className="col-6 left-col">
                    <SoundPad title={`He's not a winner.`} audio={this.notAWinner}/>
                    <SoundPad title={`I see, uh huh.`} audio={this.iSee}/>
                    <SoundPad title={`I was so happy.`} audio={this.soHappy}/>
                </div>
                <div className="col-6 right-col">
                    <SoundPad title={`Oh, I'm sorry.`} audio={this.imSorry}/>
                    <SoundPad title={`You're hurting me.`} audio={this.hurtingMe}/>
                </div>
            </div>
        )
    }

    private buildAppleSoundboard = () => {
        const spriteData = {
            notAWinner: {
                id: 'notAWinner',
                title: `He's not a winner.`,
                start: 0.331,
                length: 1.269,
            },
            iSee: {
                id: 'iSee',
                title: `I see, uh huh.`,
                start: 1.953,
                length: 1.765,
            },
            soHappy: {
                id: 'soHappy',
                title: `I was so happy.`,
                start: 3.926,
                length: 2.053,
            },
            imSorry: {
                id: 'imSorry',
                title: `Oh, I'm sorry.`,
                start: 6.220,
                length: 1.504,
            },
            hurtingMe: {
                id: 'hurtingMe',
                title: `You're hurting me.`,
                start: 7.943,
                length: 1.791,
            }
        }

        return (
            <SoundBoard audio={this.allAudio} spriteData={spriteData} />
        )
    }

    public render() {
        const content = (this.state.appleUser) ?
            this.buildAppleSoundboard() :
            this.buildStandardSoundboard()
        return (
            <div className="App" data-theme={this.state.theme}>
                <header className="App-header">
                    <div>
                        <img src={cheapheatLogo} className="header-logo"/>
                    </div>
                    <label className='apple-user-checkbox'>
                        Using iOS?
                        <input
                            className='ml-2'
                            type='checkbox'
                            defaultChecked={this.state.appleUser}
                            onChange={this.toggleOS}
                        />
                    </label>
                </header>

                <div className="container mt-3">
                    {content}
                </div>

                <footer className='footer d-flex flex-row justify-content-end'>
                    {this.buildThemeToggle()}
                </footer>
            </div>
        );
    }
}

export default App;
