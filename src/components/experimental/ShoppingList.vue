<template>
	<div class="project-container" id="stamp-collector">
		<div class="sidebar">
			<SecondaryNavigation :projectID="this.projectID" />
			<div class="lede">
				<h2>{{ this.getProjectTitle(this.projectID) }}</h2>
				<p>
					Using Vue to create a simple shopping list component; also uses
					<code>TransitionGroup</code> to handle list animation
				</p>
			</div>
		</div>
		<div id="showcase">
			<main>
				<ListData />
			</main>
		</div>
	</div>
</template>

<script>
import ListData from '../experimental/ListData.vue';
import SecondaryNavigation from '../nav/SecondaryNavigation.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		ListData,
		SecondaryNavigation,
	},
	computed: {
		...mapGetters(['experimentsDataStore']),
		
	},
	data() {
		return {
			projectID: '01',
		};
	},
	methods: {
		getProjectTitle(projID) {
			const project = this.experimentsDataStore.find(
				(labExperiments) => labExperiments.id === projID
			);

			// console.log('find project index: ' + this.experimentsDataStore.indexOf(project));

			return project.title;
		},
	},
};
</script>

<style scoped>
.project-container {
	padding: 0 0 40px 0;

	.sidebar {
		padding-top: 40px;
		padding-bottom: 80px;

		nav {
			color: var(--color-border-soft);
			border-bottom: 1px dotted var(--color-border-soft);
			display: flex;
			gap: 0 12px;
			margin-bottom: 12px;
			padding-bottom: 12px;
			padding-left: 40px;
			font-feature-settings: 'ss01' on, 'zero' on;

			span {
				color: var(--color-border-hover);
			}
			a:hover {
				color: var(--color-heading);
			}
		}

		nav + div {
			padding: 0 40px;

			h2 {
				color: var(--color-heading);
				font-size: 36px;
				/* letter-spacing: -0.03em; */
				line-height: 40px;
				padding-bottom: 36px;
				padding-top: 36px;
			}
		}

		code {
			font-size: 86%;
			opacity: 0.8;
		}
	}

	#showcase {
		font-family: 'HelveticaNowText', 'SF Pro', -apple-system, BlinkMacSystemFont,
			'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji';
	}

	@media (width >= 1024px) {
		.project-container {
			display: flex;
		}
		.sidebar {
			width: calc(42vw - 40px);
			height: calc(100vw - 65px);
			position: fixed;
			overflow-x: hidden;
			border-right: 1px solid var(--color-border-soft);
			height: 100%;
			padding-bottom: 80px;
			overflow-y: scroll;

			.lede {
				p {
					color: var(--color-heading);
					font-size: 19px;
					font-weight: 400;
					line-height: 26px;
					max-width: 80%;
				}
			}
		}

		#showcase {
			margin-left: calc(42vw - 40px);
			height: 100%;

			main {
				padding: 40px;

				.shopping-list {
					margin: 0 auto;
					max-width: 480px;
				}
			}

			ul {
				height: calc(100vh - 105px);
				overflow-y: scroll;
				width: 58%;
				margin: 0 auto;
			}
		}
	}

	@media (width < 1024px) {
		.lede {
			margin: 0 auto;
			width: 83%;
			min-width: 320px;

			p {
				/* font-size: 2.7vw; */
				font-size: min(max(22px, 2.7vw), 32px);
				font-weight: 400;
				line-height: 1.325;
				padding-right: 80px;
				padding-bottom: 80px;
				border-bottom: 1px solid var(--color-border-soft);
			}
		}
		#showcase {
			margin: 0 auto;

			main {
				width: 83%;
				margin: 0 auto;
				padding: 0 40px;
			}
		}
	}
	@media (width < 600px) {
		.lede {
			width: 100%;
			p {
				font-size: 22px;
			}
		}
		ul {
			li {
				width: calc(100% - 80px);
				min-width: 320px;
			}
		}
		section {
			/* flex-direction: row-reverse; */
			justify-content: left;
		}
		#showcase {
			margin: 0 auto;

			main {
				width: 100%;
				margin: 0 auto;
				padding: 0 40px;
			}
		}
	}

	@media (width >= 600px) {
		ul {
			li {
				width: 71%;
				min-width: 320px;
			}
		}
		section {
			/* flex-direction: row-reverse; */
			justify-content: space-between;
		}
	}
}
</style>

<!-- <script>
import ListData from '../experimental/ListData.vue';

export default {
	components: {
		ListData,
	},
};
</script> -->
