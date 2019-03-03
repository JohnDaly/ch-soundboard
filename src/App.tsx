// tslint:disable
// External Dependencies
import * as React from 'react';

// Internal Dependencies
import './App.css';
import './components/SoundPad/style.css';

// Audio
import allAudio from './assets/all_audio.wav';

// Morris
import notAWinner from './assets/hes_not_a_winner.wav';
import iSee from './assets/i_see_uhhuh.wav';
import soHappy from './assets/i_was_so_happy.wav';
import imSorry from './assets/oh_im_sorry.wav';
import hurtingMe from './assets/youre_hurting_me.wav';

// Greg
import deliciousChicken from './assets/i_like_delicious_chicken.wav';
import ohMyGoodness from './assets/oh_my_goodness.wav';
import shawnTopTen from './assets/shawn_top_ten.wav';
import guyWhoIsJustShady from './assets/guy_who_is_just_shady.wav';
import thanksForNothingShaq from './assets/thanks_for_nothing_shaq.wav';
import replicaBelts from './assets/replica_belts_all_the_time.wav';

// Dip
import majOr from './assets/maj-or.wav';
import mmmMaj from './assets/m_m_m_maj.wav';
import theMajesty from './assets/the_majesty.wav';
import mmmMail from './assets/m_m_m_mail.wav';

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
    private deliciousChicken = new Audio(deliciousChicken);
    private ohMyGoodness = new Audio(ohMyGoodness);
    private shawnTopTen = new Audio(shawnTopTen);
    private guyWhoIsJustShady = new Audio(guyWhoIsJustShady);
    private thanksForNothingShaq = new Audio(thanksForNothingShaq);
    private replicaBelts = new Audio(replicaBelts);
    private majOr = new Audio(majOr);
    private mmmMaj = new Audio(mmmMaj);
    private theMajesty = new Audio(theMajesty);
    private mmmMail = new Audio(mmmMail);

    
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
                <SoundPad title={`He's not a winner.`} audio={this.notAWinner}/>
                <SoundPad title={`I see, uh huh.`} audio={this.iSee}/>
                <SoundPad title={`I was so happy.`} audio={this.soHappy}/>

                <SoundPad title={`I like delicious chicken.`} audio={this.deliciousChicken}/>
                <SoundPad title={`Oh my goodness`} audio={this.ohMyGoodness}/>
                <SoundPad title={`Shawn top ten`} audio={this.shawnTopTen}/>

                <SoundPad title={`Maj-or`} audio={this.majOr}/>
                <SoundPad title={`M-m-m-maj`} audio={this.mmmMaj}/>

                <SoundPad title={`Oh, I'm sorry.`} audio={this.imSorry}/>
                <SoundPad title={`You're hurting me.`} audio={this.hurtingMe}/>

                <SoundPad title={`Guy who is just shady`} audio={this.guyWhoIsJustShady}/>
                <SoundPad title={`Thanks for nothing, Shaq`} audio={this.thanksForNothingShaq}/>
                <SoundPad title={`People buy replica belts`} audio={this.replicaBelts}/>

                <SoundPad title={`The Majesty`} audio={this.theMajesty}/>
                <SoundPad title={`M-m-m-mail`} audio={this.mmmMail}/>
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
                start: 4.485,
                length: 1.765,
            },
            soHappy: {
                id: 'soHappy',
                title: `I was so happy.`,
                start: 9.421,
                length: 2.053,
            },
            imSorry: {
                id: 'imSorry',
                title: `Oh, I'm sorry.`,
                start: 14.326,
                length: 1.504,
            },
            hurtingMe: {
                id: 'hurtingMe',
                title: `You're hurting me.`,
                start: 19.144,
                length: 1.791,
            },
            deliciousChicken: {
                id: 'deliciousChicken',
                title: `I like delicious chicken.`,
                start: 23.750,
                length: 1.520,
            },
            ohMyGoodness: {
                id: 'ohMyGoodness',
                title: `Oh my goodness.`,
                start: 28.353,
                length: 1.595,
            },
            shawnTopTen: {
                id: 'shawnTopTen',
                title: `I don't know if I have Shawn top ten.`,
                start: 32.882,
                length: 1.552,
            },
            itsProfessionalWrestling: {
                id: 'itsProfessionalWrestling',
                title: `It's professional wrestling.`,
                start: 36.983,
                length: 1.945,
            },
            guyWhoIsJustShady: {
                id: 'guyWhoIsJustShady',
                title: `He can't get past a guy who's just shady`,
                start: 41.835,
                length: 2.149,
            },
            thanksForNothingShaq: {
                id: 'thanksForNothingShaq',
                title: 'Thanks for nothing, Shaq.',
                start: 46.823,
                length: 2.108,
            },
            replicaBelts: {
                id: 'replicaBelts',
                title: 'People buy replica belts all the time.',
                start: 51.778,
                length: 2.789,
            },
            majOr: {
                id: 'majOr',
                title: 'Maj-or',
                start: 57.879,
                length: 0.845,
            },
            mmmMaj: {
                id: 'mmmMaj',
                title: 'M-m-m-maj',
                start: 61.838,
                length: 1.261,
            },
            theMajesty: {
                id: 'theMajesty',
                title: 'The Majesty',
                start: 66.485,
                length: 1.463,
            },
            mmmMail: {
                id: 'mmmMail',
                title: 'M-m-m-mail',
                start: 71.025,
                length: 2.317,
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
