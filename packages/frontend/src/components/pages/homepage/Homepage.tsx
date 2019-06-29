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
  const renderSteps = () => {
    const steps = [
      { description: stepOneDescription, image: StartmanImg },
      { description: stepTwoDescription, image: SetupImg },
      { description: stepThreeDescription, image: AnalyticImg }
    ];

    return steps.map((desc, index) => (
      <React.Fragment key={index}>
        <div data-aos="zoom-in" className="step">
          <h3 data-aos="fade-up">{index + 1}</h3>
          <div>
            <span data-aos="fade-up">{desc.description}</span>
            <img
              data-aos="fade-up"
              alt={`step ${index + 1}`}
              src={desc.image}
            />
          </div>
        </div>

        {index !== 2 && <div data-aos="fade-in" className="divider" />}
      </React.Fragment>
    ));
  };

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
        <div className="right">
          <img
            data-aos="fade-up"
            data-aos-delay="100"
            alt="timeline"
            src={TimelineImg}
          />
          <img
            data-aos="fade-up"
            data-aos-delay="150"
            alt="savings-rate"
            src={SavingsRate}
          />
          <img
            data-aos="fade-up"
            data-aos-delay="200"
            alt="analysis"
            src={AnalysisPhoto}
          />
          <img
            data-aos="fade-up"
            data-aos-delay="250"
            alt="savings-generated"
            src={SavingsGenerated}
          />
        </div>
      </div>

      <div className="steps-container">
        <h2 data-aos="fade-up">Here's how</h2>
        {renderSteps()}
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
