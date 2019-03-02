/**
 * Saves the given state with the given key to local storage.
 */
export function saveStateForKey(state: any, key: string) {
	try {
		const serializedState = JSON.stringify(state)
		localStorage.setItem(key, serializedState)
	} catch (err) {
		// tslint:disable-next-line
		console.error('Error saving state for key: ', key, err)
	}
}

/**
 * Loads the state stored by the given key from local storage. Returns it.
 */
export function loadStateForKey(key: string) {
	try {
		// Retrieve the cached state from localStorage
        const serializedState = localStorage.getItem(key)
        if (!serializedState) {
            return null
        }
        const resolvedState = JSON.parse(serializedState)
		return resolvedState
	} catch (err) {
		// tslint:disable-next-line
		console.error('Error loading state for key: ', key, err)
	}
}

/**
 * Clears the state stored by the given key in local storage.
 */
export function removeStateForKey(key: string) {
	try {
		localStorage.removeItem(key)
	} catch (err) {
		// tslint:disable-next-line
		console.error('Error clearing state for key: ', key, err)
	}
}