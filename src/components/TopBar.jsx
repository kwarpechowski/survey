import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export class TopBar extends Component {
  render() {
    return <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          {this.props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  }
}
