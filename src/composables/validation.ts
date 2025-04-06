import { computed, reactive } from "vue";
import { type Field, type FieldState } from "./interfaces";

export function useValidation(formFields: Array<Field>) {
  /** Состояние полей формы */
  const FormFieldsState: Array<FieldState> = reactive([]);
  formFields.forEach((field) => {
    FormFieldsState.push({ field: field.name, isValid: true, errorMsg: "" });
  });

  /** Возвращает реактивное состояние валидности формы */
  const isFormValid = computed(() => {
    for (let state of FormFieldsState) {
      if (!state.isValid) {
        return false;
      }
    }

    return true;
  });

  /** Обновляет состояние поля 
   * 
   * @param id Id поля в конструктор-массиве
   * @param valid Валидность поля
   * @param error Текст ошибки
  */
  function updateFieldState(id: number, valid: boolean, error: string) {
    FormFieldsState[id].isValid = valid;
    FormFieldsState[id].errorMsg = error;
  }

  /**
   * Валидирует поле формы. Порядок валидации : на обязательность > мин/макс длину > соответсвие формату.
   *
   * @param value Значение поля
   * @param field Поле с его параметрами и правилами
   * @param fieldIndex Id поля в конструктор-массиве
   */
  function validateField(value: string, field: Field, fieldIndex: number) {
    let err: string = "";

    if (field.rules.required && !value) {
      err = "Поле обязательно для заполнения.";
      updateFieldState(fieldIndex, false, err);
      return;
    }

    if (
      field.rules.minLength &&
      value.length < field.rules.minLength &&
      value.length !== 0
    ) {
      err = `${field.labelText} не может быть короче ${field.rules.minLength} символов.`;
      updateFieldState(fieldIndex, false, err);
      return;
    }

    if (
      field.rules.min &&
      Number(value) < field.rules.min &&
      value.length !== 0
    ) {
      err = `Значение не может быть меньше, чем ${field.rules.min}.`;
      updateFieldState(fieldIndex, false, err);
      return;
    }

    if (
      field.rules.maxLength &&
      value.length > field.rules.maxLength &&
      value.length !== 0
    ) {
      err = `${field.labelText} не может превышать ${field.rules.maxLength} символов.`;
      updateFieldState(fieldIndex, false, err);
      return;
    }

    if (
      field.rules.max &&
      Number(value) > field.rules.max &&
      value.length !== 0
    ) {
      err = `Значение не может быть больше, чем ${field.rules.max}.`;
      updateFieldState(fieldIndex, false, err);
      return;
    }

    if (
      field.rules.pattern &&
      !field.rules.pattern.test(value) &&
      value.length !== 0
    ) {
      err = field.customErrorMsg ? field.customErrorMsg : "Неверный формат";
      updateFieldState(fieldIndex, false, err);
      return;
    }

    updateFieldState(fieldIndex, true, err);
    console.log(isFormValid.value);
  }

  return {
    validateField,
    isFormValid,
    FormFieldsState,
  };
}
