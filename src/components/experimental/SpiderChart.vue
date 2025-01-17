<template>
	<div class="star-chart">
		<svg v-bind:viewBox="viewBoxDimensions">
			<g v-bind:transform="globalContainerTransform">
				<g class="circles">
					<circle
						v-for="circle in circles"
						v-bind:cx="circle.cx"
						v-bind:cy="circle.cy"
						v-bind:r="circle.r"
					/>
				</g>
				<g class="rays">
					<line
						v-for="line in rays"
						v-bind:x1="line.x1"
						v-bind:y1="line.y1"
						v-bind:x2="line.x2"
						v-bind:y2="line.y2"
						v-bind:style="line.style"
					></line>
					<text
						class="mono"
						v-for="(label, index) in rays"
						v-bind:x="label.lx"
						v-bind:y="label.ly"
					>
						{{ index + 1 }}
					</text>
				</g>
				<g class="data-area">
					<polygon v-bind:points="dataArea" />
				</g>
			</g>
		</svg>
	</div>
</template>

<script>
export default {
	// inject: ['teaData'],
	props: ['teaIndex'],
	name: 'StarChart',
	data() {
		return {
			viewBox: {
				x1: 0,
				y1: 0,
				x2: 1000,
				y2: 1000,
			},
			chartSize: 400,
			labelSize: 450,
			chartCoordinates: {
				x: 0,
				y: 0,
			},
			circles: [],
			rays: [],
			minValue: 0,
			maxValue: 5,
			step: 1,
			dataCoordinates: [],
			// chartData: null, // Array of { label: '', value: 0, color: '#hexa' } (maybe label not needed)
		};
	},
	computed: {
		viewBoxDimensions() {
			return (
				this.viewBox.x1 +
				' ' +
				this.viewBox.y1 +
				' ' +
				this.viewBox.x2 +
				' ' +
				this.viewBox.y2
			);
		},

		globalContainerTransform() {
			return (
				'translate(' + this.viewBox.x2 / 2 + ',' + this.viewBox.y2 / 2 + ')'
			);
		},

		dataArea() {
			let i = 0;
			let dataArea = '';

			while (i < this.dataCoordinates.length) {
				dataArea +=
					' ' + this.dataCoordinates[i].cx + ', ' + this.dataCoordinates[i].cy;
				i++;
			}
			console.log('dataArea: ' + dataArea);
			return dataArea;
		},
	},
	created() {
		// this.viewBox.x1 = this.viewBox.y1 = 0;
		// this.viewBox.x2 = this.viewBox.y2 = 1000;
		// this.step = 1;
		// this.minValue = 0;
		// this.maxValue = 5;
		// this.chartSize = 400;
		// this.labelSize = 450;
		// this.chartCoordinates.x = 0;
		// this.chartCoordinates.y = 0;

		// this.chartData = [
		// 	{ label: 'Sweetness', value: 2 },
		// 	{ label: 'Grain', value: 4 },
		// 	{ label: 'Seaweed', value: 5 },
		// 	{ label: 'Umami', value: 5 },
		// 	{ label: 'Full-Bodied', value: 4 },
		// 	{ label: 'Roasted', value: 4 },
		// 	{ label: 'Bitter', value: 5 },
		// 	{ label: 'Fruit', value: 4 },
		// 	{ label: 'Flower', value: 4 },
		// 	{ label: 'Fragrance', value: 5 },
		// 	{ label: 'Earthiness', value: 5 },
		// 	{ label: 'Grassiness', value: 4 },
		// ];
		this.createCircles();
		this.createRays();
		this.populateChart();
	},

	methods: {
		createCircles: function () {
			const nbCircles = (this.maxValue - this.minValue) / this.step;
			const step = this.chartSize / nbCircles;

			let i = 0;
			let circleSize = this.chartSize;

			while (i < nbCircles) {
				this.circles.push({
					cx: this.chartCoordinates.x,
					cy: this.chartCoordinates.y,
					r: circleSize,
				});
				circleSize -= step;
				i++;
			}
		},

		createRays() {
			// const nbRays = this.chartData.length;
			const nbRays = 12;
			const fullCircleRadAngle = this.degreeToRadian(360);
			const stepAngle = fullCircleRadAngle / nbRays;

			let i = 0;
			let x = this.chartCoordinates.x;
			let y = this.chartSize;
			let rayAngle = this.degreeToRadian(180);
			let labelX = 0;
			let labelY = 0;
			let labelOffset = 8;

			while (i < nbRays) {
				x = this.chartSize * Math.sin(rayAngle) + this.chartCoordinates.x;
				y = this.chartSize * Math.cos(rayAngle) + this.chartCoordinates.y;
				labelX =
					this.labelSize * Math.sin(rayAngle) +
					this.chartCoordinates.x -
					labelOffset;
				labelY =
					this.labelSize * Math.cos(rayAngle) +
					this.chartCoordinates.y +
					labelOffset;

				this.rays.push({
					x1: this.chartCoordinates.x,
					y1: this.chartCoordinates.y,
					x2: x,
					y2: y,
					angle: rayAngle,
					lx: labelX,
					ly: labelY,
				});
				rayAngle -= stepAngle;
				i++;
			}
		},

		populateChart(teaIndex) {
			const nbSteps = (this.maxValue - this.minValue) / this.step;
			let i = 0;
			let ray = null;
			let x = null;
			let y = null;

			const teaDataset = this.$store.getters.teaDataStore;

			// console.log('teaID: ' + this.teaID);

			while (i < teaDataset[this.teaIndex].chartData.length) {
				ray =
					(this.chartSize / nbSteps) *
					teaDataset[this.teaIndex].chartData[i].value;

				x = ray * Math.sin(this.rays[i].angle) + this.chartCoordinates.x;
				y = ray * Math.cos(this.rays[i].angle) + this.chartCoordinates.y;

				this.dataCoordinates.push({
					cx: x,
					cy: y,
					// r: 4,
					// fill: this.chartData[i].color,
				});
				i++;
			}
		},

		// To put in a math utils
		degreeToRadian(degree) {
			return degree * (Math.PI / 180);
		},

		radianToDegree(radian) {
			return radian / (Math.PI / 180);
		},
	},
	// watch: {
	// 	teaIndex(newIndex) {
	// 		this.populateChart(newIndex);
	// 	},
	// },
};
</script>

<style scoped>
.star-chart {
	/* max-width: 320px; */
	/* height: 50%; */
	width: 80%;
	margin: 40px 0;
}
svg {
	width: 100%;
	height: 100%;
	/* border: 1px solid var(--color-border); */
	/* border: none; */
}

.circles circle {
	fill: var(--color-background-mute);
	stroke: var(--color-border);
	fill-opacity: 0.1;
}

line {
	stroke: var(--color-border);
	stroke-width: 1px;
}

.data-area {
	fill: var(--color-red-orange);
	fill-opacity: 0.6;
}
li:hover .data-area {
	fill-opacity: 0.75;
	transition: all 0.3s ease-in;
}
.mono {
	font-size: 28px;
	fill: var(--color-border);
}
.mono:nth-of-type(3n + 1) {
	fill: var(--color-heading);
}
</style>
