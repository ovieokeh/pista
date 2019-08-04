import * as React from 'react';
import { History } from 'history';
import ErrorImage from 'assets/404.svg';
import './Notfound.scss';

interface iProps {
  history: History;
}

const goBack = (history: History) => () => history.goBack();

export const Notfound: React.FunctionComponent<iProps> = props => {
  window.document.title = "Something's Wrong - Pista";

  return (
    <div className="notfound">
      <img
        data-aos="slide-down"
        data-aos-duration="500"
        className="notfound__image"
        alt="An error occurred - 404"
        src={ErrorImage}
      />
      <div data-aos="slide-up" data-aos-duration="600" className="main">
        <h3>An Error Occurred</h3>
        <p>
          The page you're looking for doesn't exist or some other error
          occurred.
        </p>
        <button onClick={goBack(props.history)}>Go back</button>
      </div>
    </div>
  );
};

export default Notfound;
