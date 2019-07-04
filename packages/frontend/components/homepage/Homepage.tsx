import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  stepOneDescription,
  stepTwoDescription,
  stepThreeDescription
} from './pageDescriptions';
import './Homepage.less';

export const Homepage = () => {
  const renderSteps = () => {
    const steps = [
      { description: stepOneDescription, image: '../../static/startman.svg' },
      { description: stepTwoDescription, image: '../../static/setup.svg' },
      { description: stepThreeDescription, image: '../../static/analytics.svg' }
    ];

    return steps.map((desc, index) => (
      <React.Fragment key={index}>
        <div className="step">
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

        {index !== 2 && <div className="divider" />}
      </React.Fragment>
    ));
  };

  return (
    <div className="homepage">
      <Head>
        <title>Pista - Your Expense Tracker</title>
      </Head>
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
            <Link href="/signup">
              <a className="btn-link">Start Tracking</a>
            </Link>
            <Link href="/faq">
              <a className="btn-link">How it works</a>
            </Link>
          </div>
        </div>
        <div className="right">
          <img
            data-aos="fade-up"
            data-aos-delay="100"
            alt="timeline"
            src="/static/Timeline.png"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="100"
            alt="savings-rate"
            src="/static/SavingsR.png"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="100"
            alt="analysis"
            src="/static/Analysis.png"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="100"
            alt="savings-generated"
            src="/static/SavingsG.png"
          />
        </div>
      </div>

      <div className="content">
        <h2 data-aos="zoom-in">Here's how</h2>
        <div className="steps-container">{renderSteps()}</div>
      </div>

      <div data-aos="zoom-in" className="end">
        <h3>
          Regain control of your finances and expenses again. Sign up for free
          now.
        </h3>
        <Link href="/signup">
          <a className="btn-link">Signup</a>
        </Link>
      </div>
    </div>
  );
};
