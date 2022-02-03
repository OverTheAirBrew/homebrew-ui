import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ErrorMessage, isRequiredMessage } from './utils';

interface ISelectBoxProps {
  fieldId: string;
  translationFieldName: string;
  isRequired?: boolean;

  options: string[];

  onChange?: (value: any) => void;

  register: UseFormRegister<FieldValues>;
  errors: Record<string, any>;
}

const SelectBox: FC<ISelectBoxProps> = ({
  fieldId,
  translationFieldName,
  isRequired,
  options,
  onChange: parentOnChange,
  register,
  errors,
}) => {
  const { t } = useTranslation();

  const requiredMessage = isRequired
    ? isRequiredMessage(t, translationFieldName)
    : false;

  return (
    <div className="form-group">
      <label htmlFor={fieldId}>{t(translationFieldName)}</label>
      <select
        {...register(fieldId, { required: requiredMessage })}
        className="custom-select"
        defaultValue="select"
        onChange={parentOnChange}
      >
        <option key="select" value="">
          Please select...
        </option>
        {options.map((o) => {
          return (
            <option key={o} value={o}>
              {o}
            </option>
          );
        })}
      </select>

      {/* <Controller
        name={fieldId}
        rules={{
          required: requiredMessage,
        }}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <select
            id={fieldId}
            className="custom-select"
            defaultValue="select"
            onChange={parentOnChange}
          >
            <option key="select" value="select">
              Please select...
            </option>
            {options.map((o) => {
              return (
                <option key={o} value={o}>
                  {o}
                </option>
              );
            })}
          </select>

          // <Select
          //   inputRef={ref}
          //   value={options.filter(c => value?.includes(c.value))}
          //   onChange={val => {
          //     if(parentOnChange) parentOnChange(val?.value)
          //     onChange(val?.value)
          //   }}
          //   options={options}
          // />
        )}
      /> */}
      <ErrorMessage>{errors[fieldId]?.message}</ErrorMessage>
    </div>
  );
};

export default SelectBox;
