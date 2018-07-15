import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
// define store middlewares as an array
export default [thunkMiddleware, logger];
