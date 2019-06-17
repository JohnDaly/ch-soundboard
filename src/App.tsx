// External Dependencies
import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { isUndefined } from 'util'

// Internal Dependencies

// Images
import cheapheatLogo from 'src/assets/images/cheap-heat-logo.png'

// Containers
import SoundBoard from 'src/containers/SoundBoard'

// Components
import { CategorySelect } from 'src/components/CategorySelect'
import { Footer } from 'src/components/Footer'
import { ThemeToggle } from 'src/components/ThemeToggle'

// State
import * as LocalStorage from 'src/store/localStorage'

// Helpers
import { allAudioSrc, AudioSpriteData, soundboardConfig } from 'src/boards/cheapHeat'
import { ALL_CATEGORIES, THEME_DARK, THEME_STATE_KEY } from 'src/constants/constants'
import { setStateAsync } from 'src/helpers/promise'
import { darkTheme, lightTheme } from 'src/helpers/theme'

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

        if (newCategory === ALL_CATEGORIES) {
            await setStateAsync(this, { config: this.soundboardConfig })
            return
        }

        const soundboardKeys = Object.keys(this.soundboardConfig)
        const newConfig = {}
        for (const key of soundboardKeys) {
            const audioSpriteData = this.soundboardConfig[key]
            const spriteCategories = audioSpriteData.categories || []
            const dataHasCategory = !isUndefined(spriteCategories.find((category) => (
                category === this.state.category
            )))
            if (dataHasCategory) {
                newConfig[audioSpriteData.id] = audioSpriteData
            }
        }

        await setStateAsync(this, { config: newConfig })
    }

    // ------------------------------
    // Content Builders
    // ------------------------------

    render() {
        const { theme, config, category } = this.state   
        const isDarkTheme = theme === THEME_DARK
        
        return (
            <ThemeProvider theme={(isDarkTheme) ? darkTheme : lightTheme}>
                <AppWrapper>
                    <AppHeader>
                        <HeaderLogo src={cheapheatLogo} />
                    </AppHeader>

                    <ContentContainer>
                        <CategorySelectContainer
                            config={this.soundboardConfig}
                            onSelectCategory={this.selectCategory}
                            selectedCategory={category}
                        />
                        
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

const CategorySelectContainer = styled(CategorySelect)`
    margin-top: 1rem;
    margin-bottom: 1rem;
`
CategorySelectContainer.displayName = 'CategorySelectContainer'

export default App
