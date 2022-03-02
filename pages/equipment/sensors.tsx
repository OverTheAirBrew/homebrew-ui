import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useTranslation } from '@overtheairbrew/next-i18next';
import { serverSideTranslations } from '@overtheairbrew/next-i18next/serverSideTranslations';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '../../components/button/icon';
import Card from '../../components/card';
import CardBody from '../../components/card/body';
import CardHeader from '../../components/card/header';
import CardTool from '../../components/card/tools';
import { generateFormFromType } from '../../components/forms';
import Input from '../../components/forms/input';
import SelectBox from '../../components/forms/select-box';
import PageContent from '../../components/layout/page/content';
import PageHeader from '../../components/layout/page/header';
import Modal, { hideModal } from '../../components/modal';
import Table from '../../components/table';
import TableBody from '../../components/table/body';
import TableBodyCell from '../../components/table/body-cell';
import TableHead from '../../components/table/head';
import HeaderCell from '../../components/table/header-cell';
import TableRow from '../../components/table/row';
import { BASE_URL } from '../../lib/config';
import { ISensor, ISensorType } from '../../lib/models/sensor';

const localeConfig = require('../../locale-config.json');

interface IEquipmentActorProps {
  sensors: ISensor[];
  sensorTypes: ISensorType[];
}

const EquipmentActor: FC<IEquipmentActorProps> = ({ sensors, sensorTypes }) => {
  const { t } = useTranslation();
  const modal_id = 'create-sensor';
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, touchedFields },
    reset,
  } = useForm();

  const onFormSubmit = async (data: any) => {
    if (!isEditMode) {
      const { name, type_id, ...config } = data;

      await fetch(`${BASE_URL}/api/sensors`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          type_id,
          config,
        }),
        headers: { 'content-type': 'application/json' },
      });
    } else if (isDirty) {
      const updateObj: Record<string, any> = {};

      const { id } = data;

      for (const key of Object.keys(touchedFields)) {
        const value = data[key];
        updateObj[key] = value;
      }

      await fetch(`${BASE_URL}/api/sensors/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateObj),
        headers: { 'content-type': 'application/json' },
      });
    }

    hideModal(modal_id);
    await refreshSensors();
  };

  const refreshSensors = async () => {
    const sensors = await fetch(`${BASE_URL}/api/sensors`).then((res) =>
      res.json(),
    );
    setUserSensors(sensors);
  };

  const [selectedType, setSelectedType] = useState<string>();
  const [userSensors, setUserSensors] = useState(sensors);
  const [isEditMode, setEditMode] = useState(false);

  const generateTypesList = () => {
    const type = sensorTypes.find((st) => st.type === selectedType);

    if (type) {
      return generateFormFromType(type, { register, errors }, 'config');
    }

    return <></>;
  };

  return (
    <>
      <PageHeader title={t('sensors.name')}></PageHeader>
      <PageContent>
        <Card>
          <CardHeader>
            <CardTool>
              <IconButton
                data-testing="add-create-sensor"
                className="btn-tool"
                icon={solid('plus')}
                data-target={`#${modal_id}`}
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
                {userSensors.map((sensor) => {
                  return (
                    <TableRow
                      key={sensor.name}
                      data-testing={`sensor-${sensor.name}`}
                    >
                      <TableBodyCell>{sensor.name}</TableBodyCell>
                      <TableBodyCell>{sensor.type_id}</TableBodyCell>
                      <TableBodyCell>0</TableBodyCell>
                      <TableBodyCell>
                        {/* <Button
                          type="button"
                          size="sm"
                          color="info"
                          data-target={`#${modal_id}`}
                          data-toggle="modal"
                          onClick={() => {
                            setSelectedType(sensor.type_id);

                            const configs: Record<string, any> = {};

                            Object.keys(sensor.config || {}).forEach((key) => {
                              configs[`config.${key}`] = sensor.config[key];
                            });

                            reset({
                              ...sensor,
                              ...configs,
                            });

                            setEditMode(true);
                          }}
                        >
                          Edit
                        </Button>
                        &nbsp; */}
                        {/* <Button type="button" size="sm" color="danger">
                          Delete
                        </Button> */}
                      </TableBodyCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </PageContent>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Modal
          id={modal_id}
          headerTitle={
            isEditMode
              ? t('interpolation.update-thing', { type: t('sensors.name') })
              : t('interpolation.new-thing', {
                  type: t('sensors.name'),
                })
          }
          footer={{
            button: {
              type: 'submit',
              text: isEditMode ? 'Edit' : 'Create',
            },
          }}
        >
          <Input
            part={{
              id: 'name',
              name: t('global.name'),
              isRequired: true,
              type: 'string',
            }}
            register={register}
            errors={errors}
            data-testing="modal-name"
          />

          <SelectBox
            part={{
              id: 'type_id',
              name: t('sensors.type'),
              isRequired: true,
              selectBoxValues: sensorTypes.map((at) => {
                return {
                  id: at.type,
                  name: at.type,
                };
              }),
              type: 'select-box',
              onChange: (e) => {
                setSelectedType(e.target.value);
              },
            }}
            register={register}
            errors={errors}
            data-testing="modal-type"
          />

          <hr />

          {selectedType ? (
            <>{generateTypesList()}</>
          ) : (
            <>
              {t('interpolation.select-type-message', {
                type: t('sensors.type'),
              })}
            </>
          )}
        </Modal>
      </form>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const [sensorTypes, sensors] = await Promise.all([
    fetch(`${BASE_URL}/api/sensor-types`).then((data) => data.json()),
    fetch(`${BASE_URL}/api/sensors`).then((data) => data.json()),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      sensorTypes,
      sensors,
    },
  };
};

export default EquipmentActor;
