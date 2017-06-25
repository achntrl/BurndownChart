import _ from 'lodash';
import { observer } from 'mobx-react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

import Chart from './Chart';
import InputProgress from './InputProgress';
import bdcStore from '../store';

import { Row, Col } from 'react-flexbox-grid';
import { Alert, Button, EditableText, Intent, NumericInput, Tooltip } from '@blueprintjs/core'
import { DateInput } from '@blueprintjs/datetime';

@observer
class Bdc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDelete: false,
    }
  }
  renderChart(bdc) {
    return (
      <div className='chart-container'>
        <Chart data={bdc.chartData} />
      </div>
    )
  }

  renderEdits(bdc) {
    return (
      <Row className='chart-container'>
        {_.times(bdc.days, (index) => {
          return <InputProgress
            key={index}
            index={index + 1}
            bdc={bdc}
        />;})}
      </Row>
    )
  }

  handleDeleteOpen = () => {this.setState({ isOpenDelete: true });}
  // no need to set state because the object is deleted
  handleDelete = () => {bdcStore.deleteBdc(this.props.id)}
  handleDeleteCancel = () => {this.setState({ isOpenDelete: false});}

  render() {
    const bdc = bdcStore.getBdcById(this.props.id);
    let chartArea = null
    if (bdc.editMode) {
      chartArea = this.renderEdits(bdc)
    } else {
      chartArea = this.renderChart(bdc)
    }

    return (
      <Col xs={12} sm={12} md={12} lg={6} className='bdc'>
        <div className='pt-card pt-elevation-2'>
        <Row style={{justifyContent: 'center'}}>
          <h2>
            <EditableText
              value={bdc.name}
              onChange={(value) => bdc.setName(value)}
            />
          </h2>
        </Row>
          <Row>
            <Col xs={2} xsOffset={1}>
              <Tooltip
                content="Start date"
                hoverOpenDelay={1000}
              >
                <DateInput
                  placeholder='start date'
                  className='pt-fill'
                  value={moment(bdc.startDate).toDate()}
                  format={'DD/MM/YY'}
                  onChange={(date) => bdc.setStartDate(date)}
                />
              </Tooltip>
            </Col>
            <Col xs={2}>
              <Tooltip
                content="Number of days to reach your goal"
                hoverOpenDelay={1000}
              >
                <NumericInput
                  className='pt-fill'
                  placeholder='days'
                  value={bdc.days}
                  max={bdc.MAX_DAYS}
                  onValueChange={(number) => bdc.setDays(number)}
                />
              </Tooltip>
            </Col>
            <Col xs={2}>
              <Tooltip
                content="Number of points to do"
                hoverOpenDelay={1000}
              >
                <NumericInput
                  className='pt-fill'
                  placeholder='points'
                  value={bdc.points}
                  onValueChange={(number) => bdc.setPoints(number)}
                />
              </Tooltip>
            </Col>
            <Col xs={2}>
              <Button
                className='pt-intent-primary pt-fill'
                onClick={() => bdc.editMode = !bdc.editMode}
              >
                Edit
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                className='pt-intent-danger pt-fill'
                onClick={this.handleDeleteOpen}
              >
                Delete
              </Button>
              <Alert
                    intent={Intent.DANGER}
                    isOpen={this.state.isOpenDelete}
                    confirmButtonText="Delete"
                    cancelButtonText="Cancel"
                    onConfirm={this.handleDelete}
                    onCancel={this.handleDeleteCancel}
                >
                  <p>
                    Do you really want to delete the burndown chart "{bdc.name}""
                  </p>
                </Alert>
            </Col>
          </Row>
          {chartArea}
        </div>
      </Col>
    );
  }
}

Bdc.propTypes = {
  id: PropTypes.string
};

Bdc.displayName = 'bdc';

export default Bdc;
