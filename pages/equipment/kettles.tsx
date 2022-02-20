import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useTranslation } from '@overtheairbrew/next-i18next';
import { serverSideTranslations } from '@overtheairbrew/next-i18next/serverSideTranslations';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button';
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
import { IActor } from '../../lib/models/actor';
import { IKettle, ILogicType } from '../../lib/models/kettle';
import { ISensor } from '../../lib/models/sensor';

const localeConfig = require('../../locale-config.json');

interface IEquipmentActorProps {
  sensors: ISensor[];
  actors: IActor[];
  kettles: IKettle[];
  logicTypes: ILogicType[];
}

const EquipmentKettles: FC<IEquipmentActorProps> = ({
  actors,
  sensors,
  logicTypes,
  kettles,
}) => {
  const modal_id = 'kettle-modal';
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, touchedFields },
    reset,
  } = useForm();

  const onFormSubmit = async (data: any) => {
    if (!isEditMode) {
      const { name, sensor_id, heater_id, logicType_id, config } = data;

      await fetch(`${BASE_URL}/api/kettles`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          sensor_id,
          heater_id,
          logicType_id,
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

      await fetch(`${BASE_URL}/api/kettles/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...updateObj,
        }),
        headers: { 'content-type': 'application/json' },
      });
    }

    hideModal(modal_id);
    await reloadKettles();
  };

  const reloadKettles = async () => {
    const kettles = await fetch(`${BASE_URL}/api/kettles`).then((res) =>
      res.json(),
    );

    setUserKettles(kettles);
  };

  const generateTypesList = () => {
    const type = logicTypes.find((lt) => lt.type === selectedType);

    if (type) {
      return generateFormFromType(type, { register, errors }, 'config');
    }

    return <></>;
  };

  const [userKettles, setUserKettles] = useState(kettles);
  const [selectedType, setSelectedType] = useState<string>();
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <PageHeader title={t('kettles.name')} />
      <PageContent>
        <Card>
          <CardHeader>
            <CardTool>
              <IconButton
                className="btn-tool"
                icon={solid('plus')}
                data-target={`#${modal_id}`}
                data-toggle="modal"
                onClick={() => {
                  reset({
                    name: '',
                    sensor_id: '',
                    heater_id: '',
                    logicType_id: '',
                    config: '',
                  });
                  setSelectedType('');
                  setIsEditMode(false);
                }}
              />
            </CardTool>
          </CardHeader>
          <CardBody tableResponsive>
            <Table striped>
              <TableHead>
                <TableRow>
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Logic</HeaderCell>
                  <HeaderCell>Sensor</HeaderCell>
                  <HeaderCell>Heater</HeaderCell>
                  <HeaderCell>Options</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userKettles.map((kettle) => {
                  return (
                    <TableRow key={kettle.id}>
                      <TableBodyCell>{kettle.name}</TableBodyCell>
                      <TableBodyCell>{kettle.logicType_id}</TableBodyCell>
                      <TableBodyCell>
                        {sensors.find((s) => s.id === kettle.sensor_id)?.name}
                      </TableBodyCell>
                      <TableBodyCell>
                        {actors.find((a) => a.id === kettle.heater_id)?.name}
                      </TableBodyCell>
                      <TableBodyCell>
                        <Button
                          type="button"
                          size="sm"
                          color="info"
                          data-target={`#${modal_id}`}
                          data-toggle="modal"
                          onClick={() => {
                            setSelectedType(kettle.logicType_id || '');

                            const configs: Record<string, any> = {};

                            Object.keys(kettle.config || {}).forEach((key) => {
                              configs[`config.${key}`] = kettle.config[key];
                            });

                            reset({
                              ...kettle,
                              ...configs,
                            });
                            setIsEditMode(true);
                          }}
                        >
                          Edit
                        </Button>
                        &nbsp;
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
              ? t('interpolation.update-thing', { type: t('kettles.name') })
              : t('interpolation.new-thing', {
                  type: t('kettles.name'),
                })
          }
          footer={{
            button: {
              type: 'submit',
              text: isEditMode ? 'Update' : 'Create',
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
          />

          <SelectBox
            part={{
              id: 'sensor_id',
              name: t('sensors.name'),
              isRequired: false,
              selectBoxValues: sensors.map((s) => {
                return {
                  id: s.id,
                  name: s.name,
                };
              }),
              type: 'select-box',
            }}
            register={register}
            errors={errors}
          />

          <SelectBox
            part={{
              id: 'heater_id',
              name: t('heaters.name'),
              isRequired: false,
              selectBoxValues: actors.map((s) => {
                return {
                  id: s.id,
                  name: s.name,
                };
              }),
              type: 'select-box',
            }}
            register={register}
            errors={errors}
          />

          <SelectBox
            part={{
              id: 'logicType_id',
              name: t('logics.type'),
              isRequired: false,
              selectBoxValues: logicTypes.map((s) => {
                return {
                  id: s.type,
                  name: s.type,
                };
              }),
              type: 'select-box',
              onChange: (e) => {
                setSelectedType(e.target.value);

                reset({
                  config: undefined,
                });
              },
            }}
            register={register}
            errors={errors}
          />

          <hr />

          {selectedType ? (
            <>{generateTypesList()}</>
          ) : (
            <>
              {t('interpolation.select-type-message', {
                type: t('logics.type'),
              })}
            </>
          )}
        </Modal>
      </form>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const [actors, sensors, kettles, logicTypes] = await Promise.all([
    fetch(`${BASE_URL}/api/actors`).then((data) => data.json()),
    fetch(`${BASE_URL}/api/sensors`).then((data) => data.json()),
    fetch(`${BASE_URL}/api/kettles`).then((data) => data.json()),
    fetch(`${BASE_URL}/api/logic-types`).then((data) => data.json()),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      actors,
      sensors,
      kettles,
      logicTypes,
    },
  };
};

export default EquipmentKettles;
