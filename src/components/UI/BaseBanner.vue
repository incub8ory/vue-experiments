<template>
	<div class="banner" :class="variant">
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
}
.banner {
	display: flex;
	gap: 8px;
	padding: 8px 8px 8px 32px;
	border: 1px solid var(--color-border);
	background-color: var(--color-background-soft);
	border-radius: 3px;
	width: 100%;
	font-size: 16px;
	line-height: 24px;
	color: var(--color-heading);
	justify-content: space-between;
	align-items: center;
}
.danger {
	border-color: var(--color-danger-border);
	background-color: var(--color-danger-background);
}
.success {
	border-color: var(--color-green);
	background-color: var(--color-chartreuse-1);
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
