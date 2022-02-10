import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useTranslation } from '@overtheairbrew/next-i18next';
import $ from 'jquery';
import { FC } from 'react';
import { FieldValues, UseFormRegister, UseFormReturn } from 'react-hook-form';
import Button from './button';
import IconButton from './button/icon';
import Card from './card';
import CardBody from './card/body';
import CardHeader from './card/header';
import CardTool from './card/tools';
import FormPart, { FormPartType, IFormPart } from './forms';
import ModalBody from './modal/body';
import ModalFooter from './modal/footer';
import ModalHeader from './modal/header';
import ModalWrapper from './modal/wrapper';

interface IAddModalProps {
  modal: {
    id: string;
    header: string;
  };

  messaging: {
    additionType: string;
    selectType: string;
  };

  types?: {
    type: string;
    properties: {
      type: string;
      id: string;
      isRequired: boolean;
      name: string;
      selectBoxValues?: string[];
    }[];
  }[];

  onSubmit: (data: any) => Promise<void>;

  selectedType: {
    type: string | undefined;
    set: (value: string | undefined) => void;
  };

  editMode: {
    value: boolean;
    set: (value: boolean) => void;
  };

  baseFormTypes: IFormPart[];
  form: UseFormReturn<FieldValues, object>;
}

const AddModal: FC<IAddModalProps> = ({
  types,
  onSubmit,
  selectedType,
  messaging,
  editMode,
  children,
  modal,
  form: {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  },
  baseFormTypes,
}) => {
  const { t } = useTranslation();

  const onClose = () => {
    reset();
    selectedType.set(undefined);
    editMode.set(false);
  };

  const onFormSubmit = handleSubmit(async (data) => {
    onSubmit(data);
    $(`#${modal.id}`).modal('hide');
  });

  function generateTypeForm(
    register: UseFormRegister<FieldValues>,
    errors: Record<string, any>,
  ) {
    if (!selectedType.type) {
      return <>{messaging.selectType}</>;
    }

    const type = types?.find((t) => t.type === selectedType.type);

    return type?.properties?.map((t) => {
      return (
        <FormPart
          key={t.id}
          part={{
            ...t,
            type: t.type as FormPartType,
            selectBoxValues:
              t.selectBoxValues?.map((sbv) => {
                return {
                  id: sbv,
                  name: sbv,
                };
              }) || [],
          }}
          register={register}
          errors={errors}
        />
      );
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTool>
            <IconButton
              className="btn-tool"
              icon={solid('plus')}
              data-target={`#${modal.id}`}
              data-toggle="modal"
            />
          </CardTool>
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>

      <ModalWrapper id={modal.id} color="default" size="lg" onClose={onClose}>
        <form onSubmit={onFormSubmit}>
          <input hidden {...register('id')} />

          <ModalHeader title={modal.header} />
          <ModalBody>
            {baseFormTypes.map((bft) => {
              return (
                <FormPart
                  key={bft.id}
                  part={bft}
                  register={register}
                  errors={errors}
                />
              );
            })}

            {/* <Input
              part={{
                id: 'name',
                name: t('global.name'),
                isRequired: true,
                type: 'string',
                selectBoxValues: [],
              }}
              register={register}
              errors={errors}
            />

            <SelectBox
              part={{
                id: 'type_id',
                name: messaging.additionType,
                isRequired: true,
                selectBoxValues: types?.map((t) => t.type) || [],
                type: 'select-box',
                onChange: (e) => {
                  selectedType.set(e.target.value);
                },
              }}
              register={register}
              errors={errors}
            /> */}

            <hr />

            {generateTypeForm(register, errors)}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              size="sm"
              className="float-right"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddModal;
