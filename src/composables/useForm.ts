import { ref, reactive, computed, watch, toRaw, type DeepReadonly } from 'vue'

export type ValidationRule<T> = (value: T) => string | null | undefined
export type FormValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

export interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T
  validationSchema?: FormValidationSchema<T>
  onSubmit: (values: T) => Promise<void> | void
}

export function useForm<T extends Record<string, unknown>>(options: UseFormOptions<T>) {
  const { initialValues, validationSchema, onSubmit } = options

  // 1. Reactive State
  const values = reactive<T>({ ...initialValues }) as T
  const errors = reactive<Record<keyof T, string | null>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = null
      return acc
    }, {} as Record<keyof T, string | null>)
  )

  // 2. Dirty/Pristine State
  const isDirty = ref(false)
  const isSubmitting = ref(false)

  // Watch for changes to track "dirty" state
  watch(
    () => ({ ...values }),
    (currentValues) => {
      isDirty.value = JSON.stringify(currentValues) !== JSON.stringify(initialValues)
    },
    { deep: true }
  )

  // 3. Validation Logic
  const validateField = (field: keyof T) => {
    if (!validationSchema || !validationSchema[field]) {
      (errors as Record<keyof T, string | null>)[field] = null
      return true
    }

    const rules = validationSchema[field]!
    const value = values[field]

    for (const rule of rules) {
      const error = rule(value as T[keyof T])
      if (error) {
        (errors as Record<keyof T, string | null>)[field] = error
        return false
      }
    }

    (errors as Record<keyof T, string | null>)[field] = null
    return true
  }

  const validate = () => {
    let isValid = true
    if (validationSchema) {
      for (const field in validationSchema) {
        if (!validateField(field as keyof T)) {
          isValid = false
        }
      }
    }
    return isValid
  }

  // 4. Submission Handler
  const handleSubmit = async (e?: Event) => {
    if (e) e.preventDefault()
    
    if (!validate()) return

    isSubmitting.value = true
    try {
      // Use toRaw to get a plain object for submission
      await onSubmit({ ...toRaw(values as T) })
      reset()
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      isSubmitting.value = false
    }
  }

  // 5. Reset Logic
  const reset = () => {
    Object.assign(values, initialValues)
    Object.keys(errors).forEach((key) => {
      (errors as Record<keyof T, string | null>)[key as keyof T] = null
    })
    isDirty.value = false
  }

  return {
    // State
    values,
    errors: errors as DeepReadonly<typeof errors>,
    isDirty,
    isSubmitting,
    isValid: computed(() => Object.values(errors).every((err) => err === null)),

    // Methods
    handleSubmit,
    validateField,
    reset,
  }
}
