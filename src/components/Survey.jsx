import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {Question} from './Question';
import {TopBar} from './TopBar';
import fire from '../config/fire';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  questions: {
    flex: 1
  },
  end: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
};

@withStyles(styles)
export class Survey extends Component {

  results = [];

  state = {
    activeIndex: 1,
  };

  getData = (data, time)  => {
    let d;
    if (Array.isArray(data)) {
      d = data;
    } else {
      d = Object.keys(data).filter(x => x);
    }

    this.results.push({
      time: time,
      data: d
    });

    this.setState(prevState => ({
      activeIndex: prevState.activeIndex + 1
    }));
  };

  saveResults () {
    const ref= fire.database().ref(`/survey/${this.props.id}/results`);
    ref.push().set(this.results);
  }

  reload = () => {
    window.location.reload();
  };

  getQuestion() {
    if (this.state.activeIndex < this.props.data.questions.length) {
      const question = this.props.data.questions[this.state.activeIndex];
      return <Question
        {...question}
        onClose={this.getData}
        key={this.state.activeIndex}
      />
    }
    this.saveResults();
    return <div className={this.props.classes.end}>
      <Typography type="headline" gutterBottom>
        Badanie zakończone
      </Typography>
      <Button color="primary" raised onClick={this.reload}>
        Nowe badanie
      </Button>
    </div>
  }

  render() {
    const {classes, data} = this.props;
    return <div className={classes.container}>
      <TopBar title={data.title}/>
      <div className={classes.questions}>
        {this.getQuestion()}
      </div>
    </div>
  }
}
