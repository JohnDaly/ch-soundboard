// tslint:disable
// External Dependencies
import * as React from 'react';

// Internal Dependencies
import './App.css';
import './components/SoundPad/style.css';

// Audio
import notAWinner from './assets/hes_not_a_winner.wav';
import iSee from './assets/i_see_uhhuh.wav';
import soHappy from './assets/i_was_so_happy.wav';
import imSorry from './assets/oh_im_sorry.wav';
import hurtingMe from './assets/youre_hurting_me.wav';

// Images
import cheapheatLogo from './assets/cheap-heat-logo.png';

// Components
import SoundPad from './components/SoundPad';

// State
import * as LocalStorage from './store/localStorage';

// Helpers
import { THEME_STATE_KEY, THEME_DARK } from './constants/constants';

interface ComponentState {
    theme: string
}

const initialState: ComponentState = {
    theme: THEME_DARK
}

type Props = any
type State = ComponentState

class App extends React.Component<Props, State> {
    private notAWinner = new Audio(notAWinner);
    private iSee = new Audio(iSee)
    private soHappy = new Audio(soHappy);
    private imSorry = new Audio(imSorry);
    private hurtingMe = new Audio(hurtingMe);
    
    constructor(props: Props) {
        super(props)

        // Get saved theme state from local storage
        const theme: string = LocalStorage.loadStateForKey(THEME_STATE_KEY) || ''
        this.state = {
            ...initialState,
            theme
        }
    }

    private toggleTheme() {
        const newTheme = (this.state.theme === THEME_DARK) ? '' : THEME_DARK

        // Save the theme to local storage
        LocalStorage.saveStateForKey(newTheme, THEME_STATE_KEY)
        this.setState({ theme: newTheme })
    }

    private buildThemeToggle() {
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

    public render() {
        return (
            <div className="App" data-theme={this.state.theme}>
                <header className="App-header">
                    <div>
                        <img src={cheapheatLogo} className="header-logo"/>
                    </div>
                </header>

                <div className="container mt-3">
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
                </div>

                <footer className='footer d-flex flex-row justify-content-end'>
                    {this.buildThemeToggle()}
                </footer>
            </div>
        );
    }
}

export default App;
