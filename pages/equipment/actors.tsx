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
import FormPart from '../../components/forms';
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
import { IActor, IActorType } from '../../lib/models/actor';

const localeConfig = require('../../locale-config.json');

interface IEquipmentActorProps {
  actors: IActor[];
  actorTypes: IActorType[];
}

const EquipmentActors: FC<IEquipmentActorProps> = ({ actors, actorTypes }) => {
  const { t } = useTranslation();
  const modal_id = 'create-actor';
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // const onModalClose = () => {
  //   reset();
  //   setSelectedType(undefined);
  // };

  const onFormSubmit = async (data: any) => {
    const { name, type_id, ...config } = data;

    await fetch(`${BASE_URL}/api/actors`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        type_id,
        config,
      }),
      headers: { 'content-type': 'application/json' },
    });

    hideModal(modal_id);
    await refreshActors();
  };

  const refreshActors = async () => {
    const actors = await fetch(`${BASE_URL}/api/actors`).then((res) =>
      res.json(),
    );
    setUserActors(actors);
  };

  const [selectedType, setSelectedType] = useState<string>();
  const [userActors, setUserActors] = useState(actors);

  const generateSensorTypeList = () => {
    const type = actorTypes.find((at) => at.type === selectedType);

    return type?.properties.map((p) => {
      return (
        <FormPart
          key={p.id}
          part={{
            ...p,
            selectBoxValues: p.selectBoxValues?.map((s) => {
              return { id: s, name: s };
            }),
          }}
          register={register}
          errors={errors}
        />
      );
    });
  };

  return (
    <>
      <PageHeader title={t('actors.name')}></PageHeader>
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
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Current State</HeaderCell>
                  <HeaderCell>Options</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userActors.map((actor) => {
                  return (
                    <TableRow key={actor.name}>
                      <TableBodyCell>{actor.name}</TableBodyCell>
                      <TableBodyCell>{actor.type_id}</TableBodyCell>
                      <TableBodyCell>0</TableBodyCell>
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
          headerTitle={t('interpolation.new-thing', { type: t('actors.name') })}
          footer={{
            button: {
              type: 'submit',
              text: 'Create',
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
              id: 'type_id',
              name: t('actors.type'),
              isRequired: true,
              selectBoxValues: actorTypes.map((at) => {
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
          />

          <hr />

          {selectedType ? (
            <>{generateSensorTypeList()}</>
          ) : (
            <>
              {t('interpolation.select-type-message', {
                type: t('actors.type'),
              })}
            </>
          )}
        </Modal>
      </form>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const [actorTypes, actors] = await Promise.all([
    fetch(`${BASE_URL}/api/actor-types`).then((data) => data.json()),
    fetch(`${BASE_URL}/api/actors`).then((data) => data.json()),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      actorTypes,
      actors,
    },
  };
};

export default EquipmentActors;
