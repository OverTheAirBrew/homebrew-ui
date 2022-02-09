import { serverSideTranslations } from '@overtheairbrew/next-i18next/serverSideTranslations';
import fetch from 'isomorphic-unfetch';
import { FC, useState } from 'react';
import TableWithAddModal from '../../components/table-with-add-modal';
import { BASE_URL } from '../../lib/config';

const localeConfig = require('../../locale-config.json');

interface IEquipmentSensorsProps {
  sensors: {
    id: string;
    name: string;
    type_id: string;
    config: any;
  }[];
  sensorTypes: {
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

const EquipmentSensors: FC<IEquipmentSensorsProps> = ({
  sensors,
  sensorTypes,
}) => {
  const [selectedSensorType, setSelectedSensorType] = useState<string>();
  const [editMode, setEditMode] = useState(false);
  const [currentSensors, setCurrentSensors] = useState(sensors);

  const onCreate = async (data: { [x: string]: any }) => {
    const { id, name, type_id, ...config } = data;

    const postData = JSON.stringify({
      name,
      type_id: type_id,
      config,
    });

    await fetch('/api/sensors', {
      method: 'POST',
      body: postData,
      headers: { 'content-type': 'application/json' },
    });

    await reloadSensors();
  };

  const onEdit = async (data: { [x: string]: any }) => {
    const { id, name, sensorType, ...config } = data;

    const postData = JSON.stringify({
      name,
      type_id: sensorType,
      config,
    });

    await fetch(`/api/sensors/${id}`, {
      method: 'PUT',
      body: postData,
      headers: { 'content-type': 'application/json' },
    });

    await reloadSensors();
  };

  async function reloadSensors() {
    const response = await fetch('/api/sensors', {});
    const data = await response.json();
    setCurrentSensors(data as any);
  }

  return (
    <TableWithAddModal
      types={sensorTypes}
      values={currentSensors}
      selected={{
        set: setSelectedSensorType,
        type: selectedSensorType,
      }}
      tableType="sensors"
      onSubmit={editMode ? onEdit : onCreate}
      editMode={{
        value: editMode,
        set: setEditMode,
      }}
    />
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const [sensorTypes, sensors] = await Promise.all([
    fetch(`${BASE_URL}/api/sensor-types`, {}).then((data) => data.json()),
    fetch(`${BASE_URL}/api/sensors`, {}).then((data) => data.json()),
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
