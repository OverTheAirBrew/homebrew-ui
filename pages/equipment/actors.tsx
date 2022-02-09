import { useTranslation } from '@overtheairbrew/next-i18next';
import { serverSideTranslations } from '@overtheairbrew/next-i18next/serverSideTranslations';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import TableWithAddModal from '../../components/table-with-add-modal';
import { BASE_URL } from '../../lib/config';
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

  actors: {
    id: string;
    name: string;
    type_id: string;
    config: any;
  }[];
}

const EquipmentActors: FC<IEquipmentActorProps> = ({ actorTypes, actors }) => {
  const modalId = 'add-edit-actor-modal';

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedActorType, setSelectedActorType] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const [currentActors, setCurrentActors] = useState(actors);

  const onCreate = async (data: {
    id: string;
    name: string;
    type_id: string;
  }) => {
    const { id, name, type_id, ...config } = data;

    const postData = JSON.stringify({
      name,
      type_id,
      config,
    });

    await fetch(`${BASE_URL}/api/actors`, {
      method: 'POST',
      body: postData,
      headers: { 'content-type': 'application/json' },
    });

    await reloadSensors();
  };

  const onEdit = async (data: {
    id: string;
    name: string;
    type_id: string;
  }) => {
    const { id, name, type_id, ...config } = data;

    const postData = JSON.stringify({
      name,
      type_id,
      config,
    });

    await fetch(`${BASE_URL}/api/sensors/${id}`, {
      body: postData,
      headers: { 'content-type': 'application/json' },
    });

    await reloadSensors();
  };

  async function reloadSensors() {
    const data = await fetch(`${BASE_URL}/api/actors`, {}).then((data) =>
      data.json(),
    );
    setCurrentActors(data as any);
  }

  return (
    <TableWithAddModal
      types={actorTypes}
      values={currentActors}
      selected={{
        set: setSelectedActorType,
        type: selectedActorType,
      }}
      tableType="actors"
      onSubmit={editMode ? onEdit : onCreate}
      editMode={{
        value: editMode,
        set: setEditMode,
      }}
    />

    // <>
    //   <PageHeader title={t('actors.name')} />
    //   <PageContent>
    //     <Row>
    //       <Col>
    //         <Card>
    //           <CardHeader
    //             title={t('interpolation.list', { type: t('actors.name') })}
    //           >
    //             <CardTool>
    //               <IconButton
    //                 className="btn-tool"
    //                 icon={faPlus}
    //                 data-target={`#${modalId}`}
    //                 data-toggle="modal"
    //               />
    //             </CardTool>
    //           </CardHeader>
    //           <CardBody>
    //             <Table>
    //               <TableHead>
    //                 <TableRow>
    //                   <HeaderCell>Name</HeaderCell>
    //                   <HeaderCell>Type</HeaderCell>
    //                   <HeaderCell>State</HeaderCell>
    //                   <HeaderCell>Options</HeaderCell>
    //                 </TableRow>
    //               </TableHead>
    //               <TableBody>
    //                 {currentActors?.map((actor) => {
    //                   return (
    //                     <TableRow>
    //                       <TableBodyCell>{actor.name}</TableBodyCell>
    //                       <TableBodyCell>{actor.type_id}</TableBodyCell>
    //                       <TableBodyCell>0</TableBodyCell>
    //                       <TableBodyCell>
    //                         <Button
    //                           type="button"
    //                           size="sm"
    //                           color="info"
    //                           data-target={`#${modalId}`}
    //                           data-toggle="modal"
    //                           onClick={() => {
    //                             setSelectedActorType(actor.type_id);
    //                             setEditMode(true);
    //                             reset({
    //                               id: actor.id,
    //                               name: actor.name,
    //                               sensorType: actor.type_id,
    //                               ...actor.config,
    //                             });
    //                           }}
    //                         >
    //                           Edit
    //                         </Button>
    //                         &nbsp;
    //                         <Button type="button" size="sm" color="danger">
    //                           Delete
    //                         </Button>
    //                       </TableBodyCell>
    //                     </TableRow>
    //                   );
    //                 })}
    //               </TableBody>
    //             </Table>
    //           </CardBody>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </PageContent>

    //   <Modal id={modalId} color="default" size="lg" onClose={onModalClose}>
    //     <form onSubmit={editMode ? onEdit : onCreate}>
    //       <input hidden {...register('id')} />

    //       <ModalHeader
    //         title={t('interpolation.new-thing', { type: t('actors.name') })}
    //       />
    //       <ModalBody>
    //         <Input
    //           part={{
    //             id: 'name',
    //             name: 'global.name',
    //             isRequired: true,
    //             type: 'string',
    //             selectBoxValues: [],
    //           }}
    //           register={register}
    //           errors={errors}
    //         />

    //         <SelectBox
    //           part={{
    //             id: 'type_id',
    //             name: t('actors.type'),
    //             isRequired: true,
    //             selectBoxValues: actorTypes.map((st) => st.type),
    //             type: 'select-box',
    //             onChange: (e) => {
    //               console.log(e);
    //               setSelectedActorType(e.target.value);
    //             },
    //           }}
    //           register={register}
    //           errors={errors}
    //         />

    //         <hr />

    //         {generateSensorTypeForm(register, errors)}
    //       </ModalBody>
    //       <ModalFooter>
    //         <Button
    //           color="primary"
    //           type="submit"
    //           size="sm"
    //           className="float-right"
    //         >
    //           Save
    //         </Button>
    //       </ModalFooter>
    //     </form>
    //   </Modal>
    // </>
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
