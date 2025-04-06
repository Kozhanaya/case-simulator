<script setup lang="ts">
import UserformField from './UserformField.vue';
import UserformCheckbox from './UserformCheckbox.vue';
import UserformDropdown from './UserformDropdown.vue';

function submitForm(e: Event) {
  e.preventDefault()

  console.log('submiting form...')
  // fetch/axios/ajax here
}

const fieldConstructor = [
  {
    placeholder: 'Фамилия и имя',
    name: 'name',
    rules: {}
  },
  {
    placeholder: 'Номер телефона',
    name: 'phone',
    rules: {}
  },
  {
    placeholder: 'Электронная почта',
    name: 'email',
    rules: {}
  },
  {
    placeholder: 'Компания',
    name: 'company',
    rules: {}
  },
  {
    placeholder: 'Должность',
    name: 'position',
    rules: {}
  },
]

const selectOptions = ['Джун', 'Миддл', 'Синиор', 'Тимлид', 'Менеджер', 'Другое']
</script>

<template>
  <div>
    <form @submit="submitForm">
      <div class="form-fields">
        <UserformField class="form-fields__item" v-for="field, id in fieldConstructor" :key="id" type="text"
          :placeholder="field.placeholder" :name="field.name" :isValid="true"
          :errorMessage="'Поле не должно быть пустым'" />

        <UserformDropdown placeholder="Уровень" :options="selectOptions" :isValid="true"
          :errorMessage="'Выберите уровень'" />
      </div>


      <UserformCheckbox name="agreement" class="agreement" :isValid="false"
        errorMessage="Для продолжения необходимо согласиться с условиями использования">
        Соглашаюсь получать email-рассылки и с <a href="#">политикой</a> обработки персональных данных
      </UserformCheckbox>


      <div class="submit-btn">
        <button class="submit-btn__btn">Продолжить</button>
        <div class="submit-btn__gradient-shadow"></div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 18px;
  position: relative;
  z-index: 2;
}

.agreement {
  position: relative;
  z-index: 1;
}

.submit-btn {
  width: 100%;
  height: 44px;
  margin-top: 22px;
  box-sizing: border-box;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.48) 100%);
  position: relative;
  z-index: 0;
  // фон переходит с градиента на прозрачный фон, затем на сплошной цвет. некрасиво.
  // transition: all 250ms ease-out;

  &:hover {
    background: #5324ed99;
    border-radius: 20px;
  }


  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    pointer-events: none;
  }


  &::before {
    border: 1px solid transparent;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%) border-box;

    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }


  &::after {
    box-shadow: 3px 1px 5px 0px #FFFFFF80 inset, 0px 10px 20px 0px #00000033;
    mix-blend-mode: overlay;
  }



  &__btn {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    font-size: 18px;
  }



  &__gradient-shadow {
    width: 100%;
    height: 100%;
    opacity: 80%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    background: conic-gradient(from 229.72deg at 46.18% 51.15%, #97E1D4 -54.94deg, #6284FF 28.29deg, #FF72B6 157.82deg, #D9AFD9 220.83deg, #97E1D4 305.06deg, #6284FF 388.29deg);
    filter: blur(40px);
  }
}
</style>