import React from 'react';
import { render } from 'react-dom';
import {TopBar} from "./components/TopBar";
import './styles.css';
import {SurveysList} from "./components/SurveysList";

render(
  <div>
    <SurveysList />
  </div>,
document.querySelector('#app'));
