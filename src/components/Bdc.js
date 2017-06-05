import _ from 'lodash';
import { observer } from 'mobx-react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Button, Card, Col, Input, Row } from 'react-materialize';

import Chart from './Chart';
import InputProgress from './InputProgress';
import bdcStore from '../store';

const Bdc = observer(({ id }) => {
  const bdc = bdcStore.getBdcById(id);
  return (
    <Col m={12} s={12} l={6}>
      <Card>
        <Row>
          <Col>
            <Input
              label='start date'
              type='date'
              className='datepicker'
              defaultValue={moment(bdc.startDate).format('YYYY-MM-DD')}
              onChange={(event) => bdc.setStartDate(event.target.value)}
          />
          </Col>
          <Col s={2}>
            <Input
              label='days'
              type='number'
              defaultValue={bdc.days}
              onChange={(event) => bdc.setDays(parseInt(event.target.value, 10))}
          />
          </Col>
          <Col s={2}>
            <Input
              label='points'
              type='number'
              defaultValue={bdc.points}
              onChange={(event) => bdc.setPoints(parseInt(event.target.value, 10))}
          />
          </Col>
          <Col s={2}>
            <Button className='light-blue' onClick={() => bdc.editMode = !bdc.editMode}>Edit</Button>
          </Col>
          <Col s={2}>
            <Button className='red' onClick={() => bdcStore.deleteBdc(id)}>Delete</Button>
          </Col>
        </Row>

        <div className='chart-container'>
          {!bdc.editMode && <Chart data={bdc.chartData} />}
          {bdc.editMode && _.times(bdc.days, (index) => {
            return <InputProgress
              key={index}
              index={index + 1}
              bdc={bdc}
          />;
          })
        }
        </div>
      </Card>
    </Col>
  );
});

Bdc.propTypes = {
  id: PropTypes.string
};

Bdc.displayName = 'bdc';

export default Bdc;
