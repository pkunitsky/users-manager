<template>
  <div class="row">
    <div class="col-md-6 col-lg-8">
      
      <form :action="process.env.DOMAIN" method="POST" enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="First Name" required v-model.lazy="user.firstName">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Last Name" required v-model.lazy="user.lastName">
        </div>
        <div class="form-group">
          <label class="mr-sm-2" for="job">Job</label>
          <select class="custom-select mr-sm-2" id="job" required v-model="user.job">
            <option>Front-end software engineer</option>
            <option>Back-end software engineer</option>
            <option>Full-stack software developer</option>
          </select>
        </div>
        <div class="form-group">
          <textarea class="form-control" cols="4" v-model="user.about"></textarea>
          <small class="form-text text-muted">
            Few words about <span :class="{'capitalize': fullName}" v-text="fullName || 'the person'"></span> (optional)</small>
        </div>
        <div class="form-group">
          <label for="file">Upload user profile image</label>
          <input type="file" accept=".png,.jpg,.jpeg" class="form-control-file" id="file" required @change="onFileChange">
          <small class="form-text text-muted">We accept <b>png</b>, <b>jpg</b> and <b>jpeg</b> files</small>
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
      <div class="card">
        <img
          class="card-img-top" :src="user.imgBase64 || imgPlaceholder">
        <div class="card-body">
          <h5 class="card-title capitalize">{{ fullName }}</h5>
          <small class="text-muted">{{ user.job }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      user: {
        firstName: null,
        lastName: null,
        job: null,
        about: null,
        imgBase64: null,
      },
      imgPlaceholder: 'http://www.planystech.com/wp-content/uploads/2017/03/profile-placeholder.jpg',
      requestPending: false
    }),

    computed: {
      fullName () {
        const {firstName, lastName} = this.user
        return firstName && lastName
          ? firstName+' '+lastName
          : null
      }
    },

    methods: {
      onSubmit () {
        const user = this.user
        this.requestPending = true

        Object.keys(this.user).forEach(key => this.user[key] = null)
        setTimeout(() => {
          this.requestPending = false
        }, 5000)
        // this.$router.push('/users')
      },

      onFileChange (smth) {
        console.log(document.querySelector('#file').value)
      }
    },

    created () {
      console.log(process.env.DOMAIN)
    }
  }
</script>
