<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand mr-4">Users Manager</router-link>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarNav" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <nav class="navbar-nav">
          <router-link
            class="nav-item nav-link"
            active-class="active"
            :to="{path: '/users/new'}" exact>
            Add User
          </router-link>
          <router-link
            active-class="active"
            class="nav-item nav-link"
            :to="{path: '/users'}" exact>
            Users
          </router-link>
        </nav>
      </div>
    </div>
  </nav>
</template>
