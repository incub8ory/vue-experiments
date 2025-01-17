export default {
	toggleAuth(state) {
		state.isLoggedIn = !state.isLoggedIn;
	},
	setAuth(state, payload) {
		state.isUserLoggedIn = payload.isAuth;
	},
};