
import { setLoading } from '../actions/actions';
import { loginSuccess, registerSuccess, reloadUser } from '../auth/authActionsType';
import { getBooksAction } from '../book/bookActions';
import { resetBooksState } from '../book/bookActionsType'
import { LOGIN_USER_GQL, REGISTER_USER_GQL } from '../../graphql/mutations'
import { apolloClient } from '../../graphql/apollo-client'
import { LocalStorageConstants } from '../../constants/localStorageContants'

export const loginUserAction = (params) => (dispatch) => {
  dispatch(setLoading(true));
  return apolloClient
    .mutate({
      mutation: LOGIN_USER_GQL,
      variables: { getUserArgs: params },
    })
    .then((res) => {
      const { login } = res.data;
      localStorage.setItem(LocalStorageConstants.user, JSON.stringify(login))
      const booksParams = getAllBooksParams(login)
      dispatch(getBooksAction(booksParams))
      dispatch(loginSuccess(login));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err.message || err);
      dispatch(setLoading(false));
    });
};

export const registerUserAction = (params) => (dispatch) => {
  dispatch(setLoading(true));
  return apolloClient
    .mutate({
      mutation: REGISTER_USER_GQL,
      variables: { addUserArgs: params },
    })
    .then((res) => {
      const { register } = res.data;
      localStorage.setItem(LocalStorageConstants.user, JSON.stringify(register))
      const booksParams = getAllBooksParams(login)
      dispatch(getBooksAction(booksParams))
      dispatch(registerSuccess(register));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err.message || err);
      dispatch(setLoading(false));
    });
};

export const reloadUserAction = () => (dispatch) => {
  const data = JSON.parse(localStorage.getItem(LocalStorageConstants.user))
  dispatch(reloadUser(data || null));
  const booksParams = getAllBooksParams(data || null)
  dispatch(getBooksAction(booksParams))
};

export const logoutUserAction = () => (dispatch) => {
  localStorage.removeItem(LocalStorageConstants.user)
  dispatch(reloadUser(null));
  dispatch(resetBooksState());
};


const getAllBooksParams = (userParams, searchStr = '') => {
  return {
    user_id: userParams && userParams.id ? userParams.id :  0,
    sort: 'ASC',
    search_text: searchStr,
  }
}