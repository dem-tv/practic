import type { ComputedRef, Ref } from 'vue';
import type { ErrorObject } from '@vuelidate/core';
import useVuelidate from '@vuelidate/core';

export function getFirstValidationError(errors: ErrorObject[]) {
  return (errors[0]?.$message as string) || '';
}

type Field = {
  invalid: boolean;
  errorMessage: string;
  required: boolean;
};

/**
 * Получение свойств объекта валидации форм
 *
 * @param form - Объект данных формы.
 * @param validationRules - Правила, передаваемые в useVuelidate.
 * https://vuelidate-next.netlify.app/examples.html#composition-api
 *
 * @returns
 * validationForm - Composable, содержащий все поля формы с полями `invalid`, `errorMessage`, `required`
 * validateForm - Функция для валидации формы
 */
export function useValidation<FormModel extends Record<string, unknown>>(
  form: Ref<FormModel>,
  validationRules: ComputedRef<Record<string, unknown>>,
) {
  const validation = useVuelidate(validationRules, form);
  const formFields = Object.keys(form.value);

  const formValidation = computed(() => {
    return formFields.reduce<Record<keyof FormModel, Field>>(
      (acc, fieldName) => {
        return {
          ...acc,
          [fieldName]: {
            invalid: validation.value[fieldName]?.$error,
            errorMessage: getFirstValidationError(validation.value[fieldName]?.$errors || []),
            required: validation.value[fieldName]?.required?.$params.type === 'required',
          },
        };
      },
      {} as Record<keyof FormModel, Field>,
    );
  });

  async function validateForm() {
    return validation.value.$validate();
  }

  return { formValidation, validateForm };
}
