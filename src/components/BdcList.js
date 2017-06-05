import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { Row } from 'react-materialize';

import Bdc from '../components/Bdc';
import bdcStore from '../store';

const BdcList = observer(() => {
  return (
    <Row>
      {_.map(bdcStore.getIds, id =>
        <Bdc
          id={id}
          key={id}
      />)
    }
    </Row>
  );
});

BdcList.displayName = 'bdc-list';

export default BdcList;
