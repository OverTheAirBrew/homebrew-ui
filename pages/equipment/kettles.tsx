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
import Input from '../../components/forms/input';
import SelectBox from '../../components/forms/select-box';
import PageContent from '../../components/layout/page/content';
import PageHeader from '../../components/layout/page/header';
import Modal from '../../components/modal';
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
    formState: { errors },
    reset,
  } = useForm();

  const onModalClose = () => {
    reset();
    setSelectedType(undefined);
  };

  const onFormSubmit = async (data: any) => {
    const { name, sensor_id, heater_id, ...config } = data;

    await fetch(`${BASE_URL}/api/kettles`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        sensor_id,
        heater_id,
      }),
      headers: { 'content-type': 'application/json' },
    });
  };

  const reloadKettles = async () => {
    const kettles = await fetch(`${BASE_URL}/api/kettles`).then((res) =>
      res.json(),
    );

    setUserKettles(kettles);
  };

  const [userKettles, setUserKettles] = useState(kettles);
  const [selectedType, setSelectedType] = useState<string>();

  return (
    <>
      <PageHeader title="Kettles" />
      <PageContent>
        <Card>
          <CardHeader>
            <CardTool>
              <IconButton
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
                  <HeaderCell>Sensor</HeaderCell>
                  <HeaderCell>Heater</HeaderCell>
                  <HeaderCell>Options</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userKettles.map((kettle) => {
                  return (
                    <TableRow key={kettle.name}>
                      <TableBodyCell>{kettle.name}</TableBodyCell>
                      <TableBodyCell>
                        {sensors.find((s) => s.id === kettle.sensor_id)?.name}
                      </TableBodyCell>
                      <TableBodyCell>
                        {actors.find((a) => a.id === kettle.heater_id)?.name}
                      </TableBodyCell>
                      <TableBodyCell>
                        {/* <Button
                    type="button"
                    size="sm"
                    color="info"
                    data-target={`#${modal_id}`}
                    data-toggle="modal"
                    onClick={() => {
                      setSelectedSensorType(value.type_id);
                      setEditMode(true);
                      form.reset({
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
          headerTitle={t('interpolation.new-thing', {
            type: t('kettles.name'),
          })}
          footer={{
            button: {
              type: 'submit',
              text: 'Create',
            },
          }}
          onClose={onModalClose}
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
              isRequired: true,
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
                  id: s,
                  name: s,
                };
              }),
              type: 'select-box',
              onChange: (e) => {
                setSelectedType(e.target.value);
              },
            }}
            register={register}
            errors={errors}
          />

          <hr />

          {selectedType ? (
            // <>{generateSensorTypeList()}</>
            <></>
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
  const [actors, sensors, kettles] = await Promise.all([
    fetch(`${BASE_URL}/api/actors`).then((data) => data.json()),
    fetch(`${BASE_URL}/api/sensors`).then((data) => data.json()),
    fetch(`${BASE_URL}/api/kettles`).then((data) => data.json()),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      actors,
      sensors,
      kettles,
      logicTypes: [],
    },
  };
};

export default EquipmentKettles;
