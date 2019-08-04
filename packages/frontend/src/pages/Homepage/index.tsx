import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  stepOneDescription,
  stepTwoDescription,
  stepThreeDescription
} from './pageDescriptions';
import * as Images from './images';
import './Homepage.scss';

const renderSteps = () => {
  const steps = [
    { description: stepOneDescription, image: Images.StartmanIMG },
    { description: stepTwoDescription, image: Images.SetupIMG },
    { description: stepThreeDescription, image: Images.AnalyticsIMG }
  ];

  return steps.map((desc, index) => (
    <div key={index} className="homepage__content__steps-container__step">
      <h3
        className="homepage__content__steps-container__step__title"
        data-aos="fade-up"
      >
        {index + 1}
      </h3>
      <div className="homepage__content__steps-container__step__content">
        <p
          className="homepage__content__steps-container__step__content__description"
          data-aos="fade-up"
        >
          {desc.description}
        </p>
        <img
          className="homepage__content__steps-container__step__content__image"
          data-aos="fade-up"
          alt={`step ${index + 1}`}
          src={desc.image}
        />
      </div>
    </div>
  ));
};

const renderJumboImages = () => {
  const images = [
    { alt: 'savings-rate', src: Images.SavingsRIMG },
    { alt: 'timeline', src: Images.TimelineIMG },
    { alt: 'savings-generated', src: Images.SavingsGIMG },
    { alt: 'analysis', src: Images.AnalysisIMG }
  ];

  return images.map((image, idx) => (
    <img
      key={idx}
      data-aos="fade-up"
      data-aos-delay="100"
      className="homepage__jumbo--right__image"
      alt={image.alt}
      src={image.src}
    />
  ));
};

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage__jumbo">
        <div
          data-aos="fade-up"
          data-aos-duration="700"
          className="homepage__jumbo--left"
        >
          <h2 className="homepage__jumbo--left__title">
            Pista: Your Smart Expense Tracker
          </h2>
          <p className="homepage__jumbo--left__text">
            Helps you track your debits and credits to understand where all your
            money goes.
          </p>
          <p className="homepage__jumbo--left__text">
            Think of it as your personal accountant, only we can't help you buy
            stock options.
          </p>
          <div className="homepage__jumbo--left__btn-container">
            <Link className="btn-link" to="/signup">
              Start Tracking
            </Link>
            <Link className="btn-link" to="/faq">
              How it works
            </Link>
          </div>
        </div>
        <div className="homepage__jumbo--right">{renderJumboImages()}</div>
      </div>

      <div className="homepage__content">
        <h2 className="homepage__content__title" data-aos="zoom-in">
          Here's how
        </h2>
        <div className="homepage__content__steps-container">
          {renderSteps()}
        </div>
      </div>

      <div data-aos="zoom-in" className="homepage__footer">
        <p className="homepage__footer__cta">
          Regain control of your finances and expenses again. Sign up for free
          now.
        </p>
        <Link id="btn-link" className="btn-link" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
