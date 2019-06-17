// External Dependencies
import { mount } from 'enzyme'
import enzymeToJSON from 'enzyme-to-json'
import 'jest-styled-components'
import React from 'react'

// Internal Dependencies
import { CategorySelect } from './index'

describe('CategorySelect', () => {
    it('should match the snapshot', () => {
        const mockedOnSelect = jest.fn()
        const wrapper = mount(
            <CategorySelect config={{}} onSelectCategory={mockedOnSelect} />
        )
        expect(enzymeToJSON(wrapper)).toMatchSnapshot()
    })
})
