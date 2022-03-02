import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { useAppContext } from '../lib/context';
import Card from './card';
import CardBody from './card/body';
import CardFooter from './card/footer';
import CardHeader from './card/header';
import Col from './layout/grid/col';
import Row from './layout/grid/row';

const TemperatureContainer = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 1.5rem;
  }
`;

const Pid: FC = () => {
  const { socket } = useAppContext();

  const [temperature, setTemperature] = useState(0);
  const [targetTemperature, setTargetTemp] = useState(0);

  const updateTargetTemp = (way: 'positive' | 'negative') => {
    if (way === 'positive' && targetTemperature < 100) {
      setTargetTemp(targetTemperature + 1);
    }

    if (way === 'negative' && targetTemperature > 0) {
      setTargetTemp(targetTemperature - 1);
    }
  };

  const handleTempUpdate = (data: { sensor_id: string; value: number }) => {
    if (data.sensor_id === '50666a5d-3bd3-4432-878d-db6eeac8d875') {
      setTemperature(data.value);
    }
  };

  useEffect(() => {
    socket.on('sensors.sensor.reading', handleTempUpdate);

    return () => {
      socket.off('sensors.sensor.reading', handleTempUpdate);
    };
  }, []);

  return (
    <Card>
      <CardHeader title="Kettle 1" />
      <CardBody>
        <Row verticalAlign="align-items-center">
          <Col breakPoint={{ lg: 10 }}>
            <TemperatureContainer>
              <Row>
                <Col>Temp</Col>
              </Row>
              <Row>
                <Col>
                  <h1>{temperature} &deg;c</h1>
                </Col>
              </Row>
              <Row>
                <Col>Target</Col>
              </Row>
              <Row>
                <Col>
                  <h2>{targetTemperature} &deg;c</h2>
                </Col>
              </Row>
            </TemperatureContainer>
          </Col>
          <Col>
            <div className="btn-group-vertical">
              <button
                className="btn btn-default btn-lg btn-flat"
                onMouseDown={() => updateTargetTemp('positive')}
                data-tip
                data-for="target_temp_up"
              >
                &#8593;
              </button>
              <ReactTooltip
                id="target_temp_up"
                place="right"
                effect="solid"
                backgroundColor="black"
              >
                Raise Target Temperature
              </ReactTooltip>
              <button
                className="btn btn-default btn-lg btn-flat"
                onMouseDown={() => updateTargetTemp('negative')}
                data-tip
                data-for="target_temp_down"
              >
                &#8595;
              </button>
              <ReactTooltip
                id="target_temp_down"
                place="right"
                effect="solid"
                backgroundColor="black"
              >
                Lower Target Temperature
              </ReactTooltip>
            </div>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <div className="btn-group text-center btn-block">
          <button
            className="btn btn-default btn-lg btn-flat"
            data-tip
            data-for="auto"
          >
            <FontAwesomeIcon icon={solid('sync')} />
          </button>
          <ReactTooltip
            id="auto"
            place="bottom"
            effect="solid"
            backgroundColor="black"
          >
            Toggle Auto
          </ReactTooltip>
          <button
            className="btn btn-default btn-lg btn-flat"
            data-tip
            data-for="toggle_heater"
          >
            <FontAwesomeIcon icon={solid('fire')} />
          </button>
          <ReactTooltip
            id="toggle_heater"
            place="bottom"
            effect="solid"
            backgroundColor="black"
          >
            Toggle Heater
          </ReactTooltip>
          <button
            className="btn btn-default btn-lg btn-flat"
            data-tip
            data-for="toggle_agitator"
          >
            <FontAwesomeIcon icon={solid('utensil-spoon')} />
          </button>
          <ReactTooltip
            id="toggle_agitator"
            place="bottom"
            effect="solid"
            backgroundColor="black"
          >
            Toggle Agitator
          </ReactTooltip>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Pid;
