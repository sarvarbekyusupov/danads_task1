import { defineRule, configure } from 'vee-validate'
import { required, min, max } from '@vee-validate/rules'
import i18n from '@/plugins/i18n'

// Register global rules
defineRule('required', required)
defineRule('min', min)
defineRule('max', max)

// Configure VeeValidate
configure({
  generateMessage: (ctx) => {
    const { field, rule } = ctx
    
    // Map rule names to i18n keys
    const ruleName = rule?.name || 'invalid'
    
    // Build context for i18n interpolation
    const i18nParams: Record<string, unknown> = { field }
    
    const params = rule?.params
    if (params && Array.isArray(params)) {
      if (ruleName === 'min') i18nParams.min = params[0]
      if (ruleName === 'max') i18nParams.max = params[0]
    }

    // Use global t function for reactivity
    return i18n.global.t(`validation.${ruleName}`, i18nParams)
  },
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
})
