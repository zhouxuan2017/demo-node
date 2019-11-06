window.onload=function()
{
    var username = document.getElementById('username');
    //console.log(username)
    var pwd = document.getElementById('pwd');
    //console.log(pwd)
    var login = document.getElementById('login');
    var body= {};
    login.onclick=function()
    {
        //alert('s')
        //console.log(username.value)
         body.username=username.value;
         console.log(body.username)     
        body.pwd=pwd.value;
        console.log(body)
        fetch('http://localhost:8083/login/',{
            method:'POST',
            body:JSON.stringify(body),
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
              },
        
        }).then(res=>{
            if(res.status===200)
            {
                window.location = 'http://localhost:8083/listmanager/'

            }
            else{
               alert('您输入的账号密码有误！请重新输入！')
            }
        })
        
    }
}