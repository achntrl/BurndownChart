import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import {Button, Input, Col} from 'react-materialize';

const InputProgress = observer(({bdc, index}) => {
  return (
    <div className='inline'>
      <Col s={5} offset='s1'>
        <Input
          s={6}
          type='number'
          value={bdc.done[index]}
          label={`Days ${index}`}
          onChange={(event) => bdc.setDone(parseInt(event.target.value, 10), index)
        }
      />
        <Button className='close-button' flat onClick={() => bdc.clearDone(index)} icon='close' />
      </Col>
    </div>
  );
});

InputProgress.propTypes = {
  bdc: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default InputProgress;
