<template>
    <div class="container">
        <br>
        <h1 class="text-center">Carreras</h1>
        <br>
        <div v-if="load">
            <h3>Cargando contenido...</h3>
            <pulse-loader :loading="load" ></pulse-loader>
        </div>
        <button  @click="$bvModal.show('modal-add')" class="btn btn-success btn-block">Agregar</button>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Carrera</th>
                    <th scope="col">Area</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of careers" :key="item.id" >
                        <th>{{item.Nombre}}</th>
                        <th>{{item.AreaConocimiento}}</th>
                        <th>
                            <div class="form-label-group text-center">
                                <button  @click="$bvModal.show('modal-update'),getCareer(item.id)" class="btn btn-warning btn-sm">Editar</button>
                                <button  @click="deleteCareer(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-modal id="modal-add" hide-footer>
          <template v-slot:modal-title>
            <h3 class="text-center">Agregar Carrera</h3>
          </template>
          <div class="d-block text-center">
            <form class="form-inline" @submit.prevent="addCareer({name,careersChecked})">
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                    <div class="input-group-text">Nombre</div>
                    </div>
                    <input type="text" class="form-control" v-model="name">
                </div>
                <div v-for="item of arrayAreas" :key="item.id">
                    <li>
                        <input type="checkbox"  v-bind:value="item.id" v-model="careersChecked">
                    </li>
                    <label >{{item.Nombre}}</label>
                </div>
            <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-add'),getCareers()">Agregar</b-button>
            </form>
            <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-add')">Cancelar</b-button>
          </div>
        </b-modal>

        <b-modal id="modal-update" hide-footer>
          <template v-slot:modal-title>
            <h3 class="text-center">Edición Carrera</h3>
          </template>
          <div class="d-block text-center">
            <form class="form-inline" @submit.prevent="updateCareer(career)">
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                    <div class="input-group-text">Nombre</div>
                    </div>
                    <input type="text" class="form-control" v-model="career.Nombre">
                </div>
                <div v-for="item of arrayAreas" :key="item.id">
                    <li >
                        <input type="checkbox"  v-bind:value="item.id" v-model="career.AreaConocimiento">
                    </li>
                    <label >{{item.Nombre}}</label>
                </div>
            <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-update'),getCareers()">Editar</b-button>
            </form>
            <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-update')">Cancelar</b-button>
          </div>
        </b-modal>

    </div>
</template>

<script>
import{mapActions, mapState} from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name:'Career',
    data() {
        
        return {
            name: '',
            careersChecked: [],
        }
    },
    methods: {
        ...mapActions(['getCareers','getKnowledgeAreas','addCareer','deleteCareer','getCareer','updateCareer'])
    },
    created() {
        this.getCareers();
        this.getKnowledgeAreas();
    },
    computed: {
        ...mapState(['careers','arrayAreas','career','load'])
        /*
        ArrayNames:function(){
            let arrayNames = [];
            let arrayNamesG = [];

            for(var careers of this.$store.state.careers){
                    // console.log("******"+careers.Nombre+"******");
                for(var careersArea of careers.AreaConocimiento){
                    // console.log(careersArea);
                    for(var areaId of this.$store.state.arrayAreas){
                        // console.log("Coleccion Area " +areaId.id);
                        if(areaId.id == careersArea){
                            arrayNames.push(areaId.Nombre);
                            console.log("Nombreee"+areaId.Nombre);
                        }
                    }
                }
                console.log("******Nombre Arrat "+arrayNames);
                arrayNamesG.push(this.$store.state.careers);
                arrayNames = [];
            }

            for(var im of arrayNamesG){
                console.log("**********************nuevo*******************");
                console.log(im.Nombre);
                console.log(im.AreaConocimiento);
            }

            
            for(let careers of this.$store.state.careers){
                console.log(careers.Nombre+" Area..................");
                for(let careersArea of careers.AreaConocimiento){
                    for(let areaId of this.$store.state.arrayAreas){

                        if(areaId.id === careersArea){
                            arrayNames.push({nombre:areaId.Nombre,id:careersArea.id});
                        }
                    }
                }
            }
            return arrayNamesG;
        }
        */

    },
    components: {
        PulseLoader
    }
}
</script>