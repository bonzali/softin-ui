import {AxiosRequestConfig , AxiosResponse} from 'axios';

export type CustomConfigMeta = {
    appendSlash?: boolean;
    shouldResolve?: boolean;
    appendToken?: boolean; // Todo: implement this
    getAuthHeader?: () => object; // () => ({ Authorization: `Token ${getToken()}` }),
    formatErrorMessage?: () => any;
    errorResolver?: (error: any) => Error;
    responseResolver?: (response: AxiosResponse, meta: CustomConfigMeta) => any;
}


export  interface AxiosWrapperConfig extends AxiosRequestConfig {
    meta?: CustomConfigMeta;
}