<template>
    <div id="main-panel">
        <div>
            
            <div>
                <span>
                    <i
                        class="fas fa-layer-group mt-2" 
                        @click="layersToggle"
                        @click.once="tableNames"
                        :style="{
                            color: $store.state.layers.iconColor,
                            fontSize:'1.2vw',
                            marginLeft:'0.3vw',
                            marginRight: '0.3vw' 
                        }"
                    >
                    </i>
                </span>
            </div>
            <div>
                <span>
                    <i
                        class="fas fa-tools mt-3" 
                         @click="toolsToggle"
                        :style="{
                            color: $store.state.tools.iconColor,
                            fontSize:'1.2vw',
                            marginLeft:'0.3vw',
                            marginRight: '0.3vw' 
                        }"
                    >
                    </i>
                </span>
            </div>
            
            <div>
                <span>
                    <i
                        class="fas fa-database  mt-3" 
                        @click="databaseToggle(); tableNames()"
                        :style="{
                            color: $store.state.database.iconColor,
                            fontSize:'1.2vw',
                            marginLeft:'0.3vw',
                            marginRight: '0.3vw' 
                        }"
                    >
                    </i>
                </span>
            </div>
            <div>
                <span>
                    <i
                        class="fas fa-layer-group  mt-3" 
                        @click="layerToggle"
                        :style="{
                            color: $store.state.layer.iconColor,
                            fontSize:'1.2vw',
                            marginLeft:'0.3vw',
                            marginRight: '0.3vw' 
                        }"
                        
                    >
                    </i>
                </span>
            </div>
            
        </div>
        
        <span id="mouse-coordinate-icon" class="mouse-coordinate-icon" @click="MouseCoordinateToggle">
            <i id="tgl-arrow" class="fas fa-angle-double-left" :style="{ color: $store.state.mouseCoordinate.iconColor,fontSize:'1.2vw' }"></i>
        </span>
                
        
    </div>

    
</template>

<script>
import $ from 'jquery'
$(function() {
    $('#mouse-coordinate-icon').click(function () {
        $('#tgl-arrow').toggleClass('fa-angle-double-left fa-angle-double-right');
    });
});
export default {
    name: "Panel",
    components:{
        //MouseCoordinate
    },
    methods:{
        MouseCoordinateToggle(){
            
            this.$store.commit('mouseCoordinate/setMouseCoordinateToggle')
        },
        databaseToggle(){
            this.$store.commit('database/setDatabaseToggle')
        },
        tableNames(){
            this.$store.dispatch('database/getTableNames')
            this.$store.dispatch('layers/getTableNames')
        },
        layerToggle(){
            this.$store.commit('layer/setLayerToggle')
        },
        layersToggle(){
            this.$store.commit('layers/setLayersToggle')
        },
        toolsToggle(){
            this.$store.commit('tools/setToolsToggle')
        }

    },
}
</script>

<style scoped>
    #main-panel{
        position:absolute;
        
        display: inline-block;
        height:100vh;
        z-index:999;
        background-color: rgb(34, 33, 33);
        color:rgb(126, 122, 122);
        
    }
    .mouse-coordinate-icon{
        position: absolute;
        bottom:0.5vh;
        left:0.2vw
    }
    span:hover{
        cursor:pointer
    }
   
</style>