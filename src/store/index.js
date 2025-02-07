import { createStore } from 'vuex';
import counterModule from './modules/counterModule';
import teaModule from './modules/teaModule';
import ekiStampModule from './modules/ekiStampModule';

import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

const store = createStore({
	modules: {
		counterCalculations: counterModule,
		teaModule: teaModule,
		ekiStampModule: ekiStampModule,
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