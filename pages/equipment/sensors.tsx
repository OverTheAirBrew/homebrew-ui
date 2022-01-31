import { Button, Card, CardBody, CardFooter, CardHeader, Col, InputGroup, Row, Select } from "@paljs/ui";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FC, useState } from "react";
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
  properties: {id:string, type:string, isRequired: boolean, name:string}[]
}

interface IEquipmentSensorsProps {
  theme: any;
  sensorTypes: ISensorType[]
}

const EquipmentSensors: FC<IEquipmentSensorsProps> = ({theme, sensorTypes}) => {
  const {t} = useTranslation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<string>()

  const sensorTypeOptions = sensorTypes?.map(sensorType => {
    return {
      value: sensorType.type,
      label: sensorType.type
    }
  })

  function generateSensorTypeForm() {
    if(!selectedSensor) {
      return <>NONE</>
    }
  
    const sensorType = sensorTypes.find(st => st.type === selectedSensor)

    return sensorType?.properties.map(stp => {
      const [namespace, name] = stp.name.split(':')

      return (
        <>
          <InputGroup fullWidth>
            <input type="text" placeholder={t(name, {ns: namespace})} />
          </InputGroup>
          <br/>
        </>
      )
    })
  }

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
            // color: theme.cardTextColor,
            // top: '500px',
            // left: '50%',
            // height: "auto",
            // transform: 'translate(-50%, -50%)',
            // backgroundColor: theme.cardBackgroundColor
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
       {/* <Container> */}
         <NoPadCard>
           <CardHeader>Add New Sensor</CardHeader>
           <CardBody>
            <Row>
              <Col>
                <InputGroup fullWidth>
                  <input type="text" placeholder="Name" />
                </InputGroup>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <Select options={sensorTypeOptions} onChange={(e) => setSelectedSensor(e?.value)}/>
              </Col>
            </Row>
            <br/>
            <HR />
            <br/>
            {generateSensorTypeForm()}
          </CardBody>
           <CardFooter>
              <Button style={{float: 'right'}} appearance='ghost' size={'Small'} onClick={() => setModalIsOpen(false)}>Create</Button>
           </CardFooter>
         </NoPadCard>
        
      {/* </Container> */}
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

