(function(){
    let form = document.querySelector('.signup-form');
    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let obj = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            isLogin:false
        }
        console.log(obj)
        localStorage.setItem('userData', JSON.stringify(obj))
        window.location.href = "../login/login.html";
    })
})()