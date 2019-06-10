// External Dependencies
import { mount } from 'enzyme'
import enzymeToJSON from 'enzyme-to-json'
import 'jest-styled-components'
import React from 'react'

// Internal Dependencies
import { ThemeToggle } from './index'

describe('ThemeToggle', () => {
    it('renders without crashing', () => {
        const wrapper = mount(<ThemeToggle isDarkTheme={false} onClick={jest.fn()} />)
        expect(wrapper).toBeDefined()
    })

    it('should match the snapshot (Light Theme)', () => {
        const wrapper = mount(<ThemeToggle isDarkTheme={false} onClick={jest.fn()} />)
        expect(enzymeToJSON(wrapper)).toMatchSnapshot()
    })

    it('should match the snapshot (Dark Theme)', () => {
        const wrapper = mount(<ThemeToggle isDarkTheme={true} onClick={jest.fn()} />)
        expect(enzymeToJSON(wrapper)).toMatchSnapshot()
    })
})
