import React, {Component} from 'react';
import fire from '../config/fire';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';
import {TopBar} from './TopBar';
import {Survey} from './Survey';

const styles = {
  loading: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
};

@withStyles(styles)
export class SurveysList extends  Component {

  state = {
    data: null,
    title: 'Wybierz badanie',
    key: null,
  };


  async componentWillMount( ){
    const ref = fire.database().ref('/survey');
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    this.setState({data})
  }

  setActive(key) {
    this.setState({
      key: key
    });
  }

  getElements() {
    return  Object.keys(this.state.data).map(key => {
      const d = this.state.data[key];
      return <ListItem button key={key} onClick={() => this.setActive(key)}>
        <ListItemText primary={d.title} />
      </ListItem>
    });
  }

  render() {
    if (!this.state.data) {
      return <div className={this.props.classes.loading}>
        <CircularProgress size={150} />
      </div>
    }

    if (this.state.key) {
      return <Survey
        key={this.state.key}
        id={this.state.key}
        data={this.state.data[this.state.key]}
      />
    }

    return <>
      <TopBar title="Wybierz badanie"/>
      <List>
        {this.getElements()}
      </List>
    </>
  }
}
