import React, { Component } from 'react';

import { Button, Intent, Tooltip } from '@blueprintjs/core'

class LoadingButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      intent: this.props.intent,
    }
  }

  restoreIntent() {
    setTimeout(() => this.setState({ intent: this.props.intent}), 5000);
  }

  onClick() {
    this.setState({ loading: true })
    Promise.all(this.props.onClick())
    .then( () => {
      this.setState({ loading:false, intent: Intent.SUCCESS });
      this.restoreIntent();
    })
    .catch( () => {
      this.setState({ loading:false, intent: Intent.DANGER });
      this.restoreIntent();
    })

  }

  render() {
    return (
      <Tooltip
        content="Save your burndown charts"
        hoverOpenDelay={1000}
        useSmartPositioning={true}
      >
        <Button
          className='pt-large header-button'
          loading={this.state.loading}
          iconName={this.props.iconName}
          intent={this.state.intent}
          onClick={() => this.onClick()}
        />
      </Tooltip>
  )}

}

LoadingButton.displayName = 'loading-button';

export default LoadingButton;
