import { observer } from 'mobx-react';
import React from 'react';
import { Button } from 'react-materialize';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../App.css';
import 'react-dates/lib/css/_datepicker.css';
import BdcList from '../components/BdcList';
import bdcStore from '../store';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = observer(() => (
  <MuiThemeProvider>
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
  </MuiThemeProvider>
));

App.displayName = 'app';

export default App;
