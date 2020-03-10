import * as actionType from "../action/actionTypes"

const defaultState = {
    imageUrl : ""
}

export default function memeReducer(state = defaultState , action){
    switch(action.type){
        case actionType.CHANGE_SITE:
            return Object.assign({} , state , {
                imageUrl : action.url
            });
        case actionType.RETURN_SITE:
                return Object.assign({} , state , {
                    imageUrl : ""
                });
        default:
            return state
    }
}