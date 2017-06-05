import PropTypes from 'prop-types';
import React from 'react';

const BdcTooltip = ({active, payload}) => {
  if (!active || payload[1].value === null) { return null; }

  const lead = payload[0].value - payload[1].value;
  const smiley = lead < 0 ? ':(' : ':)';

  return <p className='tooltip'>{`${lead.toFixed(1)} ${smiley}`}</p>;
};

BdcTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array
};

BdcTooltip.displayName = 'bdc-tooltip';

export default BdcTooltip;
