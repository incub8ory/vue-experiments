<template>
	<div class="banner-simple" :class="variant">
		<slot></slot>
		<button @click="$emit('close')"><IconXCircle></IconXCircle></button>
	</div>
</template>

<script>
import IconButton from '../UI/BaseButton.vue';
import IconXCircle from '../icons/IconXCircle.vue';

export default {
	components: {
		// IconArrowRightCircle,
		IconButton,
		IconXCircle,
	},
	props: {
		variant: {
			type: String,
			required: false,
		},
	},
	emits: ['close'],
};
</script>

<style scoped>
button {
	border: 0;
	background-color: transparent;
	padding-top: 8px;
}
.banner-simple {
	display: inline-flex;
	gap: 8px;
	/* padding: 8px 8px 8px 32px; */
	/* border: 1px solid var(--color-border); */
	/* background-color: var(--color-background-soft); */
	/* border-radius: 3px; */
	/* padding: 12px 0 12px 16px; */
	width: 100%;
	font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
		'Liberation Mono', monospace;
	font-size: 14px;
	line-height: 20px;
	color: var(--color-heading);
	justify-content: space-between;
	align-items: start;
	transition: 0.4s;
}
.danger {
	/* border-color: var(--color-danger-border); */
	background-color: var(--color-danger-background);
}
.success {
	/* border-color: var(--color-green); */
	background-color: var(--color-chartreuse-0);
}
svg:hover path::before {
	transition: 0.4s;
}
svg:hover path {
	stroke: var(--color-border-hover);
	transition: 0.4s;
}
@media (prefers-color-scheme: dark) {
	.success {
		background-color: var(--color-chartreuse-5);
	}
}
</style>
