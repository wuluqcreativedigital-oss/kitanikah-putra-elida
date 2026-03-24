const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

console.log('url_default', getCookie('URL'));
console.log('url_1', getCookie('URL_1'));
console.log('url_2', getCookie('URL_2'));
