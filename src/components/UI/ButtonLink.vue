<template>
	<a :class="variant" :href="href">
		<slot></slot>
		<slot name="icon"></slot>
	</a>
</template>

<script>
import IconArrowRightCircle from '../icons/IconArrowRightCircle.vue';

export default {
	components: {
		IconArrowRightCircle,
	},
	props: ['variant', 'href'],
};
</script>

<style scoped>
a,
a.btn {
	border: 1px solid var(--color-button-border);
	background-color: transparent;
	color: var(--color-heading);
	font-size: 14px;
	line-height: 18px;
	padding: 12px;
	border-radius: 3px;
	display: flex;
	gap: 8px;
	align-items: center;
	max-height: 45px;
	display: inline-block;

	&:hover {
		border: 1px solid var(--color-button-border-hover);
		cursor: pointer;
	}
}
/* a:hover,
a.btn:hover {
	border: 1px solid var(--color-button-border-hover);
	cursor: pointer;
} */
.primary {
	background-color: var(--color-button-green);
	border-color: var(--color-green-border);
	color: var(--vt-c-black-mute);

	&:hover {
		background-color: var(--color-button-green-hover);
		border-color: var(--color-green-border-hover);
		cursor: pointer;
	}
}
.rounded {
	border-radius: 24px;
	padding-left: 16px;
	padding-right: 16px;
}
.full-width {
	display: block;
	width: 100%;
}
.subtle {
	border-color: var(--color-gray-1);
}
.subtle:hover {
	border-color: var(--color-gray-2);
}

@media (prefers-color-scheme: dark) {
	.subtle {
		border-color: var(--color-gray-dark-1);
	}
	.subtle:hover {
		border-color: var(--color-gray-dark-2);
	}
}
</style>
