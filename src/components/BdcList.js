import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';

import Bdc from '../components/Bdc';
import bdcStore from '../store';

import { Grid, Row } from 'react-flexbox-grid';

const BdcList = observer(() => {
  return (
    <Grid fluid>
      <Row>
        {_.map(bdcStore.getIds, id =>
          <Bdc
            id={id}
            key={id}
        />)
      }
      </Row>
    </Grid>
  );
});

BdcList.displayName = 'bdc-list';

export default BdcList;
