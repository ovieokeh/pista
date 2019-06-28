import React from 'react';
import { Link } from 'react-router-dom';
import {
  stepOneDescription,
  stepTwoDescription,
  stepThreeDescription
} from './pageDescriptions';
import AnalysisPhoto from '../../../assets/Analysis.png';
import SavingsGenerated from '../../../assets/SavingsG.png';
import SavingsRate from '../../../assets/SavingsR.png';
import TimelineImg from '../../../assets/Timeline.png';
import StartmanImg from '../../../assets/startman.svg';
import SetupImg from '../../../assets/setup.svg';
import AnalyticImg from '../../../assets/analytics.svg';
import './Homepage.scss';

export const Homepage = () => {
  return (
    <div className="homepage">
      <div className="jumbo">
        <div data-aos="fade-up" data-aos-duration="700" className="left">
          <h2>Pista: Your Smart Expense Tracker</h2>
          <p>
            Helps you track your debits and credits to understand where all your
            money goes.
          </p>
          <p>
            Think of it as your personal accountant, only we can't help you buy
            stock options.
          </p>
          <div className="btn-container">
            <Link to="/signup" className="btn-link">
              Start Tracking
            </Link>
            <Link to="/faq" className="btn-link">
              How it works
            </Link>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" className="right">
          <img alt="timeline" src={TimelineImg} />
          <img alt="savings-rate" src={SavingsRate} />
          <img alt="analysis" src={AnalysisPhoto} />
          <img alt="savings-generated" src={SavingsGenerated} />
        </div>
      </div>

      <div className="steps-container">
        <h2 data-aos="fade-up">Here's how</h2>

        <div data-aos="fade-up" className="step">
          <h3>1</h3>
          <div>
            <span>{stepOneDescription}</span>
            <img alt="step one" src={StartmanImg} />
          </div>
        </div>

        <div data-aos="fade-in" className="divider" />

        <div data-aos="fade-up" className="step">
          <h3>2</h3>
          <div>
            <span>{stepTwoDescription}</span>
            <img alt="step two" src={SetupImg} />
          </div>
        </div>

        <div data-aos="fade-in" className="divider" />

        <div data-aos="fade-up" className="step">
          <h3>3</h3>
          <div>
            <span>{stepThreeDescription}</span>
            <img alt="step three" src={AnalyticImg} />
          </div>
        </div>
      </div>

      <div data-aos="zoom-in" className="end">
        <h3>
          Regain control of your finances and expenses again. Sign up for free
          now.
        </h3>
        <Link className="btn-link" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};
