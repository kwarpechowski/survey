import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  start: {
    textAlign: 'center'
  },
  question: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  qcontainer: {
    flex: 1,
    overflow: 'scroll',
    height: 'calc(100vh - 128px)',
    position: 'relative'
  },
  partial: {
    '& > div': {
      width: '200vw',
      height: '200vw',
      position: 'fixed',
      top: '50%'
    }
  },
  title: {
    display: 'block',
    width: '100%'
  },
  scroll: {
    height: 'calc(100vh - 112px)',
    overflowY: 'scroll'
  }
};

@withStyles(styles)
export class Question extends Component {

  state = {
    isActive: false,
    answers: {}
  };

  t = 0;
  ldeg = 0;
  selected = null;
  time = null;

  constructor(props) {
    super(props);

    const rand = Math.random();
    this.deg = Math.round(rand * 360);
  }

  touchstart = e => {
    this.t = e.changedTouches[0].screenY;
    this.ldeg = this.deg;
    e.preventDefault();
  };

  touchmove = e => {
    this.ldeg = ((this.t - e.changedTouches[0].screenY)/ window.innerHeight * 360) + this.deg;
    this.element.style.transform = `rotate(${this.ldeg}deg)`;
    e.preventDefault();
  };

  touchend = () => {
    this.deg = this.ldeg;
  };

  componentDidUpdate() {
    if (this.state.isActive && !this.props.list) {
      const {gew} = this.props;

      let t;

      if (gew) {
        t = GEW({
          element: '#container div div',
          showLines: true,
          isMobile: true
        });
      } else {
        t = Plutchik({
          element: '#container div div',
          isMobile: true,
          labels: [
            ["wściekłość", "czujność", "zachwyt", "podziw", "groza", "zdumienie", "cierpienie", "wstręt"],
            ["gniew", "oczekiwanie", "radość", "zaufanie", "strach", "zdziwienie", "smutek", "obrzydzenie"],
            ["irytacja", "ciekawość", "spokój", "zgoda", "lęk", "roztargnienie", "zaduma", "znudzenie"],
            ["agresja", "optymizm", "miłość", "pokora", "trwoga", "dezaprobata", "skrucha", "pogarda"]
          ]
        });
      }

      t.elementClick().subscribe(action => {
        this.selected = action.data;
      });

      this.element = document.querySelector('#container svg');
      this.element.style.transform = `rotate(${this.deg}deg)`;

    }
  }

  start = () => {
    this.setState({
      isActive: true
    });
    this.time = Date.now();
  };

  close = () => {
    const time = Date.now() - this.time;
    this.props.onClose(this.selected || Object.keys(this.state.answers), time);
  };

  setActive = x => {
    const answers = Object.assign({},this.state.answers);
    if (answers[x]) {
      delete answers[x];
    } else {
      answers[x] = true;
    }

    this.setState({
      answers: answers
    })
  };

  getAnswers() {
    return this.props.answers.filter(x => x).map(a => {
      return [
        <ListItem
          key={'item'+a}
          dense
          button
          onClick={() => this.setActive(a)}
        >
          <Checkbox
            checked={this.state.answers[a] === true}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText primary={a} />
        </ListItem>,
        <Divider key={'divider'+a} />
      ]
    })

  }

  getList() {
    return <div className={this.props.classes.scroll}>
      <List>
        {this.getAnswers()}
      </List>
    </div>
  }

  getChart() {
    const {classes, part} = this.props;
    return <div className={classes.qcontainer} id="container">
      <div
        className={classNames({
          [classes.partial]: part
        })}
        onTouchStart={this.touchstart}
        onTouchMove={this.touchmove}
        onTouchEnd={this.touchend}
      >
        <div></div>
      </div>
    </div>
  }

  getContent() {
    const {classes, title} = this.props;
    if (this.state.isActive) {
      const el = this.props.list ? this.getList() : this.getChart();

      return <div className={classes.question}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography type="title" color="inherit" classes={{
              title: classes.title
            }}>
              {title}
            </Typography>
            <Button color="primary" raised onClick={this.close}>
              Zakończ
            </Button>
          </Toolbar>
        </AppBar>
        {el}
      </div>
    }
    return <div className={classes.start}>
      <Typography type="headline" gutterBottom>
        {title}
      </Typography>
      <Button color="primary" raised onClick={this.start}>
        Rozpocznij
      </Button>
    </div>
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
      {this.getContent()}
      </div>
    )
  }
}
