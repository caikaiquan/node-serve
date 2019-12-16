// 注册时间
const handleCreateTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    return `${year}-${month < 10 ? ('0' + month) : month}-${day < 10 ? ('0' + day) : day} ${hh < 10 ? ('0' + hh) : hh}:${mm < 10 ? ('0' + mm) : mm}:${ss < 10 ? ('0' + ss) : ss}`
}

// token失效时间
const InvalidTokenTime = () => {
    return new Date().getTime() + 30 * 60 * 1000;
}

let errorRes = {
    code: '9999',
    msg: '',
}

let success = {
    code: '0000',
    msg: '',
}
export {
    handleCreateTime,
    InvalidTokenTime,
    errorRes,
    success
}