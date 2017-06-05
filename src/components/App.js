import 'materialize-css/dist/css/materialize.css';
import { observer } from 'mobx-react';
import React from 'react';
import { Button } from 'react-materialize';

import '../App.css';
import BdcList from '../components/BdcList';
import bdcStore from '../store';

const App = observer(() => (
  <div className='app'>
    <div className='header'>
      <h2>Burndown Charts™
        <Button
          floating
          large
          className='red'
          waves='light'
          icon='add'
          onClick={() => bdcStore.createBdc()}
            />
        <Button
          floating
          large
          className='red'
          waves='light'
          icon='save'
          onClick={() => bdcStore.save()}
            />
      </h2>
    </div>
    <BdcList />
  </div>
));

App.displayName = 'app';

export default App;
