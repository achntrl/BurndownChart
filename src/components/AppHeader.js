import React, { Component } from 'react';

import bdcStore from '../store';
import { Button, Intent, Tooltip } from '@blueprintjs/core'

import LoadingButton from './LoadingButton';

class AppHeader extends Component {

  render() {
    return (
      <div className='header'>
        <h1>Burndown Charts™
        <Tooltip
          content="Add a burndown chart"
          hoverOpenDelay={1000}
          useSmartPositioning={true}
        >
          <Button
            className='pt-large header-button'
            iconName='add'
            intent={Intent.PRIMARY}
            onClick={() => bdcStore.createBdc()}
          />
        </Tooltip>
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
