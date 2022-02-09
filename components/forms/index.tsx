import { FC } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Input from './input';
import SelectBox from './select-box';

export type FormPartType = 'string' | 'number' | 'select-box';

const FormParts: Record<FormPartType, FC<any>> = {
  string: Input,
  number: Input,
  'select-box': SelectBox,
};

export interface IFormPartProps {
  part: {
    id: string;
    type: FormPartType;
    isRequired: boolean;
    name: string;
    selectBoxValues: string[];
    onChange?: (value: any) => void;
  };
  register: UseFormRegister<FieldValues>;
  errors: Record<string, any>;
}

const FormPart: FC<IFormPartProps> = ({ part, register, errors }) => {
  if (typeof FormParts[part.type] !== undefined) {
    const Component = FormParts[part.type];
    return <Component part={part} register={register} errors={errors} />;
  }

  return <div>Unknown Component</div>;
};

export default FormPart;
