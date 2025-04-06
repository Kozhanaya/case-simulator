<script setup>
import TheHeader from './components/TheHeader.vue'
import Userform from './components/Userform.vue';
</script>

<template>
  <TheHeader />

  <main>
    <div class="form">
      <div class="form__content">
        <p class="form__title">Сперва мы<br>познакомимся</p>
        <Userform class="form__userform" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.form {
  &__content {
    margin: calc(50px - 1rem) 0;
    padding: 0 35px;
  }

  &__title {
    font-size: 18px;
    margin-top: 0;
  }
}
</style>
