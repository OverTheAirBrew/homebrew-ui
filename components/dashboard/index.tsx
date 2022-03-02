import { FC } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import Card from '../card';
import CardBody from '../card/body';
import CardFooter from '../card/footer';
import CardHeader from '../card/header';
import Col from '../layout/grid/col';
import Row from '../layout/grid/row';

const Dashboard: FC = () => {
  const onDragStopped = (e: DraggableEvent, data: DraggableData) => {
    console.log('E', e);
    console.log('DATA', data);
  };

  return (
    <Draggable onStop={onDragStopped}>
      <div>
        <KettleOverview />
      </div>
    </Draggable>
  );
};

const KettleOverview: FC = () => {
  return (
    <div style={{ width: '400px' }}>
      <Card>
        <CardHeader title="Kettle Name" />
        <CardBody>
          <Row>
            <Col>Temp</Col>
          </Row>
          <Row>
            <Col>100 &deg;C</Col>
          </Row>
          <Row>
            <Col>Target Temp</Col>
          </Row>
          <Row>
            <Col>80 &deg;C</Col>
          </Row>
        </CardBody>
        <CardFooter>
          <div className="btn-group">
            <button type="button" className="btn btn-default">
              Hello
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
