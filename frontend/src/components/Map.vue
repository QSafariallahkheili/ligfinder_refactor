<template>
  <div class="map-container" ref="myMap">
    <div class="placeholder"  id="map">
       <MouseCoordinate />
       <Panel />
       <Database />
       <Layer />
       <Layers />
       <Tools />
       <Ligfinder />
       <Geoparsing />
       <Classification />
       <Legend />
    </div>
   
  </div>
</template>

<script>

import maplibregl from 'maplibre-gl'
//import {MapboxLayer} from '@deck.gl/mapbox';
//import {Deck} from '@deck.gl/core';
//import {PolygonLayer} from '@deck.gl/layers';
//import transformRotate from "@turf/transform-rotate";
//import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
//import { PlaneGeometry } from "@luma.gl/engine";

//import * as turf from "turf";
import MouseCoordinate from "./MouseCoordinate";
import Panel from './Panel'
import Database from './Database'
import Layer from './Layer'
import Layers from './Layers'
import Tools from './Tools'
import Ligfinder from './Ligfinder'
import Geoparsing from './Geoparsing'
import Classification from './Classification'
import Legend from './Legend'

export default {
  name: "Map",
  components:{
    Panel,
    MouseCoordinate,
    Database,
    Layer,
    Layers,
    Tools,
    Ligfinder,
    Geoparsing,
    Classification,
    Legend
  },
  mounted: function() {
    this.$store.state.map.map = new maplibregl.Map({
      container: this.$refs.myMap,
      style: 'https://api.maptiler.com/maps/basic/style.json?key=XgdreUwN4V3uEHHZHsWO',
      center: [this.$store.state.map.initialLongitude,  this.$store.state.map.initialLatitude],
      zoom: this.$store.state.map.initialZoom,
      maxZoom: this.$store.state.map.maxZoom,
      minZoom: this.$store.state.map.minZoom
    });
     
    this.$store.state.map.map.on('load', () => {
      
        this.$store.state.map.map.on('click', 'geocoded', (e) => {
            this.$store.dispatch('geoparsing/showAttribute', e)

        })
        /*const a = document.createElement('a');
        a.href = this.$store.state.map.map.getCanvas().toDataURL();
        a.download = 'map.pdf';
        document.body.appendChild(a);
        a.click();*/

      
    });

    this.$store.state.map.map.on('mousemove', (e) => {
      //console.log(JSON.stringify(e.lngLat));
      let coords = e.lngLat
      this.$store.commit('mouseCoordinate/setMouseCoordinate', coords);
    });

  }
   
};
</script>

<!--"scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';
.map-container {
  height: 100%;
  width: 100%;
}
.placeholder {
  height: 100%;
  width: 100%;
  position:absolute;
  background-color: darkgray;
 
}
.placeholder .placeholder-text {
  margin: auto;
}

</style>
