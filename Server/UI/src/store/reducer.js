
const initialState = {
    uid: null,
    userType: null,
  
    
};

const reducer = (state = initialState, action) => {
    switch (action.type ) {
        case 'LOGIN':
            localStorage.setItem('uid',action.value.token );
            localStorage.setItem('userType',action.value.userType );
            return {
                ...state,
                uid: action.value.token,
                userType: action.value.userType
            }
        case 'CHECKLOCAL':
            const uid = localStorage.getItem('uid');
            if(uid) {
                const userType = localStorage.getItem('userType');
                return {
                    ...state,
                    uid: uid,
                    userType: userType
                }
            }
            else {
                return {
                    ...state,
                    uid: null,
                    userType: null
                }
            }
        case 'LOGOUT':
            localStorage.removeItem('uid');
            localStorage.removeItem('userType');
            return {
                ...state,
                uid: null,
                userType: null
            }
        

        default:
            return state
    }
};

export default reducer;