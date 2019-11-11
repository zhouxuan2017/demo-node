#!/usr/bin/node


const user={
  Name:'周宣',
  Age:20,
  qq:'1207469303'
};

const log=console.log;

//三种占位符
log('Name:%s',user.Name);//字符串类型
log('Age:%d',user.Age);//整数类型
log('WangDing Info:%j',user);//对象类型


log('qq:%s',user.qq);//输出方式一：站位符输出
log('qq:',user.qq);//输出方式二  逗号间隔，多变量输出
log('qq:'+user.qq);//输出方式三：拼接字符串输出
log(`qq:${user.qq}`);//输出方式四 模板字符串输出
console.error('Error! something wrong!');
