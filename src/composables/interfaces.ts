export interface FieldRules {
  /** Указывает, является ли поле обязательным */
  required?: boolean,
  /** Минимальное значение поля */
  min?: number,
  /** Минимальная длина поля */
  minLength?: number,
  /** Максимальное значение поля */
  max?: number,
  /** Максимальная длина поля */
  maxLength?: number
  /** Формат/шаблон, которому поле должно придерживаться */
  pattern?: RegExp
}

export interface FieldState {
  /** Название поля в коде */
  field: string,
  /** Указвывает, является ли поле валидным */
  isValid: boolean,
  /** Текст ошибки */
  errorMsg: string
}

export interface Field {
  /** Название поля на форме */
  labelText: string,
  /** Задает name элементу input */
  name: string,
  /** Задает полю свой текст об ошибке. Параметр рекомендуется задать, если в правилах указан pattern */
  customErrorMsg?: string
  /** Задает правила, по которым валидатор будет проверять поле */
  rules: FieldRules
}

export interface FormData {
  [ key: string ]: string
}
