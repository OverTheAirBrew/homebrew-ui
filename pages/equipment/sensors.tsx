import { faPlus } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/dist/client/router';
import { FC, useState } from 'react';
import {
  Control,
  FieldValues,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import Button from '../../components/button';
import IconButton from '../../components/button/icon';
import Card from '../../components/card';
import CardBody from '../../components/card/body';
import CardHeader from '../../components/card/header';
import CardTool from '../../components/card/tools';
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
import TableBodyCell from '../../components/table/body-cell';
import TableHead from '../../components/table/head';
import HeaderCell from '../../components/table/header-cell';
import TableRow from '../../components/table/row';
import { internalSdk } from '../../lib/sdks/api-sdk';
const localeConfig = require('../../locale-config.json');

interface IEquipmentSensorsProps {
  sensors: any[];
  sensorTypes: any[];
}

const EquipmentSensors: FC<IEquipmentSensorsProps> = ({
  sensors,
  sensorTypes,
}) => {
  const modalId = 'testing-modal';

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedSensorType, setSelectedSensorType] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const [currentSensors, setCurrentSensors] = useState(sensors);

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
    await reloadSensors();
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
    await reloadSensors();
  });

  async function reloadSensors() {
    const { data } = await internalSdk.get('/sensors', {});
    setCurrentSensors(data as any);
  }

  function generateSensorTypeForm(
    register: UseFormRegister<FieldValues>,
    control: Control<FieldValues, object>,
    errors: Record<string, any>,
  ) {
    if (!selectedSensorType) {
      return (
        <>
          {t('interpolation.select-type-message', { type: t('sensors.type') })}
        </>
      );
    }

    const sensorType = sensorTypes.find((st) => st.type === selectedSensorType);

    return sensorType?.properties.map((stp) => {
      const [namespace, name] = stp.name.split(':');

      if (stp.type === 'string') {
        return (
          <>
            <Row>
              <Col>
                <Input
                  key={stp.id}
                  fieldId={stp.id}
                  type="text"
                  translationFieldName={stp.name}
                  isRequired={stp.isRequired}
                  register={register}
                  errors={errors}
                />
              </Col>
            </Row>
            <br />
          </>
        );
      }

      if (stp.type === 'number') {
        return (
          <>
            <Row>
              <Col>
                <Input
                  key={stp.id}
                  fieldId={stp.id}
                  type="number"
                  translationFieldName={stp.name}
                  isRequired={stp.isRequired}
                  register={register}
                  errors={errors}
                />
              </Col>
              <br />
            </Row>
            <br />
          </>
        );
      }

      if (stp.type === 'select-box') {
        const options = stp.selectBoxValues.map((sbv) => sbv);

        return (
          <>
            <Row>
              <Col>
                <SelectBox
                  key={stp.id}
                  fieldId={stp.id}
                  translationFieldName={stp.name}
                  isRequired={stp.isRequired}
                  options={options}
                  register={register}
                  errors={errors}
                />
              </Col>
              <br />
            </Row>
            <br />
          </>
        );
      }
    });
  }

  const router = useRouter();

  return (
    <>
      <PageHeader title="Sensors" currentPath={router.pathname} />
      <PageContent>
        <Row>
          <Col>
            <Card>
              <CardHeader title="Sensor List">
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
                      <HeaderCell>Current Value</HeaderCell>
                      <HeaderCell>Options</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentSensors?.map((sensor) => {
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
                    })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageContent>

      <Modal id={modalId} color="default" size="lg">
        <form onSubmit={editMode ? onEdit : onCreate}>
          <input hidden {...register('id')} />

          <ModalHeader
            title={t('interpolation.new-thing', { type: t('sensors.name') })}
          />
          <ModalBody>
            <Input
              fieldId="name"
              translationFieldName="global.name"
              isRequired={true}
              type="text"
              register={register}
              errors={errors}
            />

            <SelectBox
              fieldId="sensorType"
              translationFieldName="sensors.type"
              isRequired={true}
              options={sensorTypes?.map((sensorType) => sensorType.type)}
              onChange={(e) => {
                console.log(e);
                setSelectedSensorType(e.target.value);
              }}
              register={register}
              errors={errors}
            />

            <hr />

            {generateSensorTypeForm(register, control, errors)}
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
  const [{ data: sensorTypes }, { data: sensors }] = await Promise.all([
    internalSdk.get('/sensor-types', {}),
    internalSdk.get('/sensors', {}),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      sensors,
      sensorTypes: sensorTypes,
    },
  };
};

export default EquipmentSensors;
