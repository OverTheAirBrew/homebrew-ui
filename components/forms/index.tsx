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
  selectBoxValues?: { id: string | number; name: string | number }[];
  onChange?: (value: any) => void;
}

export interface IFormPartProps {
  part: IFormPart;
  register: UseFormRegister<FieldValues>;
  errors: Record<string, any>;
  partName?: string;
}

export function generateFormFromType(
  type: IType,
  form: { register: UseFormRegister<FieldValues>; errors: Record<string, any> },
  idPrefix: string = '',
) {
  return type.properties.map((p) => {
    return (
      <FormPart
        key={p.id}
        part={{
          ...p,
          selectBoxValues: p.selectBoxValues?.map((s) => {
            return { id: s, name: s };
          }),
        }}
        register={form.register}
        errors={form.errors}
        partName={idPrefix}
      />
    );
  });
}

const FormPart: FC<IFormPartProps> = ({ part, register, errors, partName }) => {
  if (typeof FormParts[part.type] !== undefined) {
    const fullPartName = [partName, part.id].filter((p) => !!p).join('.');

    const Component = FormParts[part.type];
    return (
      <Component
        part={part}
        register={register}
        errors={errors}
        partName={fullPartName}
      />
    );
  }

  return <div>Unknown Component</div>;
};

export default FormPart;
