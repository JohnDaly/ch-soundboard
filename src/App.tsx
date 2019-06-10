// External Dependencies
import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { isUndefined } from 'util'

// Internal Dependencies

// Images
import cheapheatLogo from './assets/images/cheap-heat-logo.png'

// Components
import { Footer } from './components/Shared/Footer'
import SoundBoard from './components/SoundBoard'
import { ThemeToggle } from './components/ThemeToggle'

// State
import * as LocalStorage from './store/localStorage'

// Helpers
import { allAudioSrc, AudioSpriteData, soundboardConfig } from './boards/cheapHeat'
import { THEME_DARK, THEME_STATE_KEY } from './constants/constants'
import { setStateAsync } from './helpers/promise'
import { darkTheme, lightTheme } from './helpers/theme'

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
        const { theme } = this.state
        const newTheme = (theme === THEME_DARK) ? '' : THEME_DARK

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
            <CategorySelectContainer>
                <CategoryLabel label={'Category:'} />
                <select onChange={this.selectCategory}>
                    {selectOptions}
                </select>
            </CategorySelectContainer>
        )
    }

    render() {
        const { theme, config } = this.state   
        const isDarkTheme = theme === THEME_DARK
        
        return (
            <ThemeProvider theme={(isDarkTheme) ? darkTheme : lightTheme}>
                <AppWrapper>
                    <AppHeader>
                        <HeaderLogo src={cheapheatLogo} />
                    </AppHeader>

                    <ContentContainer>
                        {this.buildCategorySelect()}
                        <SoundBoard audioSrc={this.allAudioSrc} soundboardConfig={config} />
                    </ContentContainer>

                    <Footer>
                        <ThemeToggle
                            isDarkTheme={isDarkTheme}
                            onClick={this.toggleTheme}
                        />
                    </Footer>
                </AppWrapper>
            </ThemeProvider>
        )
    }
}

const AppWrapper = styled.div`
    min-height: 100%;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.color};
    text-align: center;
`
AppWrapper.displayName = 'AppWrapper'

const AppHeader = styled.header`
    background-color: #1c1d1f;
    height: 160px;
    padding: 20px;
    color: white;
`
AppHeader.displayName = 'AppHeader'

const HeaderLogo = styled.img`
    height: 110px;
`
HeaderLogo.displayName = 'HeaderLogo'

const ContentContainer = styled.div`
    max-width: 660px;
    margin-left: auto;
    margin-right: auto;
`
ContentContainer.displayName = 'ContentContainer'

const CategorySelectContainer = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`
CategorySelectContainer.displayName = 'CategorySelectContainer'

const CategoryLabel = styled((props: { label: string, className?: string }) => (
    <span className={props.className}>{props.label}</span>
))`
    font-size: 12px;
    margin-right: 0.5rem;
`
CategoryLabel.displayName = 'CategoryLabel'

export default App
