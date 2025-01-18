<template>
	<div class="container">
		<header>
			<p class="mono">
				<RouterLink :to="{ name: 'tea' }">Tea Tasting</RouterLink>
			</p>
			<h2>{{ this.teaDataset[this.teaIndex].name }}</h2>
		</header>

		<nav>
			<ul>
				<li @click="nextRoute">
					<svg
						width="65"
						height="26"
						viewBox="0 0 65 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.667 25L1.66699 13L13.667 1"
							stroke="black"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<line
							x1="2"
							y1="12.6177"
							x2="64"
							y2="12.6177"
							stroke="black"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</li>
				<li @click="nextRoute">
					<svg
						width="121"
						height="26"
						viewBox="0 0 121 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M107.333 1L119.333 13L107.333 25"
							stroke="black"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<line
							x1="119"
							y1="13.3823"
							x2="1"
							y2="13.3823"
							stroke="black"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</li>
			</ul>
		</nav>
		<p class="mono"></p>
		<div class="wrapper-outer">
			<main class="lede">
				<section class="chart">
					<span class="eyebrow mono">Flavor profile</span>
					<SpiderChart
						:teaIndex="this.teaIndex"
						:key="this.componentKey"
						class="spider-chart"
					></SpiderChart>
				</section>
				<div class="content">
					<div class="content-core">
						<article>
							<span
								class="eyebrow mono"
								v-if="this.teaDataset[this.teaIndex].description"
								>Description</span
							>
							<p v-if="this.teaDataset[this.teaIndex].description">
								{{ this.teaDataset[this.teaIndex].description }}
							</p>

							<span
								class="eyebrow mono"
								v-if="this.teaDataset[this.teaIndex].notes"
								>Tasting notes</span
							>
							<p v-if="this.teaDataset[this.teaIndex].notes">
								{{ this.teaDataset[this.teaIndex].notes }}
								Sampled on {{ convertDate }}.
							</p>
						</article>
						<div
							id="image-gallery"
							v-if="this.teaDataset[this.teaIndex].imageFiles.length > 0"
						>
							<p class="eyebrow mono">
								{{ this.teaDataset[this.teaIndex].name }} images
							</p>
							<ul class="gallery">
								<li v-for="image in this.teaDataset[this.teaIndex].imageFiles">
									<img :src="`/vue-experiments/${image.url}`" :alt="image.alt" />
								</li>
							</ul>
						</div>
					</div>
					<aside class="content-aside">
						<span class="eyebrow mono">Product data</span>
						<table>
							<tr>
								<th>Price</th>
								<td>
									{{ this.teaDataset[this.teaIndex].currency }}
									{{ this.teaDataset[this.teaIndex].price.toFixed(2) }}
								</td>
							</tr>
							<tr>
								<th>Weight</th>
								<td>
									{{ this.teaDataset[this.teaIndex].weight }}
								</td>
							</tr>
							<tr>
								<th>Seller</th>
								<td>{{ this.teaDataset[this.teaIndex].seller }}</td>
							</tr>
							<tr>
								<th>Manufacturer</th>
								<td>{{ this.teaDataset[this.teaIndex].manufacturer }}</td>
							</tr>
						</table>
					</aside>
				</div>
			</main>
		</div>
	</div>
</template>
<script>
import SpiderChart from '@/components/experimental/SpiderChart.vue';

export default {
	// inject: ['teaDataset'],
	components: {
		SpiderChart,
	},
	data() {
		return {
			teaName: '',
			teaIndex: null,
			notFound: false,
			teaId: '',
			newTeaIndex: null,
			componentKey: 0,
			teaDataset: null,
			baseURL: 'vue-experiments/',
		};
	},
	computed: {
		convertDate() {
			const months = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];

			let dateString = new Date(this.teaDataset[this.teaIndex].dateSampled);
			let monthIndex = dateString.getMonth();
			let month = months[monthIndex];
			let year = dateString.getFullYear();

			console.log ('dateString: ' + dateString);
			console.log ('month index: ' + monthIndex);
			console.log('month: ' + month);
			return `${month} ${year}`;
		},
	},
	watch: {
		$route(newRoute) {
			this.loadTeaData(newRoute);

			// hack to re-render spider chart
			this.componentKey++;
		},
	},
	methods: {
		loadTeaData() {
			this.teaId = this.$route.params.teaId;
			this.teaDataset = this.$store.getters.teaDataStore;
			// console.log('teaDataset: ' + this.teaDataset);

			this.teaIndex = this.teaDataset.findIndex((tea) => {
				return tea.id === this.teaId;
			});
			
		},
		nextRoute() {
			if (this.teaIndex === this.teaDataset.length - 1) {
				this.teaIndex = 0;
			} else {
				this.teaIndex++;
			}
			this.teaId = this.teaDataset[this.teaIndex].id;
			this.$router.push('/tea/' + this.teaId);
		},
		previousRoute() {
			if (this.teaIndex === 0) {
				this.teaIndex = this.teaDataset.length - 1;
			} else {
				this.teaIndex--;
			}
			this.teaId = this.teaDataset[this.teaIndex].id;
			this.$router.push('/tea/' + this.teaId);
		},
		addKeyEventHandlers() {
			window.addEventListener('keydown', this.keyDownHandler);
			window.addEventListener('keyup', this.keyUpHandler);
		},
		removeKeyEventHandlers() {
			window.removeEventListener('keydown', this.keyDownHandler);
			window.removeEventListener('keyup', this.keyUpHandler);
		},
		keyDownHandler(event) {
			// prevent arrow keys from scrolling
			if (['ArrowLeft', 'ArrowRight'].indexOf(event.code) > -1) {
				event.preventDefault();
			}
		},
		keyUpHandler(event) {
			const keyPressed = event.key;

			if (keyPressed === 'ArrowRight') {
				this.nextRoute();
			}
			if (keyPressed === 'ArrowLeft') {
				this.previousRoute();
			}
		},
	},
	created() {
		this.loadTeaData();
		this.addKeyEventHandlers();
	},
	destroyed() {
		this.removeKeyEventHandlers();
	},
};
</script>

<style scoped>
.wrapper-outer {
	padding: 0 40px;

	main.lede {
		margin: 0 auto;
	}
}
.container {
	padding: 40px 40px 160px 40px;
}
header > p.mono a {
	font-size: 16px;
	color: var(--color-heading);
	padding-bottom: 4px;
	display: block;

	&:hover {
		color: var(--color-red-orange);
	}
}
header h2 {
	font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 64px;
	font-feature-settings: 'ss01' on;
	font-weight: 800;
	letter-spacing: -0.02em;
	line-height: 1;
	/* padding-bottom: 16px; */
}
nav {
	margin-bottom: 24px;
	border-bottom: 1px solid var(--color-border);
}
nav ul {
	list-style: none;
	display: flex;
	padding: 24px 0;
	margin: 0;
	justify-content: space-between;
}
nav ul li svg path,
nav ul li svg line {
	stroke: var(--color-border);
}
nav ul li:hover svg path,
nav ul li:hover svg line {
	cursor: hover;
	stroke: var(--color-red-orange);
}
.gallery {
	list-style: none;
	padding: 0 0 80px 0;
	margin: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0 4px;

	li {
		padding: 0;
		margin: 0;
		/* border: 1px solid #00f; */
		width: calc(50% - 27px);
	}
	li:nth-of-type(3n) {
		width: calc(100% - 50px);
	}
}
.gallery li img {
	width: 100%;
	padding: 0;
	margin: 0;
}
#image-gallery {
	padding-top: 40px;

	.eyebrow.mono {
		font-size: 14px;
		color: var(--color-text);
	}
}
.eyebrow.mono {
	display: flex;
	padding-bottom: 32px;
	padding-top: 16px;
}
.content {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
}
.content-core {
	width: 100%;
	max-width: 640px;

	.eyebrow.mono {
		padding-bottom: 24px;
	}
	.eyebrow.mono:not(:first-of-type) {
		padding-top: 40px;
	}
}
aside .eyebrow.mono {
	padding-bottom: 0;
}
table,
tr,
th,
td {
	/* font-size: 14px; */
	line-height: 1.5;
	font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	padding: 0;
	margin: 0;
}
table {
	border-spacing: 1px;
	text-align: left;
	width: 100%;
	border-top: 1px solid var(--color-border);
	margin-top: 32px;
	/* border-collapse: collapse; */
}
table th {
	width: 160px;
	font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
		'Liberation Mono', monospace;
	font-size: 13px;
	/* font-weight: 600; */
	text-transform: uppercase;
	letter-spacing: 0.02em;
}
th,
td {
	padding-top: 20px;
	padding-bottom: 20px;
	border-bottom: 1px dotted var(--color-border);
}
td {
	font-feature-settings: 'ss01' on, 'tnum' on;
}
main.lede {
	display: block;
}

/* main.lede {
	display: flex;
	gap: 0 64px;

	p {
		font-size: 18px;
		line-height: 1.5;
		padding: 0 0 40px 0;
		max-width: 640px;
		color: var(--color-text);
	}

	p + .eyebrow.mono {
		border: none;
		padding-top: 24px;
	}
} */

/* .chart {
	width: 400px;
	padding: 0;

	.spider-chart {
		width: 360px;
		margin: 0;
		padding: 0;
	}
} */
.chart {
	width: 400px;
	max-width: 480px;
	padding: 0 0 40px 0;
	margin-right: 24px;

	.spider-chart {
		width: 360px;
		margin: 0;
		padding: 0;
	}
}

/* use animation keyframes with v-enter-active and v-leave-active */
@keyframes fade-in {
	0% {
		opacity: 0;
		display: none;
	}
	50% {
		display: none;
		filter: blur(32px);
		/* transform: translateX(-384px); */
	}
	75% {
		opacity: 0.25;
		filter: blur(12px);
	}
	100% {
		opacity: 1;
		filter: blur(0);
		display: block;
		/* transform: translateX(0); */
	}
}
/* CSS animation using Vue named Transition */
.chartFadeIn-enter-active {
	animation: fade-in 0.4s ease-in-out;
}
.chartFadeIn-leave-active {
	animation: fade-in 0.2s ease-in reverse;
}

@media only screen and (min-width: 800px) {
	.wrapper-outer {
		padding: 0;
	}
	main.lede {
		margin: 0;
		display: flex;
		gap: 0 24px;

		p {
			font-size: 18px;
			line-height: 1.5;
			padding: 0 0 40px 0;
			max-width: 640px;
		}
	}
	/* .content {
		gap: 0 80px;
	} */
}
@media only screen and (min-width: 960px) {
	.chart {
		width: 400px;

		.spider-chart {
			width: 360px;
		}
	}
	.eyebrow.mono:nth-of-type(2) {
		padding-top: 0;
	}
}

@media only screen and (max-width: 640px) {
	.content {
		max-width: 640px;
	}
}
@media only screen and (min-width: 1400px) {
	.content {
		flex-direction: row;
		flex-wrap: nowrap;
		width: 100%;
		gap: 0 80px;
		/* justify-content: space-between; */
	}
	.content-core {
		/* width: 100%; */
		max-width: none;
		/* border: 1px solid #0f0; */
	}
	aside {
		width: 100%;
		/* max-width: 480px; */
		/* padding-left: 120px; */
		padding-left: 40px;
	}
}
</style>
