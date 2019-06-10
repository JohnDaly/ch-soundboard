// External Dependencies
import { mount, shallow } from 'enzyme'
import enzymeToJSON from 'enzyme-to-json'
import 'jest-styled-components'
import React from 'react'

// Internal Dependencies
import DimmedLoader from './index'

describe('DimmedLoader', () => {
    it('renders without crashing', () => {
        const wrapper = mount(
            <DimmedLoader isLoading={true}>
                <h1>Hello, world!</h1>
            </DimmedLoader>
        )
        expect(wrapper).toBeDefined()
    })

    it('should match the snapshot (isLoading = true)', () => {
        const shallowWrapper = shallow(
            <DimmedLoader isLoading={true}>
                <h1>Hello, world!</h1>
            </DimmedLoader>
        )
        expect(enzymeToJSON(shallowWrapper)).toMatchSnapshot()
    })

    it('should match the snapshot (isLoading = false)', () => {
        const shallowWrapper = shallow(
            <DimmedLoader isLoading={false}>
                <h1>Hello, world!</h1>
            </DimmedLoader>
        )
        expect(enzymeToJSON(shallowWrapper)).toMatchSnapshot()
    })
})