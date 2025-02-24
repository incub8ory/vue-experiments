<template>
	<div class="project-container" id="stamp-collector">
		<div class="sidebar">
			<!-- <nav>
				<router-link :to="{ name: 'experimental' }">
					Lab Experiments
				</router-link>
				&sol; <span>{{ this.projectID }}</span>
			</nav> -->
			<SecondaryNavigation :projectID="this.projectID" />
			<div class="lede">
				<h2>{{ this.getProjectTitle(this.projectID) }}</h2>
				<p>
					Project description goes here and continues on and on and looks like
					this.
				</p>
			</div>
		</div>
		<div id="showcase">
			<ol>
				<li>
					<article>
						<header>
							<p class="subhead mono">N° 001</p>
							<h3>Title</h3>
							<p class="prose">
								Lorem ipsum dolor sit amet quid nostrud sud nonummy
								consecteteur.
							</p>
						</header>
					</article>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
import SecondaryNavigation from '../nav/SecondaryNavigation.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		SecondaryNavigation,
	},
	computed: {
		...mapGetters(['experimentsDataStore']),
	},
	data() {
		return {
			projectID: '00',
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
	}
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
	}

	#showcase {
		font-family: 'HelveticaNowText', 'SF Pro', -apple-system, BlinkMacSystemFont,
			'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji';

		ol {
			list-style: none;
			padding: 40px 0;

			li {
				list-style: none;
				padding: 0 0 80px;
				margin: 0 auto;

				& > article {
					width: 100%;

					header {
						padding: 40px 0 12px 0;

						.subhead {
							font-size: 12px;
							letter-spacing: 0.02em;
							text-transform: uppercase;
							color: var(--color-text);
							line-height: 1;
						}
						h3 {
							color: var(--color-heading);
							font-size: 28px;
							font-weight: 400;
							letter-spacing: -0.02em;
						}
						.prose {
							max-width: 66.67%;
							font-size: 14px;
							padding: 4px 0 12px 0;
						}
					}

					section {
						font-size: 12px;
						padding: 16px 0 40px 0;
						font-feature-settings: 'ss01' on, 'zero' on;
						width: 100%;
						display: flex;
						overflow-x: scroll;

						.subhead {
							letter-spacing: 0.02em;
							font-variant: small-caps;
							color: var(--color-text);
						}
					}
				}
			}
		}
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
			margin-left: calc(42vw - 65px);
			height: 100%;

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
