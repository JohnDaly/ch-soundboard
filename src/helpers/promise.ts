// Allows you to call setState as a Promise, rather than using callbacks
export const setStateAsync = (that: any, newState: any) => {
	return new Promise((resolve) => {
		that.setState(newState, () => {
			resolve()
		})
	})
}