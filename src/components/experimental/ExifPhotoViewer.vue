<template>
	<div class="main-container" id="stamp-collector">
		<h2>Eki Stamps</h2>
		<p class="lede">
			Collection of {{ this.ekiStampsDataStore.length }} stamps (駅スタンプ) taken at train
			stations and other locations in Japan
		</p>
		<ol>
			<li
				v-for="image in this.ekiStampsDataStore"
				:key="image.id"
				data-aos="fade-up"
				data-aos-offset="240"
			>
				<div class="border border-dotted border-stone-500 card">
					<img
						:src="this.$store.state.ekiStampModule.baseURL + image.src"
						:alt="image.title"
						class="photo"
					/>					<article class="bg-white dark:bg-stone-900">
						<div class="content-main text-stone-500 dark:text-stone-50">
							<span class="eyebrow mono">{{ image.date }}</span>
							<h3 class="text-stone-700 dark:text-stone-50">
								<!-- <span class="text-stone-400 dark:text-stone-200">{{ image.id }} / </span> -->
								{{ image.title }}
							</h3>
							<p v-if="image.location">
								{{ image.location.address }}
							</p>
						</div>

						<div v-if="image.location" class="font-mono uppercase footnote">
							<p class="text-slate-400">Lat: {{ image.location.latitude }}</p>
							<p class="text-slate-400">Long: {{ image.location.longitude }}</p>
						</div>
					</article>
				</div>
				<MapComponent
					v-if="image.location"
					:mapId="image.id"
					:mapTitle="image.title"
					:latitude="image.location.latitude"
					:longitude="image.location.longitude"
					class="border border-dotted border-stone-500"
				/>
			</li>
		</ol>
	</div>
</template>

<script>
// import EXIF from 'exif-js';
// import axios from 'axios';
import exifr from 'exifr';
import AOS from 'aos';

import MapComponent from '@/components/experimental/MapComponent.vue';

import { mapGetters } from 'vuex';

export default {
	components: {
		MapComponent,
	},

	// data() {
	// 	return {
	// 		baseURL: '/vue-experiments',
	// 		images: [
	// 			{
	// 				id: '000',
	// 				title: 'Momo Bao',
	// 				src: '/img/stamp/000.jpeg',
	// 			},
	// 			{
	// 				id: '001',
	// 				title: 'Ichiran Ramen',
	// 				src: '/img/stamp/001.jpeg',
	// 			},
	// 			{
	// 				id: '002',
	// 				title: 'JR Fruit Park',
	// 				src: '/img/stamp/002.jpeg',
	// 			},
	// 			{
	// 				id: '004',
	// 				title: 'Street Food Park',
	// 				src: '/img/stamp/004.jpeg',
	// 			},
	// 			// Add more images here
	// 		],
	// 	};
	// },
	
	computed: {
		...mapGetters(['ekiStampsDataStore']),
	},
	mounted() {
		this.ekiStampsDataStore.forEach((image) => {
			// this.extractLocationData(image.src);
			this.getExifrGPS(this.$store.state.ekiStampModule.baseURL + image.src);
		});
		AOS.init({
			duration: 1200,
		});
	},
	methods: {
		// use exifr rather than exif-js to get GPS lat, long, date
		async getExifrGPS(imageSrc) {
			// const file = event.target.files[0];
			const image = this.ekiStampsDataStore.find((img) => this.$store.state.ekiStampModule.baseURL + img.src === imageSrc);
			const imgElement = new Image();

			try {
				const exifData = await exifr.gps(imageSrc);
				const dateStamp = await exifr.parse(imageSrc, ['GPSDateStamp']);
				if (exifData && exifData.latitude && exifData.longitude) {
					const latitude = exifData.latitude;
					const longitude = exifData.longitude;

					// console.log('dateStamp.GPSDateStamp: ' + dateStamp.GPSDateStamp);
					image.date = this.convertExifDate(dateStamp.GPSDateStamp);

					this.fetchAddress(latitude, longitude)
						.then((address) => {
							image.location = { latitude, longitude, address };
							// console.log('exifr address: ' + image.location.address);
						})
						.catch((err) => console.error(err));
				} else {
					console.warn('No EXIF data found');
				}
			} catch (error) {
				console.error('Error reading EXIF data:', error);
			}

			imgElement.src = imageSrc;
		},

		// // Method for use with exif-js (or OpenCage)
		// // Extract EXIF data and location from image
		// extractLocationData(imageSrc) {
		// 	const image = this.images.find(
		// 		(img) => this.baseURL + img.src === imageSrc
		// 	);
		// 	const imgElement = new Image();

		// 	imgElement.onload = () => {
		// 		EXIF.getData(imgElement, () => {
		// 			const lat = EXIF.getTag(imgElement, 'GPSLatitude');
		// 			const lon = EXIF.getTag(imgElement, 'GPSLongitude');
		// 			const dateStamp = EXIF.getTag(imgElement, 'GPSDateStamp');

		// 			// const allTags = EXIF.getAllTags(imgElement);
		// 			// const allTagsString = JSON.stringify(allTags, null, "\t");
		// 			// console.log('all tags: ' + allTagsString);

		// 			if (lat && lon) {
		// 				const latitude = this.convertToDecimal(lat);
		// 				const longitude = this.convertToDecimal(lon);

		// 				console.log('dateStamp: ' + dateStamp);
		// 				image.date = this.convertExifDate(dateStamp);

		// 				// Fetch address using geocoding API
		// 				// this.getAddressFromCoordinates(latitude, longitude)
		// 				this.fetchAddress(latitude, longitude)
		// 					.then((address) => {
		// 						image.location = { latitude, longitude, address };
		// 					})
		// 					.catch((err) => console.error(err));
		// 			} else {
		// 				image.location = { error: 'No GPS data found.' };
		// 			}
		// 		});
		// 	};

		// 	imgElement.src = imageSrc;
		// },

		// change ExifDate format from yyyy:mm:dd to dd mmm yyyy
		convertExifDate(exifDate) {
			// Convert input string to a Date object
			const dateParts = exifDate.split(':');
			const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Month is 0-based in JS Date

			// Format the date to 'dd mmm yyyy'
			const options = { year: 'numeric', month: 'short', day: '2-digit' };
			const formattedDate = date
				.toLocaleDateString('en-GB', options)
				.replace(',', '');

			// console.log(formattedDate); // Output: "12 Mar 2024"
			return formattedDate;
		},

		// // Method used for exif-js or OpenCage
		// // Convert GPS coordinates to decimal format
		// convertToDecimal(gpsData) {
		// 	if (Array.isArray(gpsData)) {
		// 		const degrees = gpsData[0];
		// 		const minutes = gpsData[1];
		// 		const seconds = gpsData[2];
		// 		return degrees + minutes / 60 + seconds / 3600;
		// 	}
		// 	return null;
		// },

		// Uses OpenCage API; requires API key
		// Geocoding API to get human-readable address
		// async getAddressFromCoordinates(latitude, longitude) {
		// 	// const apiKey = this.openCageAPIKey; // Replace with your OpenCage API Key
		// 	const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
		// 	const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

		// 	try {
		// 		const response = await axios.get(url);

		// 		if (response.data.results.length > 0) {
		// 			return response.data.results[0].formatted;
		// 		} else {
		// 			throw new Error('Address not found.');
		// 		}
		// 	} catch (error) {
		// 		console.error('Geocoding error:', error);
		// 		return 'Address not found';
		// 	}
		// },

		// Use nominatim instead of opencage to reverse-geocode address
		async fetchAddress(latitude, longitude) {
			const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				// photo.address = response.data.display_name;
				return data.display_name;
			} catch (err) {
				// error.value = 'Error fetching address information.';
				console.error('Geocoding error:', error);
				return 'Address not found';
			}
		},
	},
};
</script>

<style scoped>
.main-container {
	padding: 40px 0;
}
h2 {
	font-family: 'Onest', 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 96px;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1;
	padding: 0 40px;
}
.lede {
	padding: 16px 0 80px 40px;
	max-width: 560px;
	font-size: 24px;
	font-feature-settings: 'ss01' on;
}
h3 {
	font-family: 'Gloock', 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 48px;
	/* font-size: 40px; */
	font-feature-settings: 'ss01' on, 'zero' on;
	line-height: 1;
	font-weight: 800;
	letter-spacing: -0.02em;
	padding: 8px 0 12px 0;

	& span {
		font-weight: 800;
	}
}
ol {
	padding-bottom: 240px;

	& li {
		padding: 120px 40px;

		.card {
			margin: 0 auto;
			max-width: calc(100vw - 160px);
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
		}

		.photo {
			min-width: calc(100vw - 160px);
			height: 320px;
			object-fit: cover;
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
		}
	}
}
.card article {
	padding: 48px 40px 40px 40px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-top-right-radius: 12px;
}
.card article .content-main {
	padding-bottom: 64px;
}
.card article .content-main p {
	font-size: 16px;
	padding-right: 24px;
}
.map-container {
	width: calc(100vw - 160px);
	height: 120px;
	margin: 0 auto;
	border-top: 0;
	border-bottom-left-radius: 12px;
	border-bottom-right-radius: 12px;
	overflow-y: hidden;
}

@media (width >= 48rem) {
	h3 {
		font-size: 56px;

		span {
			font-size: 40px;
			display: block;
		}
	}
	ol li .card {
		display: flex;
		max-width: 960px;
	}
	ol li .card article .content-main {
		padding-bottom: 0;
	}
	ol li .photo {
		width: 380px;
		min-width: calc(40vw - 80px);
		height: 480px;
		border-top-left-radius: 12px;
		border-top-right-radius: 0;
	}

	.map-container {
		width: calc(100vw - 80px);
		max-width: 960px;
		height: 120px;
	}
}
.card .eyebrow {
	font-size: 13px;
	text-transform: uppercase;
}
.card article h3 + p {
	padding: 8px 0;
	font-size: 18px;
}
.card article .footnote {
	font-size: 11px;
	line-height: 150%;
}
</style>
