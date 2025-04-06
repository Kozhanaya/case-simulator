<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useValidation } from '../composables/validation';
import { type FormData } from '../composables/interfaces';
import UserformField from './UserformField.vue';
import UserformCheckbox from './UserformCheckbox.vue';
import UserformDropdown from './UserformDropdown.vue';

const formConstructor = {
  textFields: [
    {
      labelText: 'Фамилия и имя',
      name: 'name',
      rules: {
        required: true,
        minLength: 2
      }
    },
    {
      labelText: 'Номер телефона',
      name: 'phone',
      customErrorMsg: 'Неверный формат номера телефона.',
      rules: {
        required: true,
        maxLength: 12,
        pattern: new RegExp('^(?:\\+7\\s?|8\\s?)\\(?\\d{3}\\)?(?:[\\-\\s]?\\d\\d\\d)(?:[\\-\\s]?\\d\\d){2}$', 'm'),
      }
    },
    {
      labelText: 'Электронная почта',
      name: 'email',
      customErrorMsg: 'Неверный формат электронной почты.',
      rules: {
        required: true,
        pattern: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
      }
    },
    {
      labelText: 'Компания',
      name: 'company',
      rules: {
        required: true,
      }
    },
    {
      labelText: 'Должность',
      name: 'position',
      rules: {
        required: true,
      }
    },
  ],

  dropdownMenus: [
    {
      labelText: "Уровень",
      name: 'level',
      options: ['Джун', 'Миддл', 'Синиор', 'Тимлид', 'Менеджер', 'Другое'],
      rules: {
        required: true,
      }
    }
  ]
}

const allFields = formConstructor.textFields.concat(formConstructor.dropdownMenus)
const { validateField, isFormValid, FormFieldsState } = useValidation(allFields)


let formData: FormData = reactive({})
allFields.forEach((field) => {
  formData[field.name] = ''
})

const agreementChecked = ref(false)
const isAgreementValid = ref(true)


function submitForm(e: Event) {
  e.preventDefault()

  console.log('validating form...')
  validateForm()
  
  console.log('form is ' + (isFormValid.value ? 'valid' : 'invalid'))
  if (!isFormValid && !agreementChecked) { return }

  console.log('submiting form...')
  // fetch/axios/ajax here
}


function validateForm() {
  allFields.forEach((field, id) => {
    validateField(formData[field.name], field, id)
  })

  isAgreementValid.value = agreementChecked.value
}
</script>

<template>
  <div>
    <form @submit="submitForm">
      <div class="form-fields">
        <UserformField 
          class="form-fields__item" 
          v-for="field, id in formConstructor.textFields" 
          :key="id" 
          type="text"
          :placeholder="field.labelText" 
          :name="field.name" 
          :isValid="FormFieldsState[id].isValid"
          :errorMessage="FormFieldsState[id].errorMsg" v-model="formData[field.name]" />

        <UserformDropdown 
          v-for="dropdown, id in formConstructor.dropdownMenus"
          :key="id"
          :placeholder="dropdown.labelText"
          :options="dropdown.options"
          :isValid="FormFieldsState[FormFieldsState.length - 1].isValid"
          :errorMessage="FormFieldsState[FormFieldsState.length - 1].errorMsg"
          v-model="formData['level']" />
      </div>


      <UserformCheckbox 
        name="agreement"
        class="agreement" 
        :isValid="isAgreementValid"
        errorMessage="Для продолжения необходимо согласиться с условиями использования"
        v-model="agreementChecked">
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