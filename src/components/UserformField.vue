<script setup>
</script>

<template>
  <div class="form-field">
    <div class="form-field__field">
      <input class="form-field__input" type="type" @input="" id="name" name="name" placeholder="Фамилия">
    </div>

    <span class="form-field__error" v-if="false">Поле обязательно для заполнения</span>
  </div>
</template>

<style scoped lang="scss">
.form-field {
  &__field {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0px 13px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: linear-gradient(180.74deg, rgba(255, 255, 255, 0.5) 0.63%, rgba(255, 255, 255, 0.3) 101.71%);
    position: relative;
    z-index: 0;


    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      pointer-events: none;
    }


    &::before {
      border: 1px solid transparent;
      background: linear-gradient(147.91deg, #FFFFFF 9.57%, rgba(255, 255, 255, 0) 56.98%, rgba(255, 255, 255, 0.77) 97.79%);
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      backdrop-filter: blur(35px);
    }


    &::after {
      box-shadow: -2px 2px 9px 0px #FFFFFF80 inset, 2px -2px 50px 0px #D6D6D685 inset, 0px 5px 18px 0px #0F101D33;
    }
  }



  &__input {
    width: 100%;
    font-size: 1rem;
    background: none;
    border: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: inherit;
    }
  }



  &__error {
    font-size: 14px;
    margin: 0;
    margin-top: 4px;
  }
}
</style>