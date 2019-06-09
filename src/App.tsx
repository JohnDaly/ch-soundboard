// External Dependencies
import * as React from 'react'
import { isUndefined } from 'util'

// Internal Dependencies
import './App.css'

// Images
import cheapheatLogo from './assets/images/cheap-heat-logo.png'

// Components
import SoundBoard from './components/SoundBoard'

// State
import * as LocalStorage from './store/localStorage'

// Helpers
import { allAudioSrc, AudioSpriteData, soundboardConfig } from './boards/cheapHeat'
import { Footer } from './components/Shared/Footer'
import { THEME_DARK, THEME_STATE_KEY } from './constants/constants'
import { setStateAsync } from './helpers/promise'

const initialState = {
    theme: THEME_DARK as string,
    config: {} as { [key: string]: AudioSpriteData },
    category: '' as string,
}

type Props = any
type State = typeof initialState

class App extends React.Component<Props, State> {
    private allAudioSrc = allAudioSrc
    private soundboardConfig = soundboardConfig()
    
    constructor(props: Props) {
        super(props)

        // Get saved theme state from local storage
        const theme: string = LocalStorage.loadStateForKey(THEME_STATE_KEY) || ''
        this.state = {
            ...initialState,
            theme,
            config: this.soundboardConfig
        }
    }

    // ------------------------------
    // Event Handlers
    // ------------------------------

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

    // ------------------------------
    // Content Builders
    // ------------------------------

    private buildHeader = () => {
        return (
            <header className='App-header'>
                <div>
                    <img src={cheapheatLogo} className='header-logo'/>
                </div>
            </header>
        )
    }

    private buildCategorySelect = () => {
        const categories = ['All']
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
                <option key={`category_${idx}`} value={category}>
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
        return (
            <SoundBoard
                audioSrc={this.allAudioSrc}
                soundboardConfig={this.state.config}
            />
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
                <i className={`${buttonIcon}`} />
            </button>
        )
    }

    render() {        
        return (
            <div className='App' data-theme={this.state.theme}>
                {this.buildHeader()}


                <div className='container mt-3'>
                    <div className='content-container'>
                        {this.buildCategorySelect()}
                        {this.buildContent()}
                    </div>
                </div>

                <Footer>
                    {this.buildThemeToggle()}
                </Footer>
            </div>
        )
    }
}

export default App
