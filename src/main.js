import './assets/main.css';

import { createApp } from 'vue';

// moved store into its own directory
// import { createStore } from 'vuex';

import store from './store';

import router from './router';

// import AOS from 'aos'; 
// for handling ExifPhotoViewer animations
import 'aos/dist/aos.css';

// for MapComponent
import 'leaflet/dist/leaflet.css';

import App from './App.vue';


const app = createApp(App);

app.use(store);
app.use(router);

// router.isReady().then(function () {
// 	app.mount('#app');
// });

app.mount('#app');