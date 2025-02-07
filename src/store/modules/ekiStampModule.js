export default {
	state() {
		return {
			baseURL: '/vue-experiments',
			ekiStampImages: [
				{
					id: '000',
					title: 'Momo Bao',
					src: '/img/stamp/000.jpeg',
				},
				{
					id: '001',
					title: 'Ichiran Ramen',
					src: '/img/stamp/001.jpeg',
				},
				{
					id: '002',
					title: 'JR Fruit Park',
					src: '/img/stamp/002.jpeg',
				},
				{
					id: '004',
					title: 'Street Food Park',
					src: '/img/stamp/004.jpeg',
				},
				// Add more images here
			],
		};
	},
	// mutations: {},
	// actions: {},
	// getters: {}
	getters: {
		ekiStampsDataStore(state) {
			// this.$store.getters.ekiStampsDataStore
			return state.ekiStampImages;
		},
	},
};