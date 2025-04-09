(function(){
    let form = document.querySelector('.login-form');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let obj = {
            email: email.value.trim(),
            password: password.value.trim(),
        }
        
        let userData = JSON.parse(localStorage.getItem("userData"));
        if(userData?.email !== obj?.email || userData?.password !== obj.password){
            alert('Invalid Email or Password❌')
        }else{
            alert('LogIn successfull✅')
            localStorage.setItem('userData', JSON.stringify({...userData, isLogin:true}));
            window.location.href = "../index.html";
        }
    })
})()