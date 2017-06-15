import _ from 'lodash';
import { observer } from 'mobx-react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Button, Card, Col, Input, Row } from 'react-materialize';
import DatePicker from 'material-ui/DatePicker';

import Chart from './Chart';
import InputProgress from './InputProgress';
import bdcStore from '../store';

@observer
class Bdc extends Component {
  render() {
  const bdc = bdcStore.getBdcById(this.props.id);
  return (
    <Col m={12} s={12} l={6}>
      <Card>
        <Row>

          <Col>
            <DatePicker
              hintText="Portrait Dialog"
              formatDate={date => moment(date).format('DD/MM/YYYY')}
              onChange={(event, date) => bdc.setStartDate(moment(date).format('YYYY-MM-DD'))}
              defaultDate={moment(bdc.startDate).toDate()}
            />
            <Input
              label='start date'
              type='text'
              className='datepicker'
              onChange={(event, value) => {console.log(event, value); bdc.setStartDate(event.target.value)}}
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
            <Button className='red' onClick={() => bdcStore.deleteBdc(this.props.id)}>Delete</Button>
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
  );}
}

Bdc.propTypes = {
  id: PropTypes.string
};

Bdc.displayName = 'bdc';

export default Bdc;
