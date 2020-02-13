<template>
    <div>
        <h1>Areas de conocimiento</h1>
        <button @click="$bvModal.show('modal-add')" class="btn btn-success btn-block">Agregar</button>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Nombre Area</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of arrayAreas" :key="item.id" >
                    <th>{{item.Nombre}}</th>
                    <th>
                        <button @click="$bvModal.show('modal-update'), getKnowledgeArea(item.id)" class="btn btn-warning btn-sm mr-2">Editar</button>
                        <button @click="deleteKnowledgeArea(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
                    </th>
                </tr>
            </tbody>
        </table>

        <b-modal id="modal-add" hide-footer>
          <template v-slot:modal-title>
            <h3 class="text-center">Agregar área de conocimiento</h3>
          </template>
          <div class="d-block text-center">
            <form class="form-inline" @submit.prevent="addKnowledgeArea({name})">
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                    <div class="input-group-text">Nombre</div>
                </div>
                    <input type="text" class="form-control" v-model="name">
                </div>
                <span>{{name}}</span>
            <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-add'), getKnowledgeAreas()">Agregar</b-button>
            </form>
            <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-add')">Cancelar</b-button>
          </div>
        </b-modal>

        <b-modal id="modal-update" hide-footer>
          <template v-slot:modal-title>
            <h3 class="text-center">Edición área de conocimiento</h3>
          </template>
          <div class="d-block text-center">
            <form class="form-inline" @submit.prevent="updateKnowledgeArea(knowledgeArea)">
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                    <div class="input-group-text">Nombre</div>
                    </div>
                    <input type="text" class="form-control" v-model="knowledgeArea.Nombre">
                </div>
            <b-button class="btn-sm btn-block mb-1 btn-warning" type="submit" @click="$bvModal.hide('modal-update'),getKnowledgeAreas()">Editar</b-button>
            </form>
            <b-button class="btn-sm btn-block" @click="$bvModal.hide('modal-update')">Cancelar</b-button>
          </div>
        </b-modal>

    </div>
</template>

<script>
import{mapActions, mapState} from 'vuex'
export default {
    name: 'KnowledgeArea',
    data() {
        
        return {
            name: ''
        }
    },
    methods: {
        ...mapActions(['getKnowledgeAreas','addKnowledgeArea', 'getKnowledgeArea','updateKnowledgeArea','deleteKnowledgeArea'])
    },
    created() {
        this.getKnowledgeAreas();
    },
    computed: {
        ...mapState(['arrayAreas','knowledgeArea'])
    },
}
</script>