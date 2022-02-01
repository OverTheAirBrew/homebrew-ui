import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from "@paljs/ui";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FC, useState } from "react";
import { Control, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import Modal from 'react-modal';
import styled, { css, withTheme } from 'styled-components';
import Input from "../../components/forms/input";
import SelectBox from "../../components/forms/select-box";
import { internalSdk } from "../../lib/sdks/api-sdk";
import { toastrService } from "../../lib/toastr-service";

const localeConfig = require('../../locale-config.json');

const NoPadCard = styled(Card)`
  margin-bottom: 0;
`

const HR = styled.hr`
  ${({ theme }) => css`
    border-color: ${theme.dividerColor};
    background-color: ${theme.dividerColor};
    color: ${theme.dividerColor}
  `}
`;

const FulLWidthTable = styled.table`
  width: 100%;

  th:last-child,
  td:last-child {
    text-align: right;
  }
`

interface ISensorType {
  type:string,
  properties: {id:string, type:string, isRequired: boolean, name:string, selectBoxValues:string[]}[]
}

interface IEquipmentSensorsProps {
  theme: any;
  sensorTypes: ISensorType[]
  sensors: any[]
}

Modal.setAppElement('#oah-layout')

async function fetchSensors() {
  return await internalSdk.get('/sensors', {})
}

const EquipmentSensors: FC<IEquipmentSensorsProps> = ({theme, sensorTypes, sensors}) => {
  const {t} = useTranslation();

  const {register, handleSubmit, control, formState: { errors}, reset} = useForm();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSensorType, setSelectedSensorType] = useState<string>()
  const [isEditMode, setEditMode] = useState(false)
  const [actSensors, setSensors] = useState(sensors)

  const sensorTypeOptions = sensorTypes?.map(sensorType => {
    return {
      value: sensorType.type,
      label: sensorType.type,
    }
  })

  function generateSensorTypeForm(register: UseFormRegister<FieldValues>, control: Control<FieldValues, object>, errors: Record<string, any>) {
    if(!selectedSensorType) {
      return <>{t('interpolation.select-type-message', {type: t('sensors.type')})}</>
    }
  
    const sensorType = sensorTypes.find(st => st.type === selectedSensorType)

    return sensorType?.properties.map(stp => {
      const [namespace, name] = stp.name.split(':')

      if(stp.type === 'string') {
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
            <br/>
          </>
        )
      }

      if(stp.type === 'number') {
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
              <br/>
            </Row>
            <br/>
          </>
        ) 
      }

      if(stp.type === 'select-box') {
        const options = stp.selectBoxValues.map(sbv => {
          return {
            value: sbv,
            label: sbv
          }
        })

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
                  control={control}
                  errors={errors}
                />
              </Col>
              <br/>
            </Row>
            <br/>
          </>
        ) 
      }
    })
  }

  const onSubmit = handleSubmit(async (data) => {
    const postData = {
      name: data.name,
      type_id: data.sensorType,
      config: {
        sensorAddress: data.sensorAddress,
        offset: parseFloat(data.offset) || undefined
      }
    }

    let isSuccess = false

    if(isEditMode) {
      ({isSuccess} = await internalSdk.put(`/sensors/${data.id}`, {body: JSON.stringify(postData), headers: {'content-type': 'application/json'}}))
    }else{
      ({isSuccess} = await internalSdk.post('/sensors', {body: JSON.stringify(postData), headers: {'content-type': 'application/json'}}))
    }


    if(isSuccess) {
      setModalIsOpen(false)
      toastrService.sendMessage('complete', 'sensor saved successfully')
    }else{

    }
  })

  const onEditClick = (sensor_id:string) => {
    const sensor = sensors.find(sensor => sensor.id === sensor_id);

    setSelectedSensorType(sensor.type_id)
    setModalIsOpen(true)
    setEditMode(true)
    reset({
      id: sensor.id,
      name: sensor.name,
      sensorType: sensor.type_id,
      sensorAddress: sensor.config.sensorAddress,
      offset: sensor.config.offset
    })
  }


  return (
      <>
      <Card>
        <CardHeader>
          {t('sensors.name', {count: 2})}
          <Button style={{float: 'right'}} appearance='ghost' size={'Small'} onClick={() => setModalIsOpen(true)}>
            Add Sensor
          </Button>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
            <div style={{overflowX: 'auto'}}>
              <FulLWidthTable>
                <thead>
                  <tr>
                    <th>{t('global.name')}</th>
                    <th>Type</th>
                    <th>CurrentValue</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                {
                  sensors.map(sensor => {
                    return(
                      <tr>
                        <td>{sensor.name}</td>
                        <td>{sensor.type_id}</td>
                        <td>0</td>
                        <td>
                          <Button size="Small" onClick={() => onEditClick(sensor.id)}>Edit</Button>&nbsp;
                          <Button size="Small" status="Danger" >Delete</Button>
                        </td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </FulLWidthTable>
              </div>
            </Col>
          </Row>
       
          {/* {generateSensors(sensors)} */}
          
        </CardBody>
      </Card>

      <Modal
        isOpen={modalIsOpen}
        contentLabel="test"
        onAfterClose={() => {
          setSelectedSensorType(undefined);
          reset(undefined);
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.87)'
          },
          content: {
            border: '0',
            borderRadius: '4px',
            bottom: 'auto',
            minHeight: '10rem',
            left: '50%',
            padding: '0 !important',
            position: 'fixed',
            right: 'auto',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            minWidth: '20rem',
            width: '80%',
            maxWidth: '60rem',
            backgroundColor: theme.cardBackgroundColor
          }
          
        }}>
         <NoPadCard>
          <form onSubmit={onSubmit}>
            <input hidden {...register('id')} />
            
            <CardHeader>
              {t('interpolation.new-thing', {type: t('sensors.name')})}
              <Button style={{float: 'right'}} appearance='ghost' size={'Small'} status={"Basic"} onClick={() => setModalIsOpen(false)}>X</Button>
            </CardHeader>
            
              <CardBody>
                <Row>
                  <Col>
                    <Input
                      fieldId="name"
                      translationFieldName="global.name"
                      isRequired={true}
                      type="text"
                      register={register}
                      errors={errors}
                    />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>  
                    <SelectBox 
                      fieldId="sensorType"
                      translationFieldName="sensors.type"
                      isRequired={true}
                      options={sensorTypeOptions}
                      onChange={setSelectedSensorType}
                      control={control}
                      errors={errors}
                    />
                  </Col>
                </Row>
                <br/>
                <HR />
                <br/>
                {generateSensorTypeForm(register, control, errors)}
            </CardBody>
            <CardFooter>
              {
                isEditMode ?  <Button style={{float: 'right', marginBottom: '10px'}} appearance='ghost' size={'Small'} type="submit">Update</Button> :  <Button style={{float: 'right', marginBottom: '10px'}} appearance='ghost' size={'Small'} type="submit">Create</Button>
              }
            </CardFooter>
           </form>
         </NoPadCard>
      </Modal>
    </>)
}

export const getServerSideProps = async ({locale}: {locale:string}) => {
  const [{data: sensorTypes}, {data: sensors}] = await Promise.all([
    internalSdk.get('/sensor-types', {}),
    internalSdk.get('/sensors', {})
  ])
    
  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      sensors,
      sensorTypes: sensorTypes,
    },
  }
}

export default withTheme(EquipmentSensors)

