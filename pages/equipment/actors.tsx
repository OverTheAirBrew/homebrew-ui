import { faPlus } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FC, useState } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import Button from '../../components/button';
import IconButton from '../../components/button/icon';
import Card from '../../components/card';
import CardBody from '../../components/card/body';
import CardHeader from '../../components/card/header';
import CardTool from '../../components/card/tools';
import FormPart, { FormPartType } from '../../components/forms';
import Input from '../../components/forms/input';
import SelectBox from '../../components/forms/select-box';
import Col from '../../components/layout/grid/col';
import Row from '../../components/layout/grid/row';
import PageContent from '../../components/layout/page/content';
import PageHeader from '../../components/layout/page/header';
import Modal from '../../components/modal';
import ModalBody from '../../components/modal/body';
import ModalFooter from '../../components/modal/footer';
import ModalHeader from '../../components/modal/header';
import Table from '../../components/table';
import TableBody from '../../components/table/body';
import TableHead from '../../components/table/head';
import HeaderCell from '../../components/table/header-cell';
import TableRow from '../../components/table/row';
import { internalSdk } from '../../lib/sdks/api-sdk';
const localeConfig = require('../../locale-config.json');

interface IEquipmentActorProps {
  // sensors: {
  //   id: string;
  //   name: string;
  //   type_id: string;
  //   config: any;
  // }[];
  actorTypes: {
    type: 'string' | 'number' | 'select-box';
    properties: {
      type: string;
      id: string;
      isRequired: boolean;
      name: string;
      selectBoxValues?: string[];
    }[];
  }[];
}

const EquipmentActors: FC<IEquipmentActorProps> = ({ actorTypes }) => {
  const modalId = 'add-edit-actor-modal';

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedSensorType, setSelectedSensorType] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  // const [currentSensors, setCurrentSensors] = useState(sensors);

  const onCreate = handleSubmit(async (data) => {
    const { id, name, sensorType, ...config } = data;

    const postData = JSON.stringify({
      name,
      type_id: sensorType,
      config,
    });

    await internalSdk.post('/sensors', {
      body: postData,
      headers: { 'content-type': 'application/json' },
    });

    $(`#${modalId}`).modal('hide');
  });

  const onEdit = handleSubmit(async (data) => {
    const { id, name, sensorType, ...config } = data;

    const postData = JSON.stringify({
      name,
      type_id: sensorType,
      config,
    });

    await internalSdk.put(`/sensors/${id}`, {
      body: postData,
      headers: { 'content-type': 'application/json' },
    });

    $(`#${modalId}`).modal('hide');
  });

  async function reloadSensors() {
    const { data } = await internalSdk.get('/actors', {});
    // setCurrentSensors(data as any);
  }

  async function onModalClose() {
    setSelectedSensorType(undefined);
    reset();
    await reloadSensors();
  }

  function generateSensorTypeForm(
    register: UseFormRegister<FieldValues>,
    errors: Record<string, any>,
  ) {
    if (!selectedSensorType) {
      return (
        <>
          {t('interpolation.select-type-message', { type: t('sensors.type') })}
        </>
      );
    }

    const actorType = actorTypes.find((st) => st.type === selectedSensorType);

    return actorType?.properties.map((stp) => {
      return (
        <FormPart
          part={{
            ...stp,
            type: stp.type as FormPartType,
            selectBoxValues: stp.selectBoxValues || [],
          }}
          register={register}
          errors={errors}
        />
      );
    });
  }

  return (
    <>
      <PageHeader title={t('actors.name')} />
      <PageContent>
        <Row>
          <Col>
            <Card>
              <CardHeader
                title={t('interpolation.list', { name: t('actors.name') })}
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
                    {/* {currentSensors?.map((sensor) => {
                      return (
                        <TableRow>
                          <TableBodyCell>{sensor.name}</TableBodyCell>
                          <TableBodyCell>{sensor.type_id}</TableBodyCell>
                          <TableBodyCell>0</TableBodyCell>
                          <TableBodyCell>
                            <Button
                              type="button"
                              size="sm"
                              color="info"
                              data-target={`#${modalId}`}
                              data-toggle="modal"
                              onClick={() => {
                                setSelectedSensorType(sensor.type_id);
                                setEditMode(true);
                                reset({
                                  id: sensor.id,
                                  name: sensor.name,
                                  sensorType: sensor.type_id,
                                  ...sensor.config,
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
                    })} */}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageContent>

      <Modal id={modalId} color="default" size="lg" onClose={onModalClose}>
        <form onSubmit={editMode ? onEdit : onCreate}>
          <input hidden {...register('id')} />

          <ModalHeader
            title={t('interpolation.new-thing', { type: t('sensors.name') })}
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
                id: 'sensorType',
                name: 'sensors.type',
                isRequired: true,
                selectBoxValues: actorTypes.map((st) => st.type),
                type: 'select-box',
                onChange: (e) => {
                  console.log(e);
                  setSelectedSensorType(e.target.value);
                },
              }}
              register={register}
              errors={errors}
            />

            <hr />

            {generateSensorTypeForm(register, errors)}
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

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const [{ data: actorTypes }] = await Promise.all([
    internalSdk.get('/actor-types', {}),
    // internalSdk.get('/sensors', {}),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      actorTypes,
    },
  };
};

export default EquipmentActors;
