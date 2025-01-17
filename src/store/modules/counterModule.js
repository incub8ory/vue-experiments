// store/modules/counterModule.js

export default {
	// Module to move counter store from root and outsource
	// state() {
	// return {};
	// },
	// mutations: {},
	// actions: {},
	// getters: {}

	namespaced: true,
	state() {
		return {
			counter: 0,
		};
	},
	mutations: {
		increment(state) {
			state.counter++;
		},
		increaseBySomeValue(state, payload) {
			state.counter = state.counter + payload.value;
		},
	},
	actions: {
		// it's common practice to use the same name for mutation and respective action
		increment(context) {
			// setTimeout used to demonstrate async handling
			setTimeout(function () {
				// you can pass a second argument as a payload
				context.commit('increment');
			}, 2000);
		},

		increaseBySomeValue(context, payload) {
			context.commit('increaseBySomeValue', payload);
		},
	},
	getters: {
		increaseByOne(state) {
			console.log('increaseByOne getter');
			return state.counter;
		},

		// getter methods take two args: state, other getters (optional)
		doubleBonus(state) {
			return state.counter * 2;
		},
		// bonus value doesn't exceed max bonus of 60
		// normalizedBonus(state, getters) {
		normalizedBonus(_, getters) {
			// const doubleBonus = state.counter * 2;
			const doubleBonus = getters.doubleBonus;

			if (doubleBonus < 0) {
				return 0;
			}
			if (doubleBonus > 60) {
				return 60;
			}
			return doubleBonus;
		},
	},
};
