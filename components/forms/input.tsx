import { useTranslation } from '@overtheairbrew/next-i18next';
import { FC } from 'react';
import { IFormPartProps } from '.';
import { ErrorMessage, isRequiredMessage } from './utils';

const Input: FC<IFormPartProps> = ({
  part: { id, isRequired, name, type },
  register,
  errors,
  partName,
}) => {
  const { t } = useTranslation();

  const requiredMessage = isRequired ? isRequiredMessage(t, name) : false;

  return (
    <div className="form-group">
      <label htmlFor={id}>{t(name)}</label>
      <input
        type={type}
        className="form-control"
        {...register(partName || id, {
          required: requiredMessage,
          valueAsNumber: type === 'number',
        })}
      />
      <ErrorMessage>{errors[id]?.message}</ErrorMessage>
    </div>
  );
};

export default Input;
