export default {
	state() {
		return {
			manholeCoversImages: [
				{
					id: '001',
					src: '/img/covers/IMG_0570.jpeg',
				},
				{
					id: '002',
					src: '/img/covers/IMG_0654.jpeg',
				},
				{
					id: '003',
					src: '/img/covers/IMG_0663.jpeg',
				},
				{
					id: '004',
					src: '/img/covers/IMG_2329.jpeg',
				},
				{
					id: '005',
					src: '/img/covers/IMG_2332.jpeg',
				},
				{
					id: '006',
					src: '/img/covers/IMG_2333.jpeg',
				},
				{
					id: '007',
					src: '/img/covers/IMG_2432.jpeg',
				},
				{
					id: '008',
					src: '/img/covers/IMG_3277.jpeg',
				},
				{
					id: '009',
					src: '/img/covers/IMG_3983.jpeg',
				},
				{
					id: '010',
					src: '/img/covers/IMG_4252.jpeg',
				},
				// Add more images here

				// {
				// 	id: '000',
				// 	title: 'Untitled',
				// 	src: '/img/covers/000.jpeg',
				// },
			],
		};
	},
	// mutations: {},
	// actions: {},
	// getters: {}
	getters: {
		manholeCoversDataStore(state) {
			// this.$store.getters.ekiStampsDataStore
			return state.manholeCoversImages;
		},
	},
};
