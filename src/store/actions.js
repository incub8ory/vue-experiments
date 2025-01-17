export default {
	toggleAuth(context) {
		context.commit('toggleAuth');
	},
	logIn(context) {
		context.commit('setAuth', { isAuth: true });
	},
	logOut(context) {
		context.commit('setAuth', { isAuth: false });
	},
};