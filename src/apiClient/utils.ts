import {convertErrors , ApiError} from "./error";
import type {CustomConfigMeta} from "./type"
import {AxiosResponse} from "axios";
const defaultErrorResolver = (error) => {
    if (error.response && error.response.data) {
        return new ApiError(error.response.status , convertErrors(error.response.data)[0])
    }else {
        return  new ApiError( 503 , "INTERNAL_ERROR")
    }
}

const defaultResponseResolver = (response : AxiosResponse , meta : CustomConfigMeta) => {
    if(meta.shouldResolve) {
        return response.data
    }
    return response;
}

export const defaultMeta : CustomConfigMeta = {
    appendSlash: true,
    shouldResolve: true,
    errorResolver : defaultErrorResolver,
    responseResolver : defaultResponseResolver
}
