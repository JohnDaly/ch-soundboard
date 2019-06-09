import React from 'react'

// Allows you to call setState as a Promise, rather than using callbacks
export const setStateAsync = <P, S, K extends keyof S>(that: React.Component<P, S>, newState: Pick<S, K> | ((prevState: S, prevProps: P) => S)) => {
	return new Promise((resolve) => {
		that.setState(newState, () => {
			resolve()
		})
	})
}