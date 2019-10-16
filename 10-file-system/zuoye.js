#!/usr/bin/node

const fs=require('fs'),
      dir=process.argv[2],
      make=process.argv[3],
       name=fs.readdirSync(__dirname),
      log=console.log;
    
try{
     if(dir==='list')
     {
        var i=0;
        log('[');
     for(i;i<name.length;i++)
     {
         if(i==name.length-1)
         {     
            log('{"fileName":"'+name[i]+'","fileSize":"'+fs.statSync(name[i]).size+'"}');
         }
         else{
            log('{"fileName":"'+name[i]+'","fileSize":"'+fs.statSync(name[i]).size+'"},');
            log(' ');  
         }
     }
    log(']');
     }
     else if(dir==='mkdir')
     {  
       if(make==='folder')
      {
          
           if(fs.existsSync('folder'))
           {
               log('文件已存在，请重新输入名称！');
            }
           else
          {
              fs.mkdirSync('folder');
              log('文件创建成功！')
           }
      }
      else
      {
        log('请输入正确的目录名为：mkdir folder!');
      }
    }
     else
     {
       log('命令行参数错误，请重新输入! ')
     }
}
catch(e){
  console.error(e.message);
  process.exit(1);
}





