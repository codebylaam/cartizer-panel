import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { GenericInput } from './generic-input'
import { GenericTextarea } from './generic-textarea'
import { GenericSelect } from './generic-select'
import { GenericFileUploader } from './generic-file-uploader'
import { GenericRichTextEditor } from './generic-rich-text-editor'
import { GenericMultiSelect } from './generic-multi-select'
import { GenericCheckBox } from './generic-checkbox'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    GenericInput,
    GenericTextarea,
    GenericSelect,
    GenericFileUploader,
    GenericRichTextEditor,
    GenericMultiSelect,
    GenericCheckBox,
  },
  formComponents: {},
  fieldContext: fieldContext,
  formContext: formContext,
})
