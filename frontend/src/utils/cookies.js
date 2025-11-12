import Cookie from "js-cookie";

export const getCookie = (name) => {
    return Cookie.get(name);
};
