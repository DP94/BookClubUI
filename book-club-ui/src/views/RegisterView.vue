<script setup lang="ts">
import {FormKit} from "@formkit/vue";
</script>

<template>
  <div class="form-container">


    <FormKit type="form">
      <FormKit
          type="text"
          label="Username"
          name="username"
          validation="required|username"
      />
      <FormKit
          type="text"
          label="Real name"
          name="name"
          validation="required|name"
      />
      <FormKit
          type="text"
          label="Your Email"
          name="email"
          prefix-icon="email"
          placeholder="email@domain.com"
          validation="required|email"
      />
      <FormKit
          type="password"
          label="Password"
          validation="required|password"
      />
      <FormKit
          type="select"
          label="Loyalty"
          name="loyalty"
          placeholder="Praise the emperor?"
          :options="['Loyalist', 'Traitor']"
      />
    </FormKit>
  </div>
</template>

<style scoped>

.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 35em;
}
</style>