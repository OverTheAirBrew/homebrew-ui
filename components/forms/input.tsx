import { InputGroup } from "@paljs/ui"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { ErrorMessage, isRequiredMessage } from "./utils"

interface IInputProps {
  fieldId:string;
  translationFieldName: string;
  type: 'text' | 'number'
  isRequired:boolean;
  register: UseFormRegister<FieldValues>, 
  errors: Record<string, any>
}

const Input: FC<IInputProps> = ({translationFieldName, fieldId, type, isRequired, register, errors}) => {
  const {t} = useTranslation()

  const requiredMessage = isRequired ? isRequiredMessage(t, translationFieldName) : false

  return (
    <>
      <label htmlFor={fieldId}>{t(translationFieldName)}</label>  
      <InputGroup fullWidth>
        <input type={type} {...register(fieldId, {required: requiredMessage})} />
      </InputGroup>
      <ErrorMessage>{errors[fieldId]?.message}</ErrorMessage>
    </>
  )
}

export default Input