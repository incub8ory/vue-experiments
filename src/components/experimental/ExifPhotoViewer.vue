<template>
	<div class="main-container" id="stamp-collector">
		<h2>Eki Stamps</h2>
		<p class="lede">
			Collection of {{ this.images.length }} stamps (駅スタンプ) taken at train
			stations and other locations in Japan
		</p>
		<ol>
			<li v-for="image in images" :key="image.id" data-aos="fade-up" data-aos-offset='240'>
				<div class="card bg-gray-50">
					<img :src="this.baseURL + image.src" alt="Photo" class="photo" />
					<article>
						<div class="content-main text-slate-900">
							<span class="eyebrow mono">{{ image.date }}</span>
							<h3>{{ image.title }}</h3>
							<p v-if="image.location">
								{{ image.location.address }}
							</p>
						</div>

						<div v-if="image.location" class="footnote font-mono uppercase">
							<p class="text-slate-400">Lat: {{ image.location.latitude }}</p>
							<p class="text-slate-400">Long: {{ image.location.longitude }}</p>
						</div>
					</article>
				</div>
			</li>
		</ol>
	</div>
</template>

<script>
import EXIF from 'exif-js';
// import axios from 'axios';
import AOS from 'aos';

export default {
	data() {
		return {
			baseURL: '/vue-experiments',
			images: [
				{
					id: '000',
					title: 'Momo Bao',
					src: '/img/stamp/000.jpeg',
				},
				{
					id: '001',
					title: 'Ichiran Ramen',
					src: '/img/stamp/001.jpeg',
				},
				{
					id: '002',
					title: 'JR Fruit Park',
					src: '/img/stamp/002.jpeg',
				},
				{
					id: '004',
					title: 'Street Food Park',
					src: '/img/stamp/004.jpeg',
				},
				// Add more images here
			],
		};
	},
	mounted() {
		this.images.forEach((image) => {
			this.extractLocationData(this.baseURL + image.src);
		});
		AOS.init({
			duration: 1200,
		});
	},
	methods: {
		// Extract EXIF data and location from image
		extractLocationData(imageSrc) {
			const image = this.images.find(
				(img) => this.baseURL + img.src === imageSrc
			);
			const imgElement = new Image();

			imgElement.onload = () => {
				EXIF.getData(imgElement, () => {
					const lat = EXIF.getTag(imgElement, 'GPSLatitude');
					const lon = EXIF.getTag(imgElement, 'GPSLongitude');
					const dateStamp = EXIF.getTag(imgElement, 'GPSDateStamp');

					// const allTags = EXIF.getAllTags(imgElement);
					// const allTagsString = JSON.stringify(allTags, null, "\t");
					// console.log('all tags: ' + allTagsString);

					if (lat && lon) {
						const latitude = this.convertToDecimal(lat);
						const longitude = this.convertToDecimal(lon);

						console.log('dateStamp: ' + dateStamp);
						image.date = this.convertExifDate(dateStamp);

						// Fetch address using geocoding API
						// this.getAddressFromCoordinates(latitude, longitude)
						this.fetchAddress(latitude, longitude)
							.then((address) => {
								image.location = { latitude, longitude, address };
							})
							.catch((err) => console.error(err));
					} else {
						image.location = { error: 'No GPS data found.' };
					}
				});
			};

			imgElement.src = imageSrc;
		},

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

		// Convert GPS coordinates to decimal format
		convertToDecimal(gpsData) {
			if (Array.isArray(gpsData)) {
				const degrees = gpsData[0];
				const minutes = gpsData[1];
				const seconds = gpsData[2];
				return degrees + minutes / 60 + seconds / 3600;
			}
			return null;
		},

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
	font-size: 24px;
	font-feature-settings: 'ss01' on, 'zero' on;
	line-height: 1.2;
	/* color: var(--color-text); */
	font-weight: 800;
	padding-bottom: 24px;
}
ol {
	width: 100%;

	& li {
		padding: 120px 40px;
		/* border-bottom: 1px dotted var(--color-border-soft); */

		.card {
			margin: 0 auto;
			display: flex;
			max-width: 900px;
			border-radius: 12px;
			gap: 0 40px;
		}

		.photo {
			width: 440px;
			/* width: calc(33vw - 40px); */
			height: 440px;
			object-fit: cover;
			border-top-left-radius: 12px;
			border-bottom-left-radius: 12px;
		}
	}
}
/* ol li:nth-of-type(2n+1) {
	background-color: var(--color-background-muter);
} */
.card article {
	padding: 64px 40px 40px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.card article h3 {
	font-size: 40px;
	padding: 0;
}
.card article h3 + p {
	padding: 8px 0;
	font-size: 18px;
}
.card article .footnote {
	font-size: 11px;
	line-height: 150%;
}
/* old styles */
ul {
	display: flex;
	list-style: none;
	padding: 24px 0 160px 0;
	margin: 0;
	gap: 24px 40px;
	flex-wrap: wrap;
	width: calc(100vw - 80px);
}
ul li {
	padding: 0;
	margin: 0;
	width: calc(33.3vw - 64px);
}
ul li:hover {
	cursor: pointer;
}
ul li:hover h3 a {
	color: var(--color-heading);
	transition: all 0.4s ease-in;
}
ul li .eyebrow.mono {
	font-size: 14px;
	font-weight: 500;
	display: block;
	padding-top: 16px;
	border-top: 1px dotted var(--color-border);
}
ul li:hover .eyebrow.mono {
	border-top: 1px solid var(--color-border);
}
.list-animation-enter-from {
	opacity: 0;
	filter: blur(2px);
}

ul li .photo {
	width: calc(33vw - 40px);
	height: 320px;
	margin-bottom: 10px;
	object-fit: cover;
	border-radius: 3px;
}

ul li p {
	font-size: 14px;
}
</style>
