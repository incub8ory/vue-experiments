<template>
	<header>
		<nav>
			<h1 class="mono">
				<RouterLink to="/" @click="resetAllTabs">
					Incub8ory
				</RouterLink>
			</h1>
			<ul>
				<li>
					<RouterLink
						to="/teams"
						@click="setActivePage(tabNames[0])"
						:class="{ active: tabAIsActive }"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							width="16"
							height="16"
							class="teams"
						>
							<path
								d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"
							></path>
						</svg>
						Teams
					</RouterLink>
					<!-- <button @click="setActivePage('teams-list')">Teams</button> -->
				</li>
				<li>
					<RouterLink
						to="/members"
						@click="setActivePage(tabNames[1])"
						:class="{ active: tabBIsActive }"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							class="members"
						>
							<g clip-path="url(#clip0_331_5)">
								<path
									d="M10.5609 10.0699C11.5455 10.5353 12.3849 11.2596 12.9895 12.1654C13.594 13.0711 13.9409 14.1242 13.9929 15.2119C13.9998 15.3116 13.9867 15.4116 13.9544 15.5061C13.9221 15.6006 13.8712 15.6877 13.8048 15.7623C13.7383 15.8369 13.6577 15.8975 13.5675 15.9405C13.4773 15.9835 13.3795 16.008 13.2797 16.0127C13.1799 16.0173 13.0802 16.002 12.9865 15.9676C12.8927 15.9332 12.8067 15.8804 12.7336 15.8124C12.6605 15.7443 12.6018 15.6623 12.5608 15.5712C12.5198 15.4802 12.4974 15.3818 12.4949 15.2819C12.4404 14.1265 11.943 13.0364 11.106 12.2379C10.269 11.4395 9.1567 10.994 7.99994 10.994C6.84318 10.994 5.73085 11.4395 4.89384 12.2379C4.05684 13.0364 3.55946 14.1265 3.50494 15.2819C3.49147 15.4775 3.40195 15.6601 3.25556 15.7905C3.10917 15.9209 2.91754 15.9887 2.72171 15.9796C2.52587 15.9704 2.34141 15.885 2.20781 15.7415C2.07422 15.598 2.00211 15.4079 2.00694 15.2119C2.0588 14.1243 2.40547 13.0712 3.00984 12.1655C3.61421 11.2597 4.45353 10.5354 5.43794 10.0699C4.80695 9.54364 4.35341 8.83573 4.13899 8.04252C3.92458 7.24932 3.95971 6.40931 4.23961 5.63678C4.5195 4.86425 5.03057 4.19668 5.70331 3.7249C6.37604 3.25311 7.17777 3 7.99944 3C8.82112 3 9.62285 3.25311 10.2956 3.7249C10.9683 4.19668 11.4794 4.86425 11.7593 5.63678C12.0392 6.40931 12.0743 7.24932 11.8599 8.04252C11.6455 8.83573 11.1919 9.54364 10.5609 10.0699ZM10.4999 6.99695C10.4999 6.33391 10.2365 5.69802 9.76771 5.22918C9.29887 4.76034 8.66298 4.49695 7.99994 4.49695C7.3369 4.49695 6.70102 4.76034 6.23217 5.22918C5.76333 5.69802 5.49994 6.33391 5.49994 6.99695C5.49994 7.65999 5.76333 8.29587 6.23217 8.76471C6.70102 9.23356 7.3369 9.49695 7.99994 9.49695C8.66298 9.49695 9.29887 9.23356 9.76771 8.76471C10.2365 8.29587 10.4999 7.65999 10.4999 6.99695Z"
								/>
							</g>
							<defs>
								<clipPath id="clip0_331_5">
									<rect width="16" height="16" />
								</clipPath>
							</defs>
						</svg>
						Members
					</RouterLink>
					<!-- <button @click="setActivePage('users-list')">Users</button> -->
				</li>
				<li>
					<RouterLink
						to="/experimental/"
						@click="setActivePage(tabNames[2])"
						:class="{ active: tabCIsActive }"
					>
						<svg width="16" height="16" viewBox="0 0 16 16" class="beaker">
							<path
								d="M5.00004 6.782V3.5H4.75004C4.55113 3.5 4.36037 3.42098 4.21971 3.28033C4.07906 3.13968 4.00004 2.94891 4.00004 2.75C4.00004 2.55109 4.07906 2.36032 4.21971 2.21967C4.36037 2.07902 4.55113 2 4.75004 2H11.25C11.449 2 11.6397 2.07902 11.7804 2.21967C11.921 2.36032 12 2.55109 12 2.75C12 2.94891 11.921 3.13968 11.7804 3.28033C11.6397 3.42098 11.449 3.5 11.25 3.5H11V6.782L14.666 12.542C15.619 14.04 14.543 16 12.767 16H3.23304C1.45704 16 0.381044 14.04 1.33404 12.542L5.00004 6.782ZM2.60004 13.347C2.52779 13.4604 2.48735 13.5912 2.48297 13.7256C2.47859 13.86 2.51042 13.9931 2.57513 14.1109C2.63985 14.2288 2.73506 14.3271 2.85081 14.3956C2.96655 14.464 3.09857 14.5001 3.23304 14.5H12.767C12.9015 14.5001 13.0335 14.464 13.1493 14.3956C13.265 14.3271 13.3602 14.2288 13.425 14.1109C13.4897 13.9931 13.5215 13.86 13.5171 13.7256C13.5127 13.5912 13.4723 13.4604 13.4 13.347L12.225 11.5H3.77504L2.60004 13.347ZM9.50004 3.5H6.50004V7C6.50004 7.143 6.46004 7.283 6.38304 7.403L4.73004 10H11.27L9.61704 7.403C9.54029 7.28263 9.49968 7.14276 9.50004 7V3.5Z"
							/>
						</svg>
					</RouterLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	// emits: ['set-page'],
	data() {
		return {
			tabNames: ['teams-list', 'users-list', 'allusers'],
			tabAIsActive: false,
			tabBIsActive: false,
			tabCIsActive: false,
		};
	},
	methods: {
		resetAllTabs() {
			this.tabAIsActive = false;
			this.tabBIsActive = false;
			this.tabCIsActive = false;
		},
		setActivePage(page) {
			// this.$emit('set-page', page);
			this.resetAllTabs();
			if (page === this.tabNames[0]) {
				this.tabAIsActive = true;
			} else if (page === this.tabNames[1]) {
				this.tabBIsActive = true;
			} else {
				this.tabCIsActive = true;
			}
		},
	},
};
</script>

<style scoped>
header {
	width: 100%;
	/* height: 5rem; */
	/* background-color: #11005c; */
	padding-top: 16px;
	/* padding-bottom: 12px; */
	border-bottom: 1px solid var(--color-border-soft);
	margin: 0 auto;
	background-color: var(--color-background-soft);
}

nav {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 40px;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: baseline;
	gap: 12px;
}

li {
	/* margin: 0 2rem; */
}

a {
	font: inherit;
	font-size: 14px;
	background: transparent;
	border: none;
	border-bottom: 3px solid transparent;
	border-radius: 3px;
	cursor: pointer;
	color: var(--color-text);
	height: 48px;
	padding: 8px 24px 16px;
	display: flex;
	gap: 0 8px;
}
h1 a {
	padding: 0 0 12px 0;
	font-size: 18px;
	/* color: var(--color-heading); */
}
h1 svg {
	height: 20px;
	width: 73px;
}
h1 svg path {
	fill: var(--color-text);
}
a:hover,
a:active,
a.router-link-active {
	/* color: #f1a80a; */
	/* border-color: #f1a80a; */
	/* background-color: #1a037e; */
	color: var(--color-heading);
	/* border-color: var(--color-border); */
}
a:active,
a.active,
a.router-link-active {
	border-bottom: 3px solid var(--color-chartreuse-2);
	/* transition: all 2s; */
}

h1 a:active,
h1 a.active,
h1 a.router-link-active {
	border-bottom: 3px solid transparent;
}
.teams,
.members,
.beaker {
	fill: var(--color-text);
}
</style>
