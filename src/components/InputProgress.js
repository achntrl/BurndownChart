import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Col } from 'react-flexbox-grid';
import { Button, NumericInput } from '@blueprintjs/core'

const InputProgress = observer(({bdc, index}) => {
  return (
    // offset only on left items
    <Col sm={5} smOffset={index % 2}>
      <div className="pt-control-group">
        <NumericInput
          value={bdc.done[index]}
          placeholder={`Days ${index}`}
          onValueChange={(number) => bdc.setDone(number, index)}
        />
        <Button iconName="delete" onClick={() => bdc.clearDone(index)}/>
      </div>
    </Col>
  );
});

InputProgress.propTypes = {
  bdc: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default InputProgress;
