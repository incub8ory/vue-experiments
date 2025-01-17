<template>
	<button class="btn-jumbo">
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10.0876 20.2991H30.9209"
				stroke="black"
				stroke-width="6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M20.5043 9.88248L30.9209 20.2992L20.5043 30.7158"
				stroke="black"
				stroke-width="6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</template>
<script>
export default {
	props: ['strokecolor'],
};
</script>
<style scoped>
button.btn-jumbo {
	outline: none;
	border: none;
	border-radius: 24px;
	/* background-color: #f00; */
	padding: 0;
	margin: 0;
	width: 64px;
	height: 48px;
	cursor: pointer;

	& svg path {
		stroke: var(--color-red-orange);
	}

	&:hover svg {
		animation: pulseAnimation 1s ease 0s infinite normal none;
	}
}
@keyframes pulseAnimation {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.15);
	}
	100% {
		transform: scale(1);
	}
}

/* .v-enter-active {
	animation: pulseAnimation 2s ease 0s infinite normal none;
}
.v-leave-active {
	animation: pulseAnimation 2s ease 0s infinite normal none;
} */

/* button.btn-jumbo svg path {
	stroke: var(--color-red-orange);
} */
</style>
