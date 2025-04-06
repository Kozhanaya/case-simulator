<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  isValid: Boolean,
  errorMessage: String,
})

function updateModel(e: Event) {
  console.log((e.target as HTMLInputElement).checked)
}
</script>

<template>
  <div class="form-checkbox">
    <label class="form-checkbox__content">
      <input class="form-checkbox__checkbox" type="checkbox" :id="props.name" :name="props.name" @change="updateModel">

      <span class="form-checkbox__label">
        <slot></slot>
      </span>
    </label>

    <p class="form-checkbox__error" v-if="!props.isValid">{{ props.errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.form-checkbox {
  position: relative;
  z-index: 1;

  &__content {
    display: flex;
    gap: 1rem;
  }

  &__checkbox {
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 5px;
    appearance: none;
    -webkit-appearance: none;
    box-shadow: 0px 1px 1.5px 0px #00000040 inset;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }

    &:checked {
      background-color: #007AFF;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: url('/check.svg');
      }
    }
  }

  &__label {
    font-size: 12px;
    max-width: 225px;
  }

  &__error {
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 0;
  }
}
</style>