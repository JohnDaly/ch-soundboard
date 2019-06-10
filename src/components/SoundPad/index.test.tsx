// External Dependencies
import { mount } from 'enzyme'
import enzymeToJSON from 'enzyme-to-json'
import 'jest-styled-components'
import React from 'react'

// Internal Dependencies
import { SoundPad } from './index'

describe('SoundPad', () => {
    it('renders without crashing', () => {
        const wrapper = mount(
            <SoundPad
                title={'Test Sound'}
                trackID={'testSoundID'}
                onClick={jest.fn()}
            />
        )
        expect(wrapper).toBeDefined()
    })

    it('should pass the trackID as an argument in its onClick prop', () => {
        const mockedOnClick = jest.fn()
        const wrapper = mount(
            <SoundPad
                title={'Test Sound'}
                trackID={'testSoundID'}
                onClick={mockedOnClick}
            />
        )

        const padCard = wrapper.find('SoundPadCard')
        expect(padCard).toBeDefined()
        padCard.simulate('click')
        expect(mockedOnClick).toHaveBeenCalled()
        expect(mockedOnClick).toHaveBeenCalledWith('testSoundID')
    })

    it('should match the snapshot', () => {
        const wrapper = mount(
            <SoundPad
                title={'Test Sound'}
                trackID={'testSoundID'}
                onClick={jest.fn()}
            />
        )
        expect(enzymeToJSON(wrapper)).toMatchSnapshot()
    })
})
