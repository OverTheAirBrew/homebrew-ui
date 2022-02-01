import { Select } from "@paljs/ui";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ErrorMessage, isRequiredMessage } from "./utils";

interface ISelectBoxProps{
  fieldId:string;
  translationFieldName: string;
  isRequired?:boolean;

  options: {value:string, label:string}[];

  onChange?: (value: any) => void;
  
  control: Control<FieldValues, object>
  errors: Record<string, any>
}

const SelectBox: FC<ISelectBoxProps> = ({fieldId, translationFieldName, isRequired, options, onChange: parentOnChange, control, errors}) => {
  const {t} = useTranslation();

  const requiredMessage = isRequired ? isRequiredMessage(t, translationFieldName) : false

  return(
    <>
      <label htmlFor={fieldId}>{t(translationFieldName)}</label>
      <Controller 
        name={fieldId}
        rules={{
          required: requiredMessage
        }}
        control={control}
        render={({ field: { onChange, value, ref }}) => (
          <Select
            inputRef={ref}
            value={options.filter(c => value?.includes(c.value))}
            onChange={val => {
              if(parentOnChange) parentOnChange(val?.value)
              onChange(val?.value)
            }}
            options={options}
          />
        )}
      />
      <ErrorMessage>{errors[fieldId]?.message}</ErrorMessage>
    </>
  )
}

export default SelectBox;