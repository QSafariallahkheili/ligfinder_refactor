import axios from "axios"

const area = {
    namespaced: true,
    state:{
        landAreaMin:0,
        landAreaMax:100,
        areaRange: [0,4073828],
        grossFloorAreaRange: [0,4073828]
    },
    mutations:{

    },
    actions:{
        areaFilter({state, rootState}){
            console.log(rootState.ligfinder.FOIGid)
            axios
            .post('http://localhost:3000/get-area-filter', {
                featureIds : rootState.ligfinder.FOIGid,
                areaRange: state.areaRange,
                grossFloorAreaRange: state.grossFloorAreaRange,
            })
            .then(response => {
                rootState.ligfinder.FOI = response.data

                console.log(rootState.ligfinder.FOI.features)
                response.data.name = "foi"
                for (let i=0; i<rootState.layers.addedLayers.length; i++){
                    if(rootState.layers.addedLayers[i].name === "foi"){
                        rootState.layers.addedLayers.splice(i, 1);
                    }
                }
                rootState.layers.addedLayers.push(response.data)
                
                const mapLayer = rootState.map.map.getLayer("foi");
                if(typeof mapLayer !== 'undefined'){
                    rootState.map.map.removeLayer("foi")
                    rootState.map.map.removeSource("foi")
                }
                rootState.map.map.addSource(("foi"),{'type': 'geojson', 'data': rootState.ligfinder.FOI});
                let layerName = {
                    'id': "foi",
                    'type': 'fill',
                    'source': "foi", // reference the data source
                    'layout': {},
                    'paint': {
                        'fill-color': '#00FF00', 
                        'fill-opacity':0.7,
                        'fill-outline-color': '#000000',
                    }
                    
                };
                
                rootState.map.map.addLayer(layerName)
            })
        }
    },
    getters:{

    }
}

export default area