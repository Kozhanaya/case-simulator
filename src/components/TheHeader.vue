<script setup lang="ts">
</script>

<template>
  <header>
    <div class="header">
      <div class="header__content">
        <div class="header__logo">
          <div class="header__logo-icon">
            <img :src="'/logo.svg'" alt="кейс-симулятор">
          </div>
          <p class="header__logo-name">кейс-<br>симулятор</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  &__content {
    padding: 1rem 20px;
  }

  &__logo {
    display: flex;
    align-items: start;
    gap: 12px;

    &-name {
      font-weight: 500;
      font-size: 20px;
      color: #E9E9E9;
      margin: 11px 0;
    }
  }
}
</style>