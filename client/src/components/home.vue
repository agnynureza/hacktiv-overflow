<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1">
        <button class="btn btn-danger" @click="logout">Logout </button>
      </div>
    </div>
    <br/>
    <div class = "row">  
      <div class="col-md-4">
        <label for="">User</label>
        <div class="card border-info">
          <div class="card-header">Hai {{username}}</div>
          <div class="card-body">
            <h5 class="card-title">Welcome hacktiv overflow !</h5>
            <p class="card-text"> You can help your friends by answering the question or you can ask something</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Ask Question
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ask Question</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="exampleFormControlInput1">Title</label>
                      <input v-model="title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="title">
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">Question</label>
                      <div>
                        <textarea v-model="question" cols="62" rows="5" placeholder="Your Question ??" ></textarea>
                      </div>
                    </div>  
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="askQuestion">Submit Question</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <label for="">All Question</label>
        <div class="card" v-for="(q,i) in allQuestion" :key="i" style="margin-bottom:20px;">
          <div class="card-header">
            <div class="row">
              <div class="col-md-1">
                <button class="btn btn-success"><i class="fas fa-caret-up"></i></button>
              </div>
              <div class="col-md-2">
                 <button class="btn btn-danger"><i class="fas fa-caret-down"></i></button>
              </div>
              <div class="col-md-6">
                  {{q.title}}
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{q.question}}</p>
            <router-link :to="{name:'answer',params:{id:q._id}}">
              <a href="#" class="btn btn-success" style="margin-top:30px;">answer Question</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      question: '',
      allQuestion: []
    }
  },
  computed: {
    username () {
      return this.$store.state.userData
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUserId', null)
      this.$store.dispatch('setUserData', null)
      this.$router.push({
        path: '/'
      })
    },
    askQuestion () {
      axios.post('http://localhost:4000/questions/create', {
        title: this.title,
        question: this.question,
        userId: this.$store.state.userId
      }).then(data => {
        console.log(data)
      })
    }
  },
  beforeCreate: function () {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    }
  },
  created: function () {
    axios.get('http://localhost:4000/questions/find').then(data => {
      this.allQuestion = data.data.data
    })
  },
  updated: function () {
    axios.get('http://localhost:4000/questions/find').then(data => {
      this.allQuestion = data.data.data
    })
  }
}
</script>

<style>

</style>
