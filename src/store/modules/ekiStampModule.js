export default {
	state() {
		return {
			ekiStampImages: [
				// {
				// 	id: '001',
				// 	title: 'Ichiran Ramen',
				// 	src: '/img/stamp/001.jpeg',
				// },
				// {
				// 	id: '002',
				// 	title: 'JR Fruit Park',
				// 	src: '/img/stamp/002.jpeg',
				// },
				// Add more images here
				{
					id: '001',
					title: 'JR East Travel Center',
					src: '/img/stamp/IMG_4941.jpeg',
				},
				{
					id: '002',
					title: 'Tokyo Station',
					src: '/img/stamp/IMG_4979.jpeg',
				},
				{
					id: '003',
					title: 'Hakata Station',
					src: '/img/stamp/IMG_4989.jpeg',
				},
				{
					id: '004',
					title: 'Nishitetsu Fukuoka (Tenjin) Station',
					src: '/img/stamp/IMG_4994.jpeg',
				},
				{
					id: '005',
					title: 'Nishitetsu Fukuoka (Tenjin) Station',
					src: '/img/stamp/IMG_4995.jpeg',
				},
				{
					id: '006',
					title: 'Kokura Station',
					src: '/img/stamp/IMG_5025.jpeg',
				},
				{
					id: '007',
					title: 'Kitakyushu Monorail',
					src: '/img/stamp/IMG_5035.jpeg',
				},
				{
					id: '008',
					title: 'Kokura Station',
					src: '/img/stamp/IMG_5037.jpeg',
				},
				{
					id: '009',
					title: 'Kokura Station',
					src: '/img/stamp/IMG_5039.jpeg',
				},
				{
					id: '010',
					title: 'Mojiko Station',
					src: '/img/stamp/IMG_5068.jpeg',
				},
				{
					id: '011-a',
					title: 'Dazaifu Station bonus stamp',
					src: '/img/stamp/IMG_5150.jpeg',
				},
				{
					id: '011-b',
					title: 'Dazaifu Station bonus stamp',
					src: '/img/stamp/IMG_5151.jpeg',
				},
				{
					id: '011-c',
					title: 'Dazaifu Station bonus stamp',
					src: '/img/stamp/IMG_5152.jpeg',
				},
				{
					id: '011-d',
					title: 'Dazaifu Station bonus stamp',
					src: '/img/stamp/IMG_5153.jpeg',
				},
				{
					id: '011-e',
					title: 'Dazaifu Station bonus stamp',
					src: '/img/stamp/IMG_5154.jpeg',
				},
				{
					id: '012',
					title: 'Dazaifu Station',
					src: '/img/stamp/IMG_5155.jpeg',
				},
				{
					id: '013',
					title: 'Dazaifu Station',
					src: '/img/stamp/IMG_5156.jpeg',
				},
				{
					id: '014',
					title: 'Dazaifu Station',
					src: '/img/stamp/IMG_5157.jpeg',
				},

				// {
				// 	id: '000',
				// 	title: 'Untitled',
				// 	src: '/img/stamp/000.jpeg',
				// },
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
