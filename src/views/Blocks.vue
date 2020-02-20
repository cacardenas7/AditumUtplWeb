<template>
    <div class="container">
        <br>
        <h1 class="text-center">Bloques</h1>
        <br>

        <select v-model="selected" class="mr-2">
            <option disabled value="">Elija carrera</option>
            <option v-for="item of arrayAreas" :key="item.id" v-bind:value="item.id">{{item.Nombre}}</option>
        </select>
        <!-- Bloques -->
        <button @click="getBlocks(selected)" class="btn btn-primary mr-2">Buscar</button>
        <button @click="$bvModal.show('modal-add-block')" class="btn btn-success btn- block">Agregar Bloque</button>
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Nombre Bloque</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of arrayBlocks" :key="item.id" >
                    <th>{{item.NombreBloque}}</th>

                    <th>
                        <button @click="$bvModal.show('modal-update-block'), getBlock({idArea:selected,idBlock:item.id})" class="btn btn-warning btn-sm mr-2">Editar</button>
                        <button @click="deleteBlocks({idArea:selected,idBlock:item.id}),getBlocks(selected)" class="btn btn-danger btn-sm mr-2">Eliminar</button>
                        <button @click="getBanks({idArea:selected,idBlock:item.id}),saveIdBlock(item.id)" class="btn btn-info btn-sm">Visualizar</button>
                    </th>
                </tr>
            </tbody>
        </table>

        <b-modal id="modal-add-block" hide-footer>
            <template v-slot:modal-title>
                <h3 class="text-center">Agregar Bloques</h3>
            </template>
            <div class="d-block text-center">
                <form @submit.prevent="addBlocks({idArea:selected,NombreBloque:blockName})">
                    
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Nombre</div>
                    </div>
                        <input type="text" class="form-control" v-model="blockName">
                    </div>
                <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-add-block'),getBlocks(selected)">Agregar</b-button>
                </form>
                <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-add-block')">Cancelar</b-button>
            </div>
        </b-modal>

        <b-modal id="modal-update-block" hide-footer>
            <template v-slot:modal-title>
                <h3 class="text-center">Edición Bloques</h3>
            </template>
            <div class="d-block text-center">
                <form class="form-inline" @submit.prevent="updateBlock(block),getBlocks(selected)">
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Nombre</div>
                        </div>
                        <input type="text" class="form-control" v-model="block.NombreBloque">
                    </div>
                <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-update-block')">Editar</b-button>
                </form>
                <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-update-block')">Cancelar</b-button>
            </div>
        </b-modal>

        <!-- Banco de Preguntas -->
        <button @click="$bvModal.show('modal-add-question')" class="btn btn-success btn-block">Agregar Preguntas</button>
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">Dificultad</th>
                <th scope="col">Pregunta</th>
                <th scope="col">Pregunta imagen</th>
                <th scope="col">Respuesta 1</th>
                <th scope="col">Respuesta 2</th>
                <th scope="col">Respuesta 3</th>
                <th scope="col">Respuesta Correcta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of arrayBank" :key="item.id" >
                    <th>{{item.Dificultad}}</th>
                    <th>{{item.Pregunta}}</th>
                    <th>{{item.PreguntaImagen}}</th>
                    <th>{{item.Rta1}}</th>
                    <th>{{item.Rta2}}</th>
                    <th>{{item.Rta3}}</th>
                    <th>{{item.RtaCorrecta}}</th>
                    <th>
                        <button @click="$bvModal.show('modal-update-question'),getBank({idArea:selected,idBlock:sIdBlock,idBank:item.id})" class="btn btn-warning btn-sm mr-2">Editar</button>
                        <button @click="deleteBanks({idArea:selected,idBlock:sIdBlock,idBank:item.id}),getBanks({idArea:selected,idBlock:sIdBlock})" class="btn btn-danger btn-sm">Eliminar</button>
                    </th>
                </tr>
            </tbody>
        </table>

        <b-modal id="modal-add-question" hide-footer>
            <template v-slot:modal-title>
                <h3 class="text-center">Agregar preguntas</h3>
            </template>
            <div class="d-block text-center">
                <form class="form-inline" @submit.prevent="addBanks({idArea:selected,idBlock:sIdBlock,Dificultad:dificultad,Pregunta:pregunta,PreguntaImagen:preguntaImagen,Rta1: respuesta1,Rta2: respuesta2,Rta3: respuesta3,RtaCorrecta: respuestaCorrecta})">
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Dificultad</div>
                    </div>
                        <input type="text" class="form-control" v-model="dificultad">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Pregunta</div>
                    </div>
                        <input type="text" class="form-control" v-model="pregunta">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Pregunta imagen</div>
                    </div>
                        <input type="text" class="form-control" v-model="preguntaImagen">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta 1</div>
                    </div>
                        <input type="text" class="form-control" v-model="respuesta1">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta 2</div>
                    </div>
                        <input type="text" class="form-control" v-model="respuesta2">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta 3</div>
                    </div>
                        <input type="text" class="form-control" v-model="respuesta3">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta correcta</div>
                    </div>
                        <input type="text" class="form-control" v-model="respuestaCorrecta">
                    </div>
                <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-add-question'),getBanks({idArea:selected,idBlock:sIdBlock})">Agregar</b-button>
                </form>
                <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-add-question')">Cancelar</b-button>
            </div>
        </b-modal>

        <b-modal id="modal-update-question" hide-footer>
            <template v-slot:modal-title>
                <h3 class="text-center">Editar preguntas</h3>
            </template>
            <div class="d-block text-center">
                <form class="form-inline" @submit.prevent="updateBank(bank),getBanks({idArea:selected,idBlock:sIdBlock})">
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Dificultad</div>
                    </div>
                        <input type="text" class="form-control" v-model="bank.Dificultad">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Pregunta</div>
                    </div>
                        <input type="text" class="form-control" v-model="bank.Pregunta">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Pregunta imagen</div>
                    </div>
                        <input type="text" class="form-control" v-model="bank.PreguntaImagen">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta 1</div>
                    </div>
                        <input type="text" class="form-control" v-model="bank.Rta1">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta 2</div>
                    </div>
                        <input type="text" class="form-control" v-model="bank.Rta2">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta 3</div>
                    </div>
                        <input type="text" class="form-control" v-model="bank.Rta3">
                    </div>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">Respuesta correcta</div>
                    </div>
                        <input type="text" class="form-control" v-model="bank.RtaCorrecta">
                    </div>
                <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-update-question')">Editar</b-button>
                </form>
                <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-update-question')">Cancelar</b-button>
            </div>
        </b-modal>



    </div>
</template>

<script>
import{mapActions, mapState} from 'vuex'
export default {
    name: 'Block',
    data() {
        
        return {
            blockName: '',
            dificultad:'',
            pregunta:'',
            preguntaImagen:'',
            respuesta1:'',
            respuesta2:'',
            respuesta3:'',
            respuestaCorrecta:'',
            selected:''
        }
    },
    methods: {
        ...mapActions(['getKnowledgeAreas','getBlocks', 'getBlock','getBanks','getBank','addBlocks','deleteBlocks','updateBlock','addBanks','saveIdBlock','deleteBanks','updateBank'])
    },
    created() {
        this.getKnowledgeAreas();
    },
    computed: {
        ...mapState(['arrayAreas','arrayBlocks','arrayBank','block','sIdBlock','bank'])
    },
}
</script>