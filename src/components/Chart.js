import React from 'react';
import { PropTypes } from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { observer } from 'mobx-react';

import BdcTooltip from './BdcTooltip';

const Chart = observer(({data}) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}} >
        <XAxis dataKey='day' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip content={<BdcTooltip />} />
        <Legend />
        <Line type='linear' dataKey='ideal' stroke='#DB3737' activeDot={{r: 8}} isAnimationActive={false} />
        <Line type='linear' dataKey='actual' stroke='#137CBD' activeDot={{r: 8}} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
});

Chart.propTypes = {
  data: PropTypes.array.isRequired
};

Chart.displayName = 'chart';

export default Chart;
