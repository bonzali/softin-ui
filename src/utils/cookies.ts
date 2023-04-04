
import Cookies, { CookieAttributes } from "js-cookie";
import {SoftinUi} from "../config/softinui";

export const getToken = () => Cookies.get(SoftinUi.authTokeKey);
export const setToken = (token?: string) => {
    setCookie(SoftinUi.authTokeKey, token, {
        expires: 60 * 60 * 24 * 30,
    });
};



export const setCookie = (
    name: string,
    token?: string,
    options?: CookieAttributes
) => {
    if (!token) {
        Cookies.remove(name);
    } else {
        Cookies.set(name, token, options ?? { expires: 60 * 60 * 24 * 30 });
    }
};
