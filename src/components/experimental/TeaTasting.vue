<template>
	<div class="main-container">
		<!-- <router-link :to="{ name: 'experimental' }"
			>&larr; Back to Lab experiments</router-link
		> -->
		<h2>Tea Tasting</h2>
		<!-- <p class="lede">
			Tasting notes for {{ this.teaData.length }} Japanese-origin sencha green
			teas I&rsquo;ve sampled
		</p> -->
		<p class="lede">
			Tasting notes for {{ teaDataStore.length }} Japanese-origin sencha green
			teas I&rsquo;ve sampled
		</p>
		<ul>
			<!-- <li
				v-for="(tea, index) in this.teaData"
				:key="tea.id"
				@click="changeRoute(tea.id)"
			>
				<span class="eyebrow mono">{{ tea.seller }}</span>
				<h3>
					<router-link :to="'/tea/' + tea.id"> {{ tea.name }}</router-link>
				</h3>
				<SpiderChart :teaIndex="index"></SpiderChart>
			</li> -->
			<li
				v-for="(tea, index) in teaDataStore"
				:key="tea.id"
				@click="changeRoute(tea.id)"
			>
				<span class="eyebrow mono">{{ tea.seller }}</span>
				<h3>
					<router-link :to="this.$store.state.baseURL + '/experimental/02/' + tea.id"> {{ tea.name }}</router-link>
				</h3>
				<SpiderChart :teaIndex="index"></SpiderChart>
			</li>
		</ul>
	</div>
	<div id="sticky-footer">
		<BaseButton @click="toggleDetails" variant="full-width"
			><span v-if="!showDetails">+</span
			><span v-if="showDetails">&ndash;</span>Chart reference</BaseButton
		>
		<Transition name="list-animation">
			<ol v-show="showDetails" @click="toggleDetails">
				<li v-for="(label, index) in chartLabelsKey">
					<span>{{ index + 1 }}</span
					>{{ label }}
				</li>
			</ol>
		</Transition>
	</div>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';
import SpiderChart from '@/components/experimental/SpiderChart.vue';

import { mapGetters } from 'vuex';

export default {
	name: 'RadarChart',
	components: {
		BaseButton,
		SpiderChart,
	},
	// inject: ['teaData'],
	data() {
		return {
			showDetails: false,
			chartLabelsKey: [
				'Sweetness',
				'Grain',
				'Seaweed',
				'Umami',
				'Full-Bodied',
				'Roasting',
				'Bitterness',
				'Fruit',
				'Flower',
				'Fragrance',
				'Earthiness',
				'Grassiness',
			],

			// teaData: [
			// 	{
			// 		id: '001',
			// 		name: '012 Asatsuyu',
			// 		seller: 'Senchado Tokyo',
			// 		manufacturer: 'Senchado Tokyo',
			// 		chartData: [
			// 			{ label: 'Sweetness', value: 4 },
			// 			{ label: 'Grain', value: 4 },
			// 			{ label: 'Seaweed', value: 4 },
			// 			{ label: 'Umami', value: 5 },
			// 			{ label: 'Full-Bodied', value: 5 },
			// 			{ label: 'Roasting', value: 1 },
			// 			{ label: 'Bitterness', value: 2 },
			// 			{ label: 'Fruit', value: 1 },
			// 			{ label: 'Flower', value: 3 },
			// 			{ label: 'Fragrance', value: 5 },
			// 			{ label: 'Earthiness', value: 3 },
			// 			{ label: 'Grassiness', value: 4 },
			// 		],
			// 	},
			// 	{
			// 		id: '002',
			// 		name: '060 Yabukita Niyodogawa',
			// 		seller: 'Senchado Tokyo',
			// 		manufacturer: 'Senchado Tokyo',
			// 		chartData: [
			// 			{ label: 'Sweetness', value: 4 },
			// 			{ label: 'Grain', value: 5 },
			// 			{ label: 'Seaweed', value: 2 },
			// 			{ label: 'Umami', value: 2 },
			// 			{ label: 'Full-Bodied', value: 2 },
			// 			{ label: 'Roasting', value: 2 },
			// 			{ label: 'Bitterness', value: 2 },
			// 			{ label: 'Fruit', value: 1 },
			// 			{ label: 'Flower', value: 3 },
			// 			{ label: 'Fragrance', value: 5 },
			// 			{ label: 'Earthiness', value: 1 },
			// 			{ label: 'Grassiness', value: 4 },
			// 		],
			// 	},
			// 	{
			// 		id: '003',
			// 		name: 'Satsukiyo Sencha',
			// 		seller: 'Haraguchien Fusuan',
			// 		manufacturer: 'Haraguchien Fusuan',
			// 		chartData: [
			// 			{ label: 'Sweetness', value: 4 },
			// 			{ label: 'Grain', value: 3 },
			// 			{ label: 'Seaweed', value: 4 },
			// 			{ label: 'Umami', value: 5 },
			// 			{ label: 'Full-Bodied', value: 5 },
			// 			{ label: 'Roasting', value: 2 },
			// 			{ label: 'Bitterness', value: 2 },
			// 			{ label: 'Fruit', value: 1 },
			// 			{ label: 'Flower', value: 3 },
			// 			{ label: 'Fragrance', value: 4 },
			// 			{ label: 'Earthiness', value: 2 },
			// 			{ label: 'Grassiness', value: 5 },
			// 		],
			// 	},
			// 	{
			// 		id: '004',
			// 		name: 'Yame Sencha AY-10A',
			// 		seller: 'Haraguchien Fusuan',
			// 		manufacturer: 'Haraguchien Fusuan',
			// 		chartData: [
			// 			{ label: 'Sweetness', value: 2 },
			// 			{ label: 'Grain', value: 3 },
			// 			{ label: 'Seaweed', value: 5 },
			// 			{ label: 'Umami', value: 5 },
			// 			{ label: 'Full-Bodied', value: 4 },
			// 			{ label: 'Roasting', value: 2 },
			// 			{ label: 'Bitterness', value: 2 },
			// 			{ label: 'Fruit', value: 1 },
			// 			{ label: 'Flower', value: 1 },
			// 			{ label: 'Fragrance', value: 3 },
			// 			{ label: 'Earthiness', value: 2 },
			// 			{ label: 'Grassiness', value: 4 },
			// 		],
			// 	},
			// 	{
			// 		id: '005',
			// 		name: 'Saemidori Kabuse',
			// 		seller: 'Kimikura',
			// 		manufacturer: 'Maruyama Tea',
			// 		chartData: [
			// 			{ label: 'Sweetness', value: 3 },
			// 			{ label: 'Grain', value: 3 },
			// 			{ label: 'Seaweed', value: 4 },
			// 			{ label: 'Umami', value: 5 },
			// 			{ label: 'Full-Bodied', value: 4 },
			// 			{ label: 'Roasting', value: 2 },
			// 			{ label: 'Bitterness', value: 2 },
			// 			{ label: 'Fruit', value: 1 },
			// 			{ label: 'Flower', value: 2 },
			// 			{ label: 'Fragrance', value: 3 },
			// 			{ label: 'Earthiness', value: 2 },
			// 			{ label: 'Grassiness', value: 4 },
			// 		],
			// 	},
			// ],
		};
	},
	provide() {
		return {
			// teaData: this.teaData,
			// teaData: this.$store.state.teaModule.teaData,

			// both valid getters syntax
			// teaData: this.$store.getters['teaDataStore'],
			teaData: this.$store.getters.teaDataStore,
		};
	},
	computed: {
		...mapGetters(['teaDataStore']),
	},
	methods: {
		toggleDetails() {
			this.showDetails = !this.showDetails;
		},
		changeRoute(newId) {
			// `route` is either a string or object
			const newRoute = this.$store.state.baseURL + '/experimental/02/' + newId;
			console.log('changeRoute activated!');
			this.$router.push(newRoute);
		},
	},
};
</script>

<style scoped>
.main-container {
	padding: 40px;
}

h2 {
	font-family: 'Onest', 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 96px;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1;
}
a + h2 {
	padding-top: 24px;
}
h3 {
	font-size: 24px;
	font-feature-settings: 'ss01' on, 'zero' on;
	line-height: 1.2;
	color: var(--color-text);
}
h3 a {
	font-weight: 800;
}
.lede {
	padding: 0 0 16px 0;
	max-width: 400px;
	font-size: 24px;
	font-feature-settings: 'ss01' on;
}
button,
button:hover {
	padding: 0;
	border: none;
	text-align: left;
	color: var(--color-text);
}
button span {
	width: 16px;
	display: inline-block;
}
ol {
	list-style: none;
	padding: 12px 24px;
	margin: 12px 0 24px 0;
	columns: 6;
	border-top: 1px dotted var(--color-border);
	border-bottom: 1px dotted var(--color-border);
}
ol:hover {
	cursor: pointer;
	border-top: 1px solid var(--color-border);
	border-bottom: 1px solid var(--color-border);
}
ol li {
	padding: 0;
	margin: 0;
	font-size: 12px;
	line-height: 1.625;
}
ol li:nth-of-type(3n + 1) {
	color: var(--color-heading);
}
ol li span {
	font-feature-settings: 'ss01' on;
	display: inline-block;
	width: 24px;
}
ul {
	display: flex;
	list-style: none;
	padding: 24px 0 160px 0;
	margin: 0;
	gap: 24px 12px;
	flex-wrap: wrap;
	width: calc(100vw -80px);
	/* border: 1px solid #f00; */
	/* justify-content: space-between; */
}
ul li {
	padding: 0;
	margin: 0;
	width: calc(33.3% - 8px);
	/* min-width: 280px; */
}
ul li:hover {
	cursor: pointer;
}
ul li:hover h3 a {
	color: var(--color-heading);
	transition: all 0.4s ease-in;
}
ul li .eyebrow.mono {
	font-size: 12px;
	font-weight: 600;
	/* padding-bottom: 4px; */
	display: block;
	padding-top: 12px;
	border-top: 1px dotted var(--color-border);
}
ul li:hover .eyebrow.mono {
	border-top: 1px solid var(--color-border);
}
.list-animation-enter-from {
	opacity: 0;
	filter: blur(2px);
	/* transform: translateY(-16px); */
}
.list-animation-enter-active {
	transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	/* transition: all 0.3s ease-in-out; */
}
.list-animation-enter-to {
	opacity: 1;
	filter: blur(0);
	/* transform: translateY(0); */
}
.list-animation-leave-from {
	opacity: 1;
}
.list-animation-leave-to {
	transform: translateY(16px);
	opacity: 0;
}
.list-animation-leave-active {
	transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
	/* transition: all 0.3s ease-in-out; */
	filter: blur(2px);
}
/* .list-animation-move {
	transition: transform 0.3s ease-in;
} */
#sticky-footer {
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 40px;
	background-color: var(--color-background);
	width: 100%;
	border-top: 1px dotted var(--color-border-soft);
}
</style>
