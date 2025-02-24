export default {
	state() {
		return {
			labExperiments: [
				{
					id: '01',
					routeName: '01',
					title: 'Shopping List',
					shortDescription: '',
				},
				{
					id: '02',
					routeName: '02',
					title: 'Tea Tasting',
					shortDescription: '',
				},
				{ id: '03', routeName: '03', title: 'VueX', shortDescription: '' },
				{ id: '04', routeName: '04', title: 'VueX*', shortDescription: '' },
				{
					id: '05',
					routeName: '05',
					title: 'Photo Locator',
					shortDescription: '',
				},
				// { id: '06.1', routeName: '06.1', linkText: 'Eki Stamp Collector',shortDescription: '' },
				{
					id: '06',
					routeName: '06',
					title: 'Eki Stamps',
					shortDescription: '',
				},
				{
					id: '07',
					routeName: '07',
					title: 'Manhole Covers',
					shortDescription: '',
				},
			],
		};
	},
	// mutations: {},
	// actions: {},
	// getters: {}
	getters: {
		experimentsDataStore(state) {
			// this.$store.getters.ekiStampsDataStore
			return state.labExperiments;
		},
	},
};
