// import 'materialize-css/dist/css/materialize.css';
import '@blueprintjs/core/dist/blueprint.css'
import '@blueprintjs/datetime/dist/blueprint-datetime.css'
import { observer } from 'mobx-react';
import React from 'react';
// import { Button } from 'react-materialize';

import '../App.css';
import BdcList from '../components/BdcList';
import bdcStore from '../store';

import { Button, Intent } from '@blueprintjs/core'

const App = observer(() => (
  <div className='app'>
    <div className='header'>
      <h1>Burndown Charts™
      <Button
        className='pt-large header-button'
        iconName='add'
        intent={Intent.SUCCESS}
        onClick={() => bdcStore.createBdc()}
      />
      <Button
        className='pt-large header-button'
        iconName='saved'
        intent={Intent.PRIMARY}
        onClick={() => bdcStore.save()}
      />
      </h1>
    </div>
    <BdcList />
  </div>
));

App.displayName = 'app';

export default App;
