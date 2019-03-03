// tslint:disable
// External Dependencies
import * as React from 'react';
import { isUndefined } from 'util';

// Internal Dependencies
import './App.css';
import './components/SoundPad/style.css';

// Images
import cheapheatLogo from './assets/images/cheap-heat-logo.png';

// Components
import AppleSoundBoard from './components/AppleSoundBoard';
import SoundBoard from './components/Soundboard';

// State
import * as LocalStorage from './store/localStorage';

// Helpers
import { THEME_STATE_KEY, THEME_DARK, OS_STATE_KEY } from './constants/constants';
import { allAudioConfig, soundboardConfig } from './boards/cheapHeat';
import { setStateAsync } from './helpers/promise';

interface ComponentState {
    theme: string
    appleUser: boolean
    config: any
    category: string
}

const initialState: ComponentState = {
    theme: THEME_DARK,
    appleUser: false,
    config: null,
    category: '',
}

type Props = any
type State = ComponentState

class App extends React.Component<Props, State> {
    private allAudio = allAudioConfig;
    private soundboardConfig = soundboardConfig();
    
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
            config: this.soundboardConfig
        }
    }

    //------------------------------
    // Event Handlers
    //------------------------------

    private toggleOS = async () => {
        // Save the option to local storage
        LocalStorage.saveStateForKey(!this.state.appleUser, OS_STATE_KEY)
        setStateAsync(this, { appleUser: !this.state.appleUser })
    }

    private toggleTheme = async () => {
        const newTheme = (this.state.theme === THEME_DARK) ? '' : THEME_DARK

        // Save the theme to local storage
        LocalStorage.saveStateForKey(newTheme, THEME_STATE_KEY)
        setStateAsync(this, { theme: newTheme })
    }

    private selectCategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value
        await setStateAsync(this, { category: newCategory })

        if (newCategory === 'All') {
            await setStateAsync(this, { config: this.soundboardConfig })
            return
        }

        const soundboardKeys = Object.keys(this.soundboardConfig)
        const newConfig = {}
        for (const key of soundboardKeys) {
            const data = this.soundboardConfig[key]
            const dataHasCategory = !isUndefined(data.categories.find((category) => category === this.state.category))
            if (dataHasCategory) {
                newConfig[data.id] = data
            }
        }

        await setStateAsync(this, { config: newConfig })
    }

    //------------------------------
    // Content Builders
    //------------------------------

    private buildHeader = () => {
        return (
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
        )
    }

    private buildCategorySelect = () => {
        let categories = ['All']
        const soundboardKeys = Object.keys(this.soundboardConfig)
        for (const key of soundboardKeys) {
            const data = this.soundboardConfig[key]
            for (const category of data.categories) {
                if (isUndefined(categories.find((c) => c === category))) {
                    categories.push(category)
                }
            }
        }

        const selectOptions = categories.map((category, idx) => {
            return (
                <option
                    key={`category_${idx}`}
                    value={category}
                >
                    {category}
                </option>
            )
        })

        return (
            <div className='my-3'>
                <span className='category-label mr-2'>Category:</span>
                <select onChange={this.selectCategory}>
                    {selectOptions}
                </select>
            </div>
        )
    }

    private buildContent = () => {
        return (this.state.appleUser) ?
            (
                <AppleSoundBoard
                    audio={this.allAudio}
                    soundboardConfig={this.state.config}
                />
            ) :
            (
                <SoundBoard soundboardConfig={this.state.config} />
            )
    }

    private buildFooter = () => {
        return (
            <footer className='footer d-flex flex-row justify-content-end'>
                {this.buildThemeToggle()}
            </footer>
        )
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

    public render() {        
        return (
            <div className="App" data-theme={this.state.theme}>
                {this.buildHeader()}


                <div className="container mt-3">
                    <div className="content-container">
                        {this.buildCategorySelect()}
                        {this.buildContent()}
                    </div>
                </div>

                {this.buildFooter()}
            </div>
        );
    }
}

export default App;
