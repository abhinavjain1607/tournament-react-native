import actionConsts from '../constants';

const user = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case actionConsts.get('ADD_GOOGLE_AUTH_INFO'):
            {
                return {
                    ...state,
                    ...payload
                };
            }
        case actionConsts.get('LOGOUT'):
            return {
            };
        default:
            return state;
    }
};

export default user;
