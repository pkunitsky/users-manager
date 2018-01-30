<template>
  <div class="wrapper">
    <form class="searchbar input-group my-5" @submit.prevent="onSubmit">
      <input type="text" class="form-control" v-model="searchTerm">
      <div class="input-group-append">
        <span class="input-group-text">
          <i class="fa fa-search"></i>
        </span>
      </div>
    </form>

    <div class="grid" v-if="users.length !== 0">
      <div class="grid__item" v-for="_user in users" :key="_user._id">
        <div class="card mt-4 mt-md-0">
          <img class="card-img-top" :src="API+`/users/${_user._id}/img`">
          <div class="card-body">
            <h5 class="card-title capitalize">{{ _user.firstName+' '+_user.lastName }}</h5>
            <small class="text-muted">{{ _user.job }}</small>
            <div class="card-text mt-2">
              <a class="text-danger" href="#" @click.prevent="deleteUser(_user._id)">delete</a>
              <a href="#" target="_blank" :href="API+`/users/${_user._id}/pdf`"><small>click to view pdf</small></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- loading -->
    
    <div v-else class="text-center">
      No Users
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {mapActions} from 'vuex'

  export default {
    data: () => ({
      searchTerm: null,
      msg: null,
      requestPending: false,
      API: process.env.API,
    }),
    computed: {
      users () {
        const v = this.searchTerm
        if (!v) return this.$store.state.users

        return this.$store.state.users.filter(u => {
          const fullName = (u.firstName+' '+u.lastName).toLowerCase()
          return fullName.indexOf(v.toLowerCase()) !== -1
        })
      }
    },
    watch: {
      searchTerm: _.debounce(async function (value) {
        const route = {
          path: '/users'
        }
        if (this.searchTerm !== '') {
          route.query = {
            search: this.searchTerm
          }
        }
        this.$router.push(route)
      }, 0),
      '$route.query.search': {
        immediate: true,
        handler (v) {
          if (!v) return

          this.searchTerm = v
        }
      }
    },
    methods: {
      deleteUser (userID) {
        this.$store.commit('deleteUser', userID)
        this.getUsers()
      },
      ...mapActions([
        'getUsers', 'deleteUser'
      ]),
      onSubmit () {
        /* under development */
      }
    },
    created () {
      this.getUsers()
    }
  }
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    width: 100%;
  }
  .grid__item {
    width: 100%;
    padding: 0 6px 12px;
  }
  /* XS and up */
  @media (min-width: 576px) {
    .grid__item {
      max-width: 50%;
    }
  }
  /* SM and up */
  @media (min-width: 768px) {
    .grid__item {
      max-width: 33%;
    }
  }
  /* MD and up */
  @media (min-width: 992px) {
    .grid__item {
      max-width: 25%;
    }
  }
  .grid__item .card {
    width: 100%;
  }
  .searchbar {
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
