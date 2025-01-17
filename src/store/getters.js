export default {
	toggleAuth(state) {
		return state.isLoggedIn;
	},
	userIsAuthenticated(state) {
		return state.isUserLoggedIn;
	},
};