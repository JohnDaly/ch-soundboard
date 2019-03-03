// tslint:disable

// External Dependencies
import * as React from 'react'

// Internal Dependencies
import './style.css'

interface ComponentProps {
	isLoading: boolean
	component: any
}

type Props = ComponentProps

export default class DimmedLoader extends React.Component<Props> {
	constructor(props: Props) {
		super(props)
	}

	public render() {
		if (!this.props.isLoading) {
            return (
                <div className='dimmer h-100'>
                    <div className='loader'/>
                    <div className='dimmer-content'>
                        {this.props.component}
                    </div>
                </div>
            )
		}

		return (
			<div className='dimmer active h-100'>
				<div className='loader'/>
				<div className='dimmer-content'>
					{this.props.component}
				</div>
			</div>
		)
	}
}
