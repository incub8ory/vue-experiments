<template>
	<div class="main-container">
		<h2>Lab</h2>
		<p class="lede">
			Test playground for experiments and other half-baked projects
		</p>
		<ul>
			<li
				v-for="experiment in labExperiments.slice().reverse()"
				:key="experiment.id"
			>
				<router-link :to="this.baseURL + '/experimental/' + experiment.routeName">
					<span>{{ experiment.id }}</span>
					<span>{{ experiment.linkText }}</span>
					<span>&rarr;</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
import ButtonLink from '../UI/ButtonLink.vue';
export default {
	components: {
		ButtonLink,
	},
	data() {
		return {
			baseURL: '/vue-experiments',
			labExperiments: [
				{ id: '01', routeName: 'list', linkText: 'Shopping List' },
				{ id: '02', routeName: 'tea', linkText: 'Tea Tasting' },
				{ id: '03', routeName: 'vuex', linkText: 'VueX' },
				{ id: '04', routeName: 'vuex-tutorial', linkText: 'VueX*' },
				{ id: '05', routeName: 'photo-locator', linkText: 'Photo Locator' },
				{ id: '06', routeName: 'stamp-collector', linkText: 'Eki Stamp Collector' },
			],
		};
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
.lede {
	padding: 40px 0;
	max-width: 400px;
	font-size: 24px;
}
ul {
	list-style: none;
	padding: 0;
	margin: 0;
}
li {
	padding: 0;
	margin: 0;
}
li a {
	display: block;
	padding-bottom: 12px;
	margin-bottom: 12px;
	border-bottom: 1px dotted var(--color-border);
}
li a:hover {
	color: var(--color-heading);
	border-bottom: 1px solid var(--color-border);
}
li a span {
	display: inline-block;
}
li a span:first-of-type {
	font-feature-settings: 'tnum' on, 'ss01' on;
	width: 80px;
}
li a span:nth-of-type(2) {
	width: calc(100% - 160px);
}
li a span:last-of-type {
	width: 80px;
	padding-right: 16px;
	text-align: right;
}
</style>
