function isLogin(){
    if(localStorage.getItem('user')){
        return true
    }else{
        return false
    }
}
export default isLogin