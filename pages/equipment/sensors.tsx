import { Button, Card, CardBody, CardFooter, CardHeader, Col, InputGroup, Row, Select } from "@paljs/ui";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from 'react-modal';
import styled, { css, withTheme } from 'styled-components';
import { internalSdk } from "../../lib/sdks/api-sdk";


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


interface ISensorType {
  type:string,
  properties: {id:string, type:string, isRequired: boolean, name:string, selectBoxValues:string[]}[]
}

interface IEquipmentSensorsProps {
  theme: any;
  sensorTypes: ISensorType[]
}

const EquipmentSensors: FC<IEquipmentSensorsProps> = ({theme, sensorTypes}) => {
  const {t} = useTranslation();

  const {register, handleSubmit, watch, control, formState: { errors, isValid }} = useForm();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<string>()

  const sensorTypeOptions = sensorTypes?.map(sensorType => {
    return {
      value: sensorType.type,
      label: sensorType.type,
    }
  })

  function generateSensorTypeForm() {
    if(!selectedSensor) {
      return <>Please select a sensor type to configure</>
    }
  
    const sensorType = sensorTypes.find(st => st.type === selectedSensor)

    return sensorType?.properties.map(stp => {
      const [namespace, name] = stp.name.split(':')

      if(stp.type === 'string') {
        return (
          <>
            <InputGroup fullWidth>
              <input type="text" placeholder={t(name, {ns: namespace})} {...register(name)} required={stp.isRequired} />
            </InputGroup>
            <br/>
          </>
        )
      }

      if(stp.type === 'number') {
        return (
          <>
            <InputGroup fullWidth>
              <input type="number" placeholder={t(name, {ns: namespace})} {...register(name)} required={stp.isRequired} />
            </InputGroup>
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
            <Controller 
              name={name}
              rules={{
                required: stp.isRequired
              }}
              control={control}
              render={({ field: { onChange, value, ref }}) => (
                <Select
                  inputRef={ref}
                  value={options.filter(c => value?.includes(c.value))}
                  onChange={val => {
                    onChange(val?.value)
                    // setSelectedSensor(val?.value)
                  }}
                  options={options}
                  placeholder={t(name, {ns: namespace})}
                  required={stp.isRequired}
                />
              )}
            />
          <br/>
          </>
        )
      }
    })
  }

  const onSubmit = (data) => console.log(data);


  return (
      <>
      <Card>
        <CardHeader>
          Sensors
          <Button style={{float: 'right'}} appearance='ghost' size={'Small'} onClick={() => setModalIsOpen(true)}>
            Add Sensor
          </Button>
        </CardHeader>
        <CardBody>
          {/* {generateSensors(sensors)} */}
          BODY
        </CardBody>
      </Card>

      <Modal
        isOpen={modalIsOpen}
        contentLabel="test"
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
        }}
      >
         <NoPadCard>
          <CardHeader>
            Add New Sensor
            <Button style={{float: 'right'}} appearance='ghost' size={'Small'} status={"Basic"} onClick={() => setModalIsOpen(false)}>X</Button>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
                <Row>
                  <Col>
                    <InputGroup fullWidth>
                      <input placeholder="Name" {...register("name")} required />
                    </InputGroup>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>  
                    <Controller 
                      name="sensor-type"
                      rules={{
                        required: true
                      }}
                      control={control}
                      render={({ field: { onChange, value, ref }}) => (
                        <Select
                          inputRef={ref}
                          value={sensorTypeOptions.filter(c => value?.includes(c.value))}
                          onChange={val => {
                            onChange(val?.value)
                            setSelectedSensor(val?.value)
                          }}
                          options={sensorTypeOptions}
                          required
                        />
                      )}
                    />
                  </Col>
                </Row>
                <br/>
                <HR />
                <br/>

                {generateSensorTypeForm()}
                {/* {errors} */}
          </CardBody>
           <CardFooter>
              <Button style={{float: 'right', marginBottom: '10px'}} appearance='ghost' size={'Small'} type="submit">Create</Button>
           </CardFooter>
           </form>
         </NoPadCard>
      </Modal>
    </>)
}

export const getServerSideProps = async ({locale}: {locale:string}) => {
  const [{data: sensorTypes}] = await Promise.all([
    internalSdk.get('/sensor-types', {})
  ])
    
  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      sensors: [],
      sensorTypes: sensorTypes,
    },
  }
}

export default withTheme(EquipmentSensors)

