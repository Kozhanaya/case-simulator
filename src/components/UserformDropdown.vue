<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  placeholder: { type: String, required: true },
  options: { type: Array<String | Number>, required: true },
  isValid: Boolean,
  errorMessage: String,
})

const model = defineModel()
const showOptions = ref(false)

function toggleDropdown(e: Event) {
  const arrowBtn = (e.target as HTMLElement).querySelector('.form-field__arrow-btn')
  arrowBtn?.classList.toggle('form-field__arrow-btn_arrow-up')

  showOptions.value = !showOptions.value
}
</script>

<template>
  <div class="form-field">
    <div class="form-field__dropdown" @click="toggleDropdown">
      <!-- select text -->
      <span class="form-field__value" v-if="!model">{{ props.placeholder }}</span>
      <span class="form-field__value" v-else>{{ model }}</span>
      <div class="form-field__arrow-btn"><img src="/arrow-down.svg" alt="Arrow down"></div>

      <!-- options -->
      <div class="form-field__dropdown-options options" v-if="showOptions">
        <div class="options__item" v-for="o in props.options" @click="model = o">
          <span class="options__item-label">{{ o }}</span>
          <hr class="options__item-divider">
        </div>
      </div>
    </div>

    <p class="form-field__error" v-if="!props.isValid">{{ props.errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.form-field {
  &__dropdown {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0px 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background: linear-gradient(180.74deg, rgba(255, 255, 255, 0.5) 0.63%, rgba(255, 255, 255, 0.3) 101.71%);
    position: relative;
    z-index: 0;
    cursor: default;


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


  &__arrow-btn_arrow-up {
    rotate: 180deg;
  }


  &__error {
    font-size: 14px;
    margin-top: 4px;
    margin-bottom: 0;
  }
}

.options {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  border-radius: 10px;
  background: #F9F9F9;
  border: 1px solid #E7E7E7;
  box-shadow: 0px 4px 15.6px 0px #FFFFFF26 inset;
  padding: 15px 13px;
  box-sizing: border-box;
  color: #626262;
  font-size: 1rem;


  &__item {
    &-divider {
      border: 1px solid #E7E7E7;
      margin: 4px 0;
    }

    &:last-child &-divider {
      display: none;
    }
  }
}
</style>