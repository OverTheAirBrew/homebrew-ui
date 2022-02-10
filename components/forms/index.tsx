import { FC } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IType } from '../../lib/models/common';
import Input from './input';
import SelectBox from './select-box';

export type FormPartType = 'string' | 'number' | 'select-box';

const FormParts: Record<FormPartType, FC<any>> = {
  string: Input,
  number: Input,
  'select-box': SelectBox,
};

export interface IFormPart {
  id: string;
  type: FormPartType;
  isRequired: boolean;
  name: string;
  selectBoxValues?: { id: string; name: string }[];
  onChange?: (value: any) => void;
}

export interface IFormPartProps {
  part: IFormPart;
  register: UseFormRegister<FieldValues>;
  errors: Record<string, any>;
}

export function generateFormFromType(
  type: IType,
  form: { register: UseFormRegister<FieldValues>; errors: Record<string, any> },
) {
  return type.properties.map((p) => {
    return (
      <FormPart
        part={{
          ...p,
          selectBoxValues: p.selectBoxValues?.map((s) => {
            return { id: s, name: s };
          }),
        }}
        register={form.register}
        errors={form.errors}
      />
    );
  });
}

const FormPart: FC<IFormPartProps> = ({ part, register, errors }) => {
  if (typeof FormParts[part.type] !== undefined) {
    const Component = FormParts[part.type];
    return <Component part={part} register={register} errors={errors} />;
  }

  return <div>Unknown Component</div>;
};

export default FormPart;
