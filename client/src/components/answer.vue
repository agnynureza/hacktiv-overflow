<template>
  <div class="container">
    <div class="col-md-1">
      <router-link :to="{name:'home'}">
        <button class="btn btn-info">Back</button>
      </router-link>
    </div>
    <h3>Question</h3>
    <div class="card">
      <div class="card-header">
        {{question.title}}
      </div>
      <div class="card-body">
        <p class="card-text">{{question.question}}</p>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          answer
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
                      <label for="exampleFormControlInput1">Answer</label>
                      <div>
                        <textarea cols="62" rows="5" placeholder="Answer" v-model="answer" ></textarea>
                      </div>
                    </div>  
                  </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" @click="submitAnswer" class="btn btn-primary" data-dismiss="modal" >Submit Answer</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <hr>
    <h3>Answer</h3>
    <div class="card" v-for="(a,i) in allAnswer" :key="i" style="margin-bottom:20px;">
      <div class="card-header">
        <div class="col-md-1">
          {{i+1}}
        </div>
        answer from user: {{a.userId.username}}
      </div>
      <div class="card-body">
        <p class="card-text">{{a.answer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      answer: '',
      question: '',
      allAnswer: []
    }
  },
  created: function () {
    axios.get(`http://localhost:4000/questions/findById/${this.$route.params.id}`).then(data => {
      this.question = data.data.data
    })
  },
  updated: function () {
    axios.get(`http://localhost:4000/answers/find/${this.$route.params.id}`).then(data => {
      this.allAnswer = data.data.data
      console.log(this.allAnswer)
    })
  },
  methods: {
    submitAnswer: function () {
      axios.post('http://localhost:4000/answers/create', {
        answer: this.answer,
        userId: this.$store.state.userId,
        questionId: this.$route.params.id
      }).then(data => {
        // this.allAnswer = data.data.data
      })
    }
  },
  beforeCreate: function () {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
