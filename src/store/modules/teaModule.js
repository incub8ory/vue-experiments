export default {
	// state() {
	// return {};
	// },
	// mutations: {},
	// actions: {},
	// getters: {}
	state() {
		return {
			teaData: [
				{
					id: '001',
					name: '012 Asatsuyu',
					seller: 'Senchado Tokyo',
					manufacturer: 'Senchado Tokyo',
					dateSampled: '2024-09-02',
					description:
						'A dark green, medium-steamed, shaded tea known as natural Gyokuro with a heavy umami and aroma that has a thick taste with a grain feel like a condensed soup.',
					notes: '',
					price: 1960,
					currency: '¥',
					weight: '30 grams',
					imageFiles: [
						{
							filename: '001-1.jpg',
							url: '/img/tea/001/001-1.jpg',
							alt: 'Asatsuyu',
						},
						{
							filename: '001-2.jpg',
							url: '/img/tea/001/001-2.jpg',
							alt: 'Asatsuyu',
						},
						{
							filename: '001-3.jpg',
							url: '/img/tea/001/001-3.jpg',
							alt: 'Asatsuyu',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 4 },
						{ label: 'Grain', value: 4 },
						{ label: 'Seaweed', value: 4 },
						{ label: 'Umami', value: 5 },
						{ label: 'Full-Bodied', value: 5 },
						{ label: 'Roasting', value: 1 },
						{ label: 'Bitterness', value: 2 },
						{ label: 'Fruit', value: 1 },
						{ label: 'Flower', value: 3 },
						{ label: 'Fragrance', value: 5 },
						{ label: 'Earthiness', value: 3 },
						{ label: 'Grassiness', value: 4 },
					],
				},
				{
					id: '002',
					name: '060 Yabukita Niyodogawa',
					seller: 'Senchado Tokyo',
					manufacturer: 'Senchado Tokyo',
					dateSampled: '2024-11-08',
					description:
						'A light-tasting tea with a milky quality that spreads across your mouth.',
					notes:
						'The steeped tea has a faint seaweed aroma with a slight, perfumey floral backnote. A mild balance of sweetness and savory umami with a gentle, salty finish.',
					price: 1698,
					currency: '¥',
					weight: '30 grams',
					imageFiles: [
						{
							filename: '002-1.jpg',
							url: '/img/tea/002/002-1.jpg',
							alt: '060 Yabukita Niyodogawa',
						},
						{
							filename: '002-2.jpg',
							url: '/img/tea/002/002-2.jpg',
							alt: '060 Yabukita Niyodogawa',
						},
						{
							filename: '002-3.jpg',
							url: '/img/tea/002/002-3.jpg',
							alt: '060 Yabukita Niyodogawa',
						},
						// {
						// 	filename: '002-4.png',
						// 	url: '/img/tea/002/002-4.png',
						// 	alt: '060 Yabukita Niyodogawa',
						// },
					],
					chartData: [
						{ label: 'Sweetness', value: 4 },
						{ label: 'Grain', value: 5 },
						{ label: 'Seaweed', value: 2 },
						{ label: 'Umami', value: 2 },
						{ label: 'Full-Bodied', value: 2 },
						{ label: 'Roasting', value: 2 },
						{ label: 'Bitterness', value: 2 },
						{ label: 'Fruit', value: 1 },
						{ label: 'Flower', value: 3 },
						{ label: 'Fragrance', value: 5 },
						{ label: 'Earthiness', value: 1 },
						{ label: 'Grassiness', value: 4 },
					],
				},
				{
					id: '003',
					name: 'Satsukiyo Sencha',
					seller: 'Haraguchien Fusuan',
					manufacturer: 'Haraguchien Fusuan',
					dateSampled: '2024-09-02',
					description:
						'Tea masters created a custom-blend of teas from various parts of Kyushu to bring out a deeper taste. Enjoy the green light blue color and rich taste.',
					notes:
						'This is the first tea I sampled from Haraguchi Fusuan (Fukuoka). It has a deep, vegetal flavor reminiscent of edamame with faint notes of vanilla, creamy finish. Still has good flavor when re-steeped a second or third time.',
					price: 1080,
					currency: '¥',
					weight: '80 grams',
					imageFiles: [
						{
							filename: '003-1.jpg',
							url: '/img/tea/003/003-1.jpg',
							alt: 'Satsukiyo Sencha',
						},
						{
							filename: '003-2.jpg',
							url: '/img/tea/003/003-2.jpg',
							alt: 'Satsukiyo Sencha',
						},
						{
							filename: '003-3.jpg',
							url: '/img/tea/003/003-3.jpg',
							alt: 'Satsukiyo Sencha',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 4 },
						{ label: 'Grain', value: 3 },
						{ label: 'Seaweed', value: 3 },
						{ label: 'Umami', value: 5 },
						{ label: 'Full-Bodied', value: 5 },
						{ label: 'Roasting', value: 2 },
						{ label: 'Bitterness', value: 2 },
						{ label: 'Fruit', value: 1 },
						{ label: 'Flower', value: 3 },
						{ label: 'Fragrance', value: 4 },
						{ label: 'Earthiness', value: 2 },
						{ label: 'Grassiness', value: 5 },
					],
				},
				{
					id: '004',
					name: 'Yame Sencha AY-10A',
					seller: 'Haraguchien Fusuan',
					manufacturer: 'Haraguchien Fusuan',
					dateSampled: '2024-10-02',
					description:
						'Fukuoka Yame is blessed with water and air and is a production area suitable for growing tea. The high production technology, which is one of the leading gyokuro production areas in Japan, is also used for sencha. This tea is made with a little shade and has a refreshing taste compared to Yame Chahoju.',
					notes:
						'Has a more pronounced seaweed umami with a mineral finish and vegetal notes.',
					price: 1080,
					currency: '¥',
					weight: '90 grams',
					imageFiles: [
						{
							filename: '004-1.jpg',
							url: '/img/tea/004/004-1.jpg',
							alt: 'Yame Sencha AY-10A',
						},
						{
							filename: '004-2.jpg',
							url: '/img/tea/004/004-2.jpg',
							alt: 'Yame Sencha AY-10A',
						},
						{
							filename: '004-3.jpg',
							url: '/img/tea/004/004-3.jpg',
							alt: 'Yame Sencha AY-10A',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 2 },
						{ label: 'Grain', value: 3 },
						{ label: 'Seaweed', value: 5 },
						{ label: 'Umami', value: 5 },
						{ label: 'Full-Bodied', value: 4 },
						{ label: 'Roasting', value: 2 },
						{ label: 'Bitterness', value: 2 },
						{ label: 'Fruit', value: 1 },
						{ label: 'Flower', value: 1 },
						{ label: 'Fragrance', value: 3 },
						{ label: 'Earthiness', value: 2 },
						{ label: 'Grassiness', value: 4 },
					],
				},
				{
					id: '005',
					name: 'Gyokuro Saemidori',
					seller: 'Tekoe',
					manufacturer: 'Tekoe, Switzerland',
					dateSampled: '2024-09-02',
					description:
						'A magnificent Japanese Grand Cru, full of subtlety and delicacy. The aromatic notes revealed are very fresh and vegetal and this Gyokuro offers a bold umami and a light sweetness. This cultivar Saemidori leads us to taste several successive infusions, which will reveal magnificent iodized notes all in delicacy.',
					notes:
						'Tight, long, needle-rolled tea leaves with a flavor profile similar to Asatsuyu あさつゆ — verdant, well-balanced creaminess and salinity with a very faint grassy, seaweed aroma. Although just a tiny amount yields robust flavor, it has subtler flavor on second (and third) infusions.',
					price: 42.0,
					currency: '$',
					weight: '80 grams',
					imageFiles: [
						{
							filename: '005-1.jpg',
							url: '/img/tea/005/005-1.jpg',
							alt: 'Gyokuro Saemidori',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 3 },
						{ label: 'Grain', value: 2 },
						{ label: 'Seaweed', value: 4 },
						{ label: 'Umami', value: 5 },
						{ label: 'Full-Bodied', value: 5 },
						{ label: 'Roasting', value: 2 },
						{ label: 'Bitterness', value: 2 },
						{ label: 'Fruit', value: 2 },
						{ label: 'Flower', value: 1 },
						{ label: 'Fragrance', value: 4 },
						{ label: 'Earthiness', value: 3 },
						{ label: 'Grassiness', value: 4 },
					],
				},
				{
					id: '006',
					name: 'Saemidori Kabuse',
					seller: 'Kimikura',
					manufacturer: 'Maruyama Tea',
					dateSampled: '2024-11-02',
					description:
						'Has rich, umami flavor. The tea leaves are covered for several days to bring out Umami (richness). The leaves are steamed twice as long as regular Sencha. By steaming longer, the length of the tea leaf is short and crisp. Therefore, steeping time is very short to maintain the rich full flavor. Produces a vivid green-colored tea with a refreshing aftertaste',
					notes:
						'Has a dominant, seaweed-forward umami taste, subtle notes of grass with a mellow salty finish.',
					price: 17.9,
					currency: '$',
					weight: '70 grams',
					imageFiles: [
						{
							filename: '006-1.jpg',
							url: '/img/tea/006/006-1.jpg',
							alt: 'Saemidori Kabuse',
						},
						{
							filename: '006-2.jpg',
							url: '/img/tea/006/006-2.jpg',
							alt: 'Saemidori Kabuse',
						},
						{
							filename: '006-3.jpg',
							url: '/img/tea/006/006-3.jpg',
							alt: 'Saemidori Kabuse',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 3 },
						{ label: 'Grain', value: 2 },
						{ label: 'Seaweed', value: 5 },
						{ label: 'Umami', value: 5 },
						{ label: 'Full-Bodied', value: 5 },
						{ label: 'Roasting', value: 1 },
						{ label: 'Bitterness', value: 2 },
						{ label: 'Fruit', value: 1 },
						{ label: 'Flower', value: 1 },
						{ label: 'Fragrance', value: 3 },
						{ label: 'Earthiness', value: 2 },
						{ label: 'Grassiness', value: 3 },
					],
				},
				{
					id: '007',
					name: '038 Yamano Ibuki',
					seller: 'Senchado Tokyo',
					manufacturer: 'Senchado Tokyo',
					dateSampled: '2024-12-02',
					description:
						'“Breath of the Mountain” single origin variety. Has a beautiful light blue color with sweetness and depth.',
					notes:
						'Taste has notes of gently-roasted grains with a moderately sweet aroma balanced by a full-bodied umami that finishes with a hint of salinity.',
					price: 1829,
					currency: '¥',
					weight: '30 grams',
					imageFiles: [
						{
							filename: '007-1.jpg',
							url: '/img/tea/007/007-1.jpg',
							alt: '038 Yamano Ibuki',
						},
						{
							filename: '007-2.jpg',
							url: '/img/tea/007/007-2.jpg',
							alt: 'Yamano Ibuki',
						},
						{
							filename: '007-3.jpg',
							url: '/img/tea/007/007-3.jpg',
							alt: 'Yamano Ibuki',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 5 },
						{ label: 'Grain', value: 5 },
						{ label: 'Seaweed', value: 3 },
						{ label: 'Umami', value: 5 },
						{ label: 'Full-Bodied', value: 5 },
						{ label: 'Roasting', value: 4 },
						{ label: 'Bitterness', value: 1 },
						{ label: 'Fruit', value: 1 },
						{ label: 'Flower', value: 4 },
						{ label: 'Fragrance', value: 5 },
						{ label: 'Earthiness', value: 4 },
						{ label: 'Grassiness', value: 1 },
					],
				},
				{
					id: '008',
					name: '044 Uji Midori',
					seller: 'Senchado Tokyo',
					manufacturer: 'Senchado Tokyo',
					dateSampled: '2025-01-12', // yyyy-mm-dd
					description:
						'Described as having a “noble fragrance that is woven in intricate layers” with a “delicious taste” that is “clean and elegant”.',
					notes:
						'Has a pronounced, sweet floral perfume. The first infusion yields a complex swirl of flavors that remain individually distinct starting with a floral aroma, followed by a flood of umami, and finishing with bright notes of seaweed. Subsequent infusions bring out its mineral qualities.',
					price: 1829,
					currency: '¥',
					weight: '30 grams',
					imageFiles: [
						{
							filename: '008-1.jpg',
							url: '/img/tea/008/008-1.jpg',
							alt: '044 Uji Midori',
						},
						{
							filename: '008-2.jpg',
							url: '/img/tea/008/008-2.jpg',
							alt: '044 Uji Midori',
						},
						{
							filename: '008-3.jpg',
							url: '/img/tea/008/008-3.jpg',
							alt: '044 Uji Midori',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 4 },
						{ label: 'Grain', value: 4 },
						{ label: 'Seaweed', value: 4 },
						{ label: 'Umami', value: 5 },
						{ label: 'Full-Bodied', value: 1 },
						{ label: 'Roasting', value: 1 },
						{ label: 'Bitterness', value: 1 },
						{ label: 'Fruit', value: 3 },
						{ label: 'Flower', value: 5 },
						{ label: 'Fragrance', value: 5 },
						{ label: 'Earthiness', value: 1 },
						{ label: 'Grassiness', value: 4 },
					],
				},

				{
					id: '009',
					name: 'Strawberry Tea',
					seller: 'Senchado Tokyo',
					manufacturer: 'Senchado Tokyo',
					dateSampled: '', // yyyy-mm-dd
					description:
						'Fruity blended tea with a faint fragrance of dried strawberry fruit that matches Yabukita.',
					notes: '',
					price: 1829,
					currency: '¥',
					weight: '30 grams',
					imageFiles: [
						{
							filename: '009-1.jpg',
							url: '/img/tea/009/009-1.jpg',
							alt: 'Strawberry Tea',
						},
						{
							filename: '009-2.jpg',
							url: '/img/tea/009/009-2.jpg',
							alt: 'Strawberry Tea',
						},
						{
							filename: '009-3.jpg',
							url: '/img/tea/009/009-3.jpg',
							alt: 'Strawberry Tea',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 0 },
						{ label: 'Grain', value: 0 },
						{ label: 'Seaweed', value: 0 },
						{ label: 'Umami', value: 0 },
						{ label: 'Full-Bodied', value: 0 },
						{ label: 'Roasting', value: 0 },
						{ label: 'Bitterness', value: 0 },
						{ label: 'Fruit', value: 0 },
						{ label: 'Flower', value: 0 },
						{ label: 'Fragrance', value: 0 },
						{ label: 'Earthiness', value: 0 },
						{ label: 'Grassiness', value: 0 },
					],
				},

				{
					id: '010',
					name: 'Cherry Leaf (Sakura) Sencha',
					seller: 'Senchado Tokyo',
					manufacturer: 'Senchado Tokyo',
					dateSampled: '2024-03-28', // 
					description:
						'“Sakura no Sencha” is a tea made without the use of flavorings. By adding cherry blossom leaves together in the tea leaf manufacturing process (kneading process), the real cherry blossom scent rises.',
					notes:
						'Beautiful balance of ripe, fragrant fruit and leafy aromas in a complementary tea with a creamy, vegetal quality.',
					price: 1698,
					currency: '¥',
					weight: '30 grams',
					imageFiles: [
						{
							filename: '010-1.jpg',
							url: '/img/tea/010/010-1.jpg',
							alt: 'Cherry Leaf (Sakura) Sencha',
						},
						{
							filename: '010-2.jpg',
							url: '/img/tea/010/010-2.jpg',
							alt: 'Cherry Leaf (Sakura) Sencha',
						},
						{
							filename: '010-3.jpg',
							url: '/img/tea/010/010-3.jpg',
							alt: 'Cherry Leaf (Sakura) Sencha',
						},
					],
					chartData: [
						{ label: 'Sweetness', value: 1 },
						{ label: 'Grain', value: 1 },
						{ label: 'Seaweed', value: 1 },
						{ label: 'Umami', value: 1 },
						{ label: 'Full-Bodied', value: 3 },
						{ label: 'Roasting', value: 1 },
						{ label: 'Bitterness', value: 4 },
						{ label: 'Fruit', value: 4 },
						{ label: 'Flower', value: 5 },
						{ label: 'Fragrance', value: 5 },
						{ label: 'Earthiness', value: 3 },
						{ label: 'Grassiness', value: 4 },
					],
				},

				// {
				// 	id: '011',
				// 	name: '',
				// 	seller: 'Senchado Tokyo',
				// 	manufacturer: 'Senchado Tokyo',
				// 	dateSampled: '',
				// 	description: '',
				// 	notes: '',
				// 	price: 0,
				// 	currency: '¥',
				// 	weight: '',
				// 	imageFiles: [
				// 		{
				// 			filename: '011-1.jpg',
				// 			url: '/img/tea/011/011-1.jpg',
				// 			alt: '',
				// 		},
				// 		{
				// 			filename: '011-2.jpg',
				// 			url: '/img/tea/011/011-2.jpg',
				// 			alt: '',
				// 		},
				// 	],
				// 	chartData: [
				// 		{ label: 'Sweetness', value: 0 },
				// 		{ label: 'Grain', value: 0 },
				// 		{ label: 'Seaweed', value: 0 },
				// 		{ label: 'Umami', value: 0 },
				// 		{ label: 'Full-Bodied', value: 0 },
				// 		{ label: 'Roasting', value: 0 },
				// 		{ label: 'Bitterness', value: 0 },
				// 		{ label: 'Fruit', value: 0 },
				// 		{ label: 'Flower', value: 0 },
				// 		{ label: 'Fragrance', value: 0 },
				// 		{ label: 'Earthiness', value: 0 },
				// 		{ label: 'Grassiness', value: 0 },
				// 	],
				// },
			],
		};
	},
	getters: {
		teaDataStore(state) {
			// this.$store.getters.teaDataStore			
			return state.teaData;
		},
	},
};
