function getCookie(cookieName) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
}


export const isAuthenticated = () => {
    return getCookie('token') ? true : false
}


export const getUser = () => {
    console.log(getCookie('user'))
    return getCookie('user') ? JSON.parse(getCookie('user')) : false
}



