import React, { Component } from 'react';

import bdcStore from '../store';
import { Button, Intent } from '@blueprintjs/core'

import LoadingButton from './LoadingButton';

class AppHeader extends Component {

  render() {
    return (
      <div className='header'>
        <h1>Burndown Charts™
        <Button
          className='pt-large header-button'
          iconName='add'
          intent={Intent.PRIMARY}
          onClick={() => bdcStore.createBdc()}
        />
        <LoadingButton
          iconName='saved'
          intent={Intent.PRIMARY}
          onClick={() => bdcStore.save()}
        />
        </h1>
      </div>
    )
  }
}

AppHeader.displayName = 'app-header';

export default AppHeader;
