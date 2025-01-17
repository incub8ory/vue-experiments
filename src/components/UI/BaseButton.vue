<template>
	<button :type="type" :class="variant">
		<slot name="icon-l"></slot>
		<slot></slot>
		<slot name="icon-r"></slot>
	</button>
</template>

<script>
import IconArrowRightCircle from '../icons/IconArrowRightCircle.vue';

export default {
	components: {
		IconArrowRightCircle,
	},
	props: ['type', 'variant'],
};
</script>

<style scoped>
button,
.btn {
	border: 1px solid var(--color-button-border);
	background-color: transparent;
	color: var(--color-heading);
	font-size: 14px;
	padding: 12px;
	border-radius: 3px;
	display: flex;
	gap: 8px;
	align-items: center;
	justify-content: center;
	max-height: 45px;
	/* min-width: 120px; */
}
button:hover,
.btn:hover {
	border: 1px solid var(--color-button-border-hover);
	/* border-bottom-width: 3px; */
	cursor: pointer;
}
.primary {
	background-color: var(--color-button-green);
	/* border-bottom-width: 3px; */
	/* border-color: var(--color-chartreuse-3); */
	border-color: var(--color-green-border);
	color: var(--vt-c-black-mute);
}
.primary:hover {
	background-color: var(--color-button-green-hover);
	/* border: 1px solid var(--color-green); */
	/* border-color: var(--color-chartreuse-4); */
	border-color: var(--color-green-border-hover);
	cursor: pointer;
}
button.rounded {
	border-radius: 24px;
	padding-left: 16px;
	padding-right: 16px;
}
button.full-width {
	display: block;
	width: 100%;
}
button.neutral {
	background-color: var(--color-background-mute);
	border-color: var(--color-background-mute);
}
button.neutral:hover {
	background-color: var(--color-background-muter);
	border-color: var(--color-background-muter);
}
button.subtle {
	border-color: var(--color-gray-1);
}
button.subtle:hover {
	border-color: var(--color-gray-2);
}

@media (prefers-color-scheme: dark) {
	button.subtle {
		border-color: var(--color-gray-dark-1);
	}
	button.subtle:hover {
		border-color: var(--color-gray-dark-2);
	}
}
</style>
