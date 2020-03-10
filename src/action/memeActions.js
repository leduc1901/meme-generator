import * as actionType from "./actionTypes"

export function changeSite(url){
    return {
        type : actionType.CHANGE_SITE,
        url

    }
}

export function returnSite(){
    return {
        type : actionType.RETURN_SITE
    }
}