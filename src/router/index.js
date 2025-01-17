import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../pages/HomeView.vue';
import TeamsList from '../pages/TeamsList.vue';
import TeamsFooter from '../components/layouts/TeamsFooter.vue';
import UsersList from '../pages/UsersList.vue';
import MembersFooter from '../components/layouts/MembersFooter.vue';
import NewResource from '../pages/NewResource.vue';
import TeamMembers from '../components/teams/TeamMembers.vue';
import NotFound from '../components/nav/NotFound.vue';

import TheExperiments from '../components/experimental/TheExperiments.vue';
import ShoppingList from '../components/experimental/ShoppingList.vue';
import VueX from '@/components/experimental/VueX.vue';
import TeaTasting from '@/components/experimental/TeaTasting.vue';
import TeaDetailsPage from '@/components/experimental/TeaDetailsPage.vue';
import VueXTutorial from '@/components/experimental/VueXTutorial.vue';

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ name: 'home', path: '/vue-experiments', component: HomeView, alias: '/' }, // home
		{
			name: 'teams',
			path: '/teams',
			meta: { needsAuth: true },
			// component: TeamsList
			components: { default: TeamsList, footer: TeamsFooter },
		},
		{
			name: 'team-members',
			path: '/teams/:teamId',
			component: TeamMembers,
			props: true,
		},
		{
			path: '/members',
			// component: UsersList
			components: { default: UsersList, footer: MembersFooter },
			beforeEnter(to, from, next) {
				// sample navigation guards using beforeEnter
				console.log('/members beforeEnter');
				console.log(to, from);
				next();
			},
		}, // dynamic route with dynamic parameter
		{
			name: 'new',
			path: '/vocabulary/new',
			component: NewResource,
			props: true,
		},
		{
			name: 'experimental',
			path: '/experimental/',
			component: TheExperiments,
			alias: '/experimental/home',
		},
		{
			name: 'list',
			path: '/experimental/list',
			component: ShoppingList,
		},
		{
			name: 'tea',
			path: '/experimental/tea',
			component: TeaTasting,
		},
		{
			name: 'tea-details',
			path: '/tea/:teaId',
			component: TeaDetailsPage,
			props: true,
		},
		{
			name: 'vuex',
			path: '/experimental/vuex',
			component: VueX,
		},
		{
			name: 'vuex-tutorial',
			path: '/experimental/vuex-tutorial',
			component: VueXTutorial,
		},
		{ path: '/404', component: NotFound },
		{ path: '/:notFound(.*)', redirect: '/404' }, // catch all route
	],
	linkActiveClass: 'active', // redefine custom active link classname to replace vue default
	scrollBehavior(to, from, savedPosition) {
		console.log(to, from, savedPosition); // savedPosition invoked from back button
		if (savedPosition) {
			return savedPosition;
		} else {
			return { left: 0, top: 0 };
		}
	},
});

// sample for navigation guards
router.beforeEach(function (to, from, next) {
	console.log('global beforeEach');
	console.log(to, from);

	// example using route metadata
	if (to.meta.needsAuth) {
		console.log('Needs auth');
		next();
	} else {
		next();
	}

	// if (to,name === 'team-members') {
	// 	next();
	// } else {
	// 	next( { name: 'team-members', params: { teamId: 't2' }})
	// }

	// next();
});

router.afterEach(function (to, from) {
	// afterEach can be used for sending analytics data
	// not used for controlling what's displayed since it runs after next is invoked
	console.log('Global afterEach');
	console.log(to, from);
});

export default router;
