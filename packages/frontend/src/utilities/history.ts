import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

history.listen(location => {
  switch (location.pathname) {
    case '/signup':
      window.document.title = 'Start tracking - Pista';
      break;

    case '/login':
      window.document.title = 'Log in - Pista';
      break;

    case '/faq':
      window.document.title = 'How it works - Pista';
      break;

    default:
      window.document.title = 'Pista - Expense Tracker';
  }
});
