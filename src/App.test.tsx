// External Dependencies
import { mount, shallow } from 'enzyme'
import enzymeToJSON from 'enzyme-to-json'
import 'jest-styled-components'
import React from 'react'

// Internal Dependencies
import App from './App'

describe('App', () => {
    it('renders without crashing', () => {
        const wrapper = mount(<App />)
        expect(wrapper).toBeDefined()
    })

    it('should match the snapshot', () => {
        const wrapper = shallow(<App />)
        expect(enzymeToJSON(wrapper)).toMatchSnapshot()
    })
})
