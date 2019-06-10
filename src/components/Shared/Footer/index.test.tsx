// External Dependencies
import { mount } from 'enzyme'
import enzymeToJSON from 'enzyme-to-json'
import 'jest-styled-components'
import React from 'react'

// Internal Dependencies
import { Footer } from './index'

describe('Footer', () => {
    it('should match the snapshot', () => {
        const wrapper = mount(
            <Footer>
                <div>Footer Content</div>
            </Footer>
        )
        expect(enzymeToJSON(wrapper)).toMatchSnapshot()
    })
})
