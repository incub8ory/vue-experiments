<template>
	<div class="project-container">
		<div class="sidebar">
			<!-- <nav>
				<router-link :to="{ name: 'experimental' }">
					Lab Experiments
				</router-link>
				&sol; <span>{{ this.projectID }}</span>
			</nav> -->
			<SecondaryNavigation :projectID="projectID" />
			<div class="lede">
				<h2>Photo Locator</h2>
				<p>
					This proof-of-concept application for extracting data from an uploaded
					photo serves as a foundational element for subsequent projects (see
					<router-link :to="{ name: '06' }">N° 06</router-link>,
					<router-link :to="{ name: '07' }">N° 07</router-link>) that rely on
					image EXIF data to identify location.
				</p>
				<details>
					<summary>Technical Notes</summary>
					This app uses
					<a href="https://github.com/exif-js/exif-js">exif-js</a> to extract
					the GPS coordinates from the photos' EXIF data. An earlier version of
					the app used Axios to handle the async API requests and OpenCage API
					for reverse geocoding which I replaced with
					<a href="https://nominatim.org">nominatim</a> (along with
					OpenStreetMap) to translate the GPS coordinates onto a map.
				</details>
			</div>
		</div>
		<div id="showcase">
			<div class="photo-extractor-container">
				<div class="">
					<label for="photo-upload" class=""> Upload a photo </label>
					<input
						type="file"
						id="photo-upload"
						accept="image/*"
						@change="handleFileUpload"
						class="px-4 py-4 rounded-full file:rounded-full file:border-0 file:py-2 file:px-4 file:cursor-pointer file:bg-slate-300 hover:file:bg-sky-100"
					/>
				</div>

				<div v-if="loading" class="">
					<span
						class="inline-block w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"
					></span>
					<p class="">Processing...</p>
				</div>

				<div v-if="error" class="" role="alert">
					<p>{{ error }}</p>
				</div>

				<div v-if="coordinates" class="coords">
					<h3 class="subhead">coordinates</h3>
					<p class="">
						<span class="mono">lat: </span>{{ coordinates.latitude }}
					</p>
					<p class="">
						<span class="mono">lon: </span>{{ coordinates.longitude }}
					</p>
				</div>

				<div v-if="address" class="address">
					<h3 class="subhead">address</h3>
					<p class="">{{ address }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import SecondaryNavigation from '../nav/SecondaryNavigation.vue';
import { ref } from 'vue';
import EXIF from 'exif-js';

const projectID = '05';
const coordinates = ref(null);
const address = ref('');
const loading = ref(false);
const error = ref('');

const handleFileUpload = (event) => {
	const file = event.target.files[0];
	if (!file) return;

	loading.value = true;
	error.value = '';
	coordinates.value = null;
	address.value = '';

	EXIF.getData(file, function () {
		const lat = EXIF.getTag(this, 'GPSLatitude');
		const lon = EXIF.getTag(this, 'GPSLongitude');
		const latRef = EXIF.getTag(this, 'GPSLatitudeRef') || 'N';
		const lonRef = EXIF.getTag(this, 'GPSLongitudeRef') || 'E';

		if (lat && lon) {
			const latitude = convertDMSToDD(lat[0], lat[1], lat[2], latRef);
			const longitude = convertDMSToDD(lon[0], lon[1], lon[2], lonRef);
			coordinates.value = { latitude, longitude };
			fetchAddress(latitude, longitude);
		} else {
			loading.value = false;
			error.value = 'No GPS data found in the image.';
		}
	});
};

const convertDMSToDD = (degrees, minutes, seconds, direction) => {
	let dd = degrees + minutes / 60 + seconds / (60 * 60);
	if (direction === 'S' || direction === 'W') {
		dd = dd * -1;
	}
	return dd;
};

const fetchAddress = async (lat, lon) => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
		);
		const data = await response.json();
		address.value = data.display_name;
	} catch (err) {
		error.value = 'Error fetching address information.';
	} finally {
		loading.value = false;
	}
};
</script>

<style scoped>
.project-container {
	.sidebar {
		padding-top: 40px;
		padding-bottom: 80px;

		nav + .lede {
			padding: 0 40px;
			font-feature-settings: 'ss01' on, 'tnum' on, 'zero' on;

			h2 {
				color: var(--color-heading);
				font-size: 36px;
				/* letter-spacing: -0.03em; */
				line-height: 40px;
				padding-bottom: 36px;
				padding-top: 36px;
			}

			p {
				padding-bottom: 24px;
			}

			a {
				color: var(--color-red-orange);
			}
		}

		details {
			/* font-family: 'HelveticaNowText', 'SF Pro', -apple-system, BlinkMacSystemFont,
			'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji'; */
			margin-top: 24px;
			margin-bottom: 0;
			padding-top: 12px;
			padding-bottom: 8px;
			border-top: 1px solid var(--color-border-soft);
			border-bottom: 1px solid var(--color-border-soft);

			& summary {
				padding-right: 0;
				font-size: 11px;
				text-transform: uppercase;
				letter-spacing: 0.1em;
			}

			a {
				color: var(--color-red-orange);
			}
		}

		details + details {
			margin-top: 0;
			border-top: 0;
		}

		details[open] {
			padding-bottom: 24px;
			padding-right: 80px;

			& summary {
				margin-bottom: 12px;
			}
		}
	}
	#showcase {
		width: 100%;
		height: 100%;
		color: var(--color-text);
		/* margin-left: calc(42vw - 65px); */

		.photo-extractor-container {
			/* font-family: 'HelveticaNowText', 'SF Pro', -apple-system,
				BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial,
				sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; */
			font-feature-settings: 'ss01' on, 'tnum' on, 'zero' on;
			padding-top: 40px;

			label {
				font-size: 16px;
				font-weight: 600;
				padding-bottom: 8px;
				padding-left: 24px;
				letter-spacing: -0.01em;
			}
			input[type='file']::file-selector-button:hover {
				transition: all 0.4s;
			}

			.subhead {
				letter-spacing: 0.05em;
				font-variant: small-caps;
				color: var(--color-text);
				padding-bottom: 12px;
			}

			.coords {
				/* margin-top: 40px; */
				/* margin-bottom: 40px; */
				width: calc(100% - 48px);
				margin: 40px auto;

				p {
					border-bottom: 1px dotted var(--color-border-soft);
					padding-bottom: 12px;
					/* width: calc(100% - 48px); */
					/* margin: 0 auto 12px auto; */
				}

				.mono {
					font-variant: small-caps;
					/* letter-spacing: 0.02em; */
				}
			}
			.address {
				width: calc(100% - 48px);
				margin: 0 auto 12px auto;
				p {
					border-bottom: 1px dotted var(--color-border-soft);
					padding-bottom: 12px;
					/* width: calc(100% - 48px); */
					/* margin: 0 auto 12px auto; */
				}
			}
		}

		/* ol {
			height: calc(100vh - 105px);
			overflow-y: scroll;
			width: calc(58vw);
			z-index: 1;
		} */
	}
}

@media (width >= 1024px) {
	.project-container {
		display: flex;
	}
	.sidebar {
		width: calc(42vw - 40px);
		/* height: calc(100vw - 65px); */
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
		padding: 120px;

		.project-extractor-container {
			/* width: 100%; */
			/* height: 100%; */
			/* padding-left: 40px; */
			/* padding-right: 40px; */
			/* width: calc(58vw); */
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
			/* border-bottom: 1px solid var(--color-border-soft); */
		}
	}

	#showcase {
		margin: 0 auto;
		padding-left: 40px;
		padding-right: 40px;

		.photo-extractor-container {
			/* width: 83%;
			min-width: 320px;
			border: 1px solid #0f0; */
			/* border: 1px solid #f00;
			width: 83%; */
			margin: 0 auto;
			width: 81%;
			/* border: 1px solid #0f0; */

			/* max-width: 320px; */
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

	#showcase {
		width: 100%;

		.photo-extractor-container {
			padding-left: 0;
			padding-right: 0;
			width: 100%;
			/* border: 1px solid #00f; */
			/* max-width: 320px; */
		}
	}
}
</style>
