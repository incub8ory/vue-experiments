import { createStore } from 'vuex';
import counterModule from './modules/counterModule';
import teaModule from './modules/teaModule';

import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

const store = createStore({
	modules: {
		counterCalculations: counterModule,
		teaModule: teaModule,
	},
	state() {
		return {
			isLoggedIn: false,
			isUserLoggedIn: false,
		};
	},

	mutations: rootMutations,

	actions: rootActions,

	getters: rootGetters,

});

export default store;