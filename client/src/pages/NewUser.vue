<template>
  <div class="row">
    <div class="col-md-6 col-lg-8">
      
      <form enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="First Name" required v-model.lazy="newUser.firstName">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Last Name" required v-model.lazy="newUser.lastName">
        </div>
        <div class="form-group">
          <label class="mr-sm-2" for="job">Job</label>
          <select class="custom-select mr-sm-2" id="job" required v-model="newUser.job">
            <option>Front-end software engineer</option>
            <option>Back-end software engineer</option>
            <option>Full-stack software developer</option>
          </select>
        </div>
        <div class="form-group">
          <textarea class="form-control" cols="4" v-model="newUser.about"></textarea>
          <small class="form-text text-muted">
            Few words about <span :class="{'capitalize': newUserFullName}" v-text="newUserFullName || 'the person'"></span> (optional)</small>
        </div>
        <div class="form-group">
          <label for="file">Upload user profile image</label>
          <input type="file" name="file" accept="image/*" class="form-control-file" id="file" required @change="onFileChange">
          <small class="form-text text-muted">Recommended file formats &mdash; <b>png</b>, <b>jpg</b> and <b>jpeg</b></small>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-info" >
            <div v-if="!requestPending">Add User</div>
            <vue-loading :loading="requestPending" color="#fff" size="7px" />
          </button>
        </div>
      </form>
    </div>

    <div class="col-md-6 col-lg-4">
      <div class="card mb-4">
        <img class="card-img-top" id="img" :src="user.imgSrc">
        <div class="card-body">
          <h5 class="card-title capitalize" v-visible="user.fullName">{{ user.fullName || 'default' }}</h5>
          <small class="text-muted" v-visible="user.job">{{ user.job || 'default' }}</small>
        </div>
      </div>
      <transition name="fade">
        <div v-if="msg.error" ref="error" class="alert alert-danger">
          {{ msg.error }}
          <button class="close" @click="msg.error = null">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="msg.success" ref="success" class="alert alert-success">
            {{ msg.success }}
          <button class="close" @click="msg.success = null">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  let formData = null

  function getFullName (firstName, lastName) {
    return firstName && lastName
      ? (firstName+' '+lastName).toLowerCase()
      : null
  }

  export default {
    data: () => ({
      newUser: {
        firstName: null,
        lastName: null,
        job: null,
        about: null,
      },
      user: {
        _id: 1,
        fullName: null,
        job: null,
        imgSrc: `${process.env.API}/users/0/img`,
      },
      msg: {
        error: null,
        success: null
      },
      requestPending: false,
    }),

    computed: {
      newUserFullName () {
        return this.newUser.firstName && this.newUser.lastName
          ? (this.newUser.firstName+' '+this.newUser.lastName).toLowerCase()
          : null
      },
    },

    methods: {
      onFileChange (e) {
        const fieldName = e.target.name
        const fileList = e.target.files

        if (fileList.length < 1) return
        
        formData = new FormData()
        formData.append(fieldName, fileList[0], fileList[0].name)
      },

      onSubmit () {
        this.requestPending = true

        for (let propName in this.newUser) {
          formData.append(propName, this.newUser[propName])
        }
        
        axios
          .post(process.env.API+'/users', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            const {success, user} = res.data

            this.requestPending = false
            this.msg.success = success

            this.user.fullName = getFullName(user.firstName, user.lastName)
            this.user.job = user.job
            this.user.imgSrc = `${process.env.API}/users/${this.user._id}/img`

            this.$store.commit('addUser', user)

            // Object.keys(this.newUser).forEach(key => this.newUser[key] = null)
            // document.querySelector('#file').value = null
          })
          .catch(err => {
            this.requestPending = false
            try {
              this.msg.error = err.response.data.error
            } catch (_e) {
              this.msg.error = err.toString()
            }
          })
      }
    }
  }
</script>
