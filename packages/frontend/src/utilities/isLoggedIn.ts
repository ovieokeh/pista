import { store } from '../redux/store';

export const isLoggedIn = () => !!store.getState().auth.token;
