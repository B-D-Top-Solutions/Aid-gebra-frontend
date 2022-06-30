<template>
  <div v-if="isLoading" class="card-body">
    <div class="text-center">
      <h5 class="card-title">Loading...</h5>
    </div>
  </div>
  <div v-if="!isLoading" class="row">
    <div class="card">
      <div class="card-header p-4">
        <h2 class="m-auto">{{ lesson.name }}</h2>
      </div>
      <div class="card-body">
        <h5 class="card-title">Concepts</h5>
        <p class="card-text">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="( concept, index ) in concepts " v-bind:key=" concept._id ">
              <td>{{ concept.order }}</td>
              <td>{{ concept.name }}</td>
              <td>
                <RouterLink class="shadow-sm btn btn-sm bg-main text-light mx-1" :to=" { name: 'admin-concepts-view', params: { conceptId: concept._id } } ">
                  View
                </RouterLink>
                <button class="shadow-sm btn btn-sm bg-main text-light mx-1" @click=" loadConcept( concept.order ) "
                  data-bs-toggle="modal" data-bs-target="#class_modal">
                  Modify
                </button>
                <button class="shadow-sm btn btn-sm bg-danger text-light mx-1" @click="deleteConcept( concept._id )">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </p>
        <button v-if=" concepts.length < 5 " href="#" class="btn btn-primary" @click=" clearModal() " data-bs-toggle="modal"
          data-bs-target="#class_modal">
          Add Concept
        </button>
      </div>
    </div>
  </div>

  <div v-if="!isLoading" class="row p-4">
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Pre-Test</h5>
          <h6 class="card-subtitle mb-2 text-muted">Manage Pre-Test</h6>
          <p class="card-text">Set up 20 questions to measure the knowledge level of the students.</p>
          <center>
            <RouterLink v-if="concepts.length >= 5" :to="{ name: 'admin-pretest-view', params: { lessonId: lessonId } }" class="btn bg-main text-light">View</RouterLink>
          </center>
          <span v-if="concepts.length < 5" class="text-danger">Lesson must have 5 concepts to proceed</span>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Post Test</h5>
          <h6 class="card-subtitle mb-2 text-muted">Manage Post Test</h6>
          <p class="card-text">Set up 20 questions to determine if the student has completed the lesson.</p>
          <center>
            <RouterLink v-if="concepts.length >= 5" :to="{ name: 'admin-posttest-view', params: { lessonId: lessonId } }" class="btn bg-main text-light">View</RouterLink>
          </center>
          <span v-if="concepts.length < 5" class="text-danger">Lesson must have 5 concepts to proceed</span>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="class_modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <input type="hidden" v-model.trim=" conceptModel.id " />
          <div class="form-floating mb-3">
            <input type="number" v-model.trim=" conceptModel.order " class="form-control" id="floatingInput"
              placeholder="Concept Order" min="1" max="5" />
            <label for="floatingInput">Order</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" v-model.trim=" conceptModel.name " class="form-control" id="floatingInput"
              placeholder="Concept Name" />
            <label for="floatingInput">Name</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" v-if=" isUpdate " @click=" updateConcept() " class="btn text-light bg-main">
            Save changes
          </button>
          <button type="button" v-if=" !isUpdate " @click=" createConcept() " class="btn text-light bg-main">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../axios";

export default {
  name: "admin-lessons-view",
  props: [ 'lessonId' ],
  data () {
    return {
      isLoading: true,
      isUpdate: false,
      lesson: {},
      concepts: [],
      conceptModel: {
        id: "",
        order: "",
        name: ""
      }
    };
  },
  mounted () {
    this.getLesson();
    this.getConcepts();
  },
  methods: {
    async getLesson () {
      try
      {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_LESSON_SHOW_V2 +
          "/" +
          this.lessonId
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

        this.lesson = res.data;
      } catch ( error )
      {
        console.log( error );
        alert( error.message );
      }
    },
    async getConcepts () {
      try
      {
        const entry = await axiosClient.get(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_ALL_V2 +
          `?lessonId=${ this.lessonId }`
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

        this.concepts = res.data;
        this.isLoading = false;
      } catch ( error )
      {
        console.log( error );
        alert( error.message );
      }
    },
    clearModal () {
      this.conceptModel.id = "";
      this.conceptModel.order = "";
      this.conceptModel.name = "";
      this.isUpdate = false;
    },
    async loadConcept ( order ) {
      try
      {
        this.clearModal();
        this.isUpdate = true;
        const data = this.concepts.find( concept => concept.order === order );
        this.conceptModel.id = data._id;
        this.conceptModel.name = data.name;
        this.conceptModel.order = data.order;
      } catch ( error )
      {
        console.log( error );
        alert( error );
      }
    },
    async createConcept () {
      try
      {
        const entry = await axiosClient.post(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_CREATE_V2,
          {
            lessonId: this.lessonId,
            name: this.conceptModel.name,
            order: this.conceptModel.order,
          }
        );

        const res = entry.data;
        if (res.status == false) throw res.error;
        console.log( res.data );

        this.concepts.push( {
          _id: res.data._id,
          name: res.data.name,
          order: res.data.order,
        } );

        this.conceptModel.name = "";
        this.conceptModel.order = "";
        this.conceptModel.id = "";
      } catch ( error )
      {
        console.log( error );
        alert( error );
      }
    },
    async updateConcept () {
      try
      {
        const entry = await axiosClient.put(
          import.meta.env.VITE_SERVER +
          import.meta.env.VITE_API_CONCEPT_UPDATE_V2 +
          "/" +
          this.conceptModel.id,
          {
            name: this.conceptModel.name,
            order: this.conceptModel.order,
          }
        );

        const res = entry.data;
        if ( !res.status ) throw res.error;

        const index = this.concepts.findIndex( concept => concept._id === this.conceptModel.id );
        this.concepts[ index ] = { 
          _id: res.data._id,
          name: res.data.name,
          order: res.data.order,
        };
        
        this.clearModal();
      } catch ( error )
      {
        console.log( error );
        alert( error.message );
      }
    },
    async deleteConcept ( id ) {
      try
      {
        if (
          confirm(
            "Are you sure you want to delete this concept? Operation can not be undone!"
          )
        )
        {
          const entry = await axiosClient.delete(
            import.meta.env.VITE_SERVER +
            import.meta.env.VITE_API_CONCEPT_DELETE_V2 +
            "/" +
            id
          );

          const res = entry.data;
          if ( !res.status ) throw res.error;

          this.concepts = this.concepts.filter( concept => concept._id !== id );

        }

      } catch ( error )
      {
      console.log( error );
      alert( error.message );
    }
    },
  },

};
</script>

<style lang="scss" scoped>
</style>
