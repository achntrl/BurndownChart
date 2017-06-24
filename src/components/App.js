// import 'materialize-css/dist/css/materialize.css';
import '@blueprintjs/core/dist/blueprint.css'
import '@blueprintjs/datetime/dist/blueprint-datetime.css'
import { observer } from 'mobx-react';
import React from 'react';
// import { Button } from 'react-materialize';

import '../App.css';
import AppHeader from '../components/AppHeader';
import BdcList from '../components/BdcList';

const App = observer(() => (
  <div className='app'>
    <AppHeader />
    <BdcList />
  </div>
));

App.displayName = 'app';

export default App;
