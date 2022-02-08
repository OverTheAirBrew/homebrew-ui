import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '@overtheairbrew/next-i18next';
import $ from 'jquery';
import { FC } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import Button from './button';
import IconButton from './button/icon';
import Card from './card';
import CardBody from './card/body';
import CardHeader from './card/header';
import CardTool from './card/tools';
import FormPart, { FormPartType } from './forms';
import Input from './forms/input';
import SelectBox from './forms/select-box';
import Col from './layout/grid/col';
import Row from './layout/grid/row';
import PageContent from './layout/page/content';
import PageHeader from './layout/page/header';
import Modal from './modal';
import ModalBody from './modal/body';
import ModalFooter from './modal/footer';
import ModalHeader from './modal/header';
import Table from './table';
import TableBody from './table/body';
import TableBodyCell from './table/body-cell';
import TableHead from './table/head';
import HeaderCell from './table/header-cell';
import TableRow from './table/row';

interface ITableWithAddModalProps {
  tableType: 'actors' | 'sensors';

  types: {
    type: 'string' | 'number' | 'select-box';
    properties: {
      type: string;
      id: string;
      isRequired: boolean;
      name: string;
      selectBoxValues?: string[];
    }[];
  }[];
  values: { id: string; name: string; type_id: string; config: any }[];

  onSubmit: (data: any) => Promise<void>;

  selected: {
    type: string | undefined;
    set: (value: string | undefined) => void;
  };

  editMode: {
    value: boolean;
    set: (value: boolean) => void;
  };
}

const TableWithAddModal: FC<ITableWithAddModalProps> = ({
  types,
  values,
  onSubmit,
  selected,
  tableType,
  editMode,
}) => {
  const modalId = 'table-modal';

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    reset();
    selected.set(undefined);
    editMode.set(false);
  };

  const onFormSubmit = handleSubmit(async (data) => {
    onSubmit(data);
    $(`#${modalId}`).modal('hide');
  });

  function generateTypeForm(
    register: UseFormRegister<FieldValues>,
    errors: Record<string, any>,
  ) {
    if (!selected.type) {
      return (
        <>
          {t('interpolation.select-type-message', {
            type: t(`${tableType}.type`),
          })}
        </>
      );
    }

    const type = types.find((t) => t.type === selected.type);

    return type?.properties?.map((t) => {
      return (
        <FormPart
          key={t.id}
          part={{
            ...t,
            type: t.type as FormPartType,
            selectBoxValues: t.selectBoxValues || [],
          }}
          register={register}
          errors={errors}
        />
      );
    });
  }

  return (
    <>
      <PageHeader title={t(`${tableType}.name`)} />
      <PageContent>
        <Row>
          <Col>
            <Card>
              <CardHeader
                title={t('interpolation.list', {
                  type: t(`${tableType}.name`),
                })}
              >
                <CardTool>
                  <IconButton
                    className="btn-tool"
                    icon={faPlus}
                    data-target={`#${modalId}`}
                    data-toggle="modal"
                  />
                </CardTool>
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHead>
                    <TableRow>
                      <HeaderCell>Name</HeaderCell>
                      <HeaderCell>Type</HeaderCell>
                      <HeaderCell>State</HeaderCell>
                      <HeaderCell>Options</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values?.map((value) => {
                      return (
                        <TableRow>
                          <TableBodyCell>{value.name}</TableBodyCell>
                          <TableBodyCell>{value.type_id}</TableBodyCell>
                          <TableBodyCell>0</TableBodyCell>
                          <TableBodyCell>
                            <Button
                              type="button"
                              size="sm"
                              color="info"
                              data-target={`#${modalId}`}
                              data-toggle="modal"
                              onClick={() => {
                                selected.set(value.type_id);
                                editMode.set(true);
                                reset({
                                  id: value.id,
                                  name: value.name,
                                  sensorType: value.type_id,
                                  ...value.config,
                                });
                              }}
                            >
                              Edit
                            </Button>
                            &nbsp;
                            <Button type="button" size="sm" color="danger">
                              Delete
                            </Button>
                          </TableBodyCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageContent>

      <Modal id={modalId} color="default" size="lg" onClose={onClose}>
        <form onSubmit={onFormSubmit}>
          <input hidden {...register('id')} />

          <ModalHeader
            title={t('interpolation.new-thing', {
              type: t(`${tableType}.name`),
            })}
          />
          <ModalBody>
            <Input
              part={{
                id: 'name',
                name: 'global.name',
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
                name: t(`${tableType}.type`),
                isRequired: true,
                selectBoxValues: types.map((t) => t.type),
                type: 'select-box',
                onChange: (e) => {
                  selected.set(e.target.value);
                },
              }}
              register={register}
              errors={errors}
            />

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
      </Modal>
    </>
  );
};

export default TableWithAddModal;
