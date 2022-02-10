import { useTranslation } from '@overtheairbrew/next-i18next';
import { FC } from 'react';
import { IFormPartProps } from '.';
import { ErrorMessage, isRequiredMessage } from './utils';

const SelectBox: FC<IFormPartProps> = ({
  part: { id, name, isRequired, onChange, selectBoxValues },
  register,
  errors,
}) => {
  const { t } = useTranslation();

  const requiredMessage = isRequired ? isRequiredMessage(t, name) : false;

  return (
    <div className="form-group">
      <label htmlFor={id}>{t(name)}</label>
      <select
        {...register(id, { required: requiredMessage })}
        className="custom-select"
        defaultValue="select"
        onChange={onChange}
      >
        <option key="select" value="">
          Please select...
        </option>
        {selectBoxValues.map((o) => {
          return (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          );
        })}
      </select>
      <ErrorMessage>{errors[id]?.message}</ErrorMessage>
    </div>
  );
};

export default SelectBox;
