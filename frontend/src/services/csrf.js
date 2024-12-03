import Cookies from 'js-cookie';

export const getCsrfToken = () => {
    return Cookies.get('csrftoken');  // Devuelve el valor del token CSRF
};
