<template>
	<div :id="mapId" class="map-container"></div>
</template>

<script>
import { onMounted } from 'vue';
import L from 'leaflet';
import markerIcon from '../../../public/img/leaflet/marker-icon.png';

export default {
	name: 'MapComponent',
	props: {
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
		mapId: {
			type: String,
			required: true,
		},
		mapTitle: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		onMounted(() => {
			L.Marker.prototype.setIcon(
				L.icon({
					iconUrl: markerIcon,
				})
			);
			const map = L.map(props.mapId).setView(
				[props.latitude, props.longitude],
				9
			);

			// stamen url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
			// stamen url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png"
			// leaflet url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			L.tileLayer(
				'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png',
				{
					maxZoom: 20,
				}
			).addTo(map);

			L.marker([props.latitude, props.longitude]).addTo(map);
			// .bindPopup(props.mapTitle)
			// .openPopup();
		});
	},
};
</script>

<style scoped>
.map-container {
	width: 100%;
	/* height: 120px; */
	/* opacity: 0.6; */
	/* filter:sepia(100); */
}
/* .map-container:hover {
	opacity: 1;
	background-color: var(--color-background);
	transition: 0.4s;
} */
.leaflet-container {
	background-color: transparent;
}
</style>
