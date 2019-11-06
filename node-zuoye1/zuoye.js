#!/usr/bin/node

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    fetch = require('node-fetch'),
    qs = require('querystring');
//登录页面规定的用户账号
var userList = [
    { username: "admin", pwd: "admin" }
]
//添加文章里面的新数组
var arr=[];

//判断请求是GET还是POST
http.createServer(function (req, res) {
    if (req.method === 'GET') {
        if(req.url==='/add')
        {        
                var arr1 = JSON.stringify(arr);
                res.writeHead(200,{
                    'Content-Length':Buffer.byteLength(arr1),
                    'Content-Type':'text/plain;charset="utf-8"',
                    'Access-Control-Allow-Origin':'*'
                })	
				res.end(arr1);
        }
        else{
            load(req, res);
        }
    }
    else if (req.method === 'POST') {
        if (req.url == '/login/') {
        sendSecretMsg(req, res);
        }
        else if(req.url==='/add')
        {
            addTitle(req,res);
        }
        else{
            err(res);
        }
    }
    else {
        err(res);
    }
}).listen(8083, 'localhost');

//当不满足条件用来报错
function err(res) {
    var msg = 'Not found';
    res.writeHead(404, {
        'Content-Length': msg.length,
        'Content-Type': 'text/plain'
    });
    res.end(msg);
}

//GET请求判断url条件
function load(req, res) {
    var dir = __dirname;
    if (req.url === 'favicon.ico') return;
    else if (req.url === '/') {
        add(res);
    }
    else if (req.url === '/list/') {
        list(req, res, './chapterList.html')
    }
    else if (req.url === '/login/') {
        list(req, res, './login.html')
    }
    else if (req.url === '/addChapter/') {

        list(req, res, './addChapter.html');
    }
   else if(req.url==="/detail?chapterId=1")
   {
    console.log(req.url.split('?')[0].split('/'))
    list(req, res, './chapter.html');
   
   }
    else if (req.url === '/listmanager/') {
        list(req, res, './list.html');
    }
    else {
        //取两个//中间的那个值
        var dir1 = req.url.split('?')[0].split('/');
        console.log(dir1);
        // console.log('a',req.url.split('?')[0].split('/'));
        if (dir1.length > 2) {
            for (var a = 2; a < dir1.length; a++) {
                dir += '/' + dir1[a];
             
            }
        }
    else if(dir1.length>0&&dir1.length<3)
    {
        for (var a = 1; a < dir1.length; a++) {
            dir += '/' + dir1[a];
         
        }
    }
        else {
            for (var a = 0; a < dir1.length; a++) {
                dir += '/' + dir1[a];
               console.log(dir)
            }
        }
        fs.readFile(dir, function (err, data) {
            if (err) throw err;
            res.end(data);
        });
    }
}

//读取指定文件函数
function list(req, res, location) {
    fs.readFile(location, 'utf-8', function (err, data) {
        if (err) throw err;
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(data);
    });
}

//POST请求进行用户登录验整
function sendSecretMsg(req, res) {
    var post = '';
   
        req.on('data', function (data) {
            post += data;
            // console.log(JSON.parse( post))
        })
        req.on('end', function () {
            // console.log(userList[0].username)
            // console.log(JSON.parse(post).username==userList[0].username)
            if (JSON.parse(post).username == userList[0].username && JSON.parse(post).pwd == userList[0].pwd) {
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end('OK')
            }
            else {
               res.statusCode=404;
                res.end('NO OK')
            }
        })
   
}


//POST增加文章

function addTitle(req,res){
    var data1='';
    req.on('data',function(data){
        data1+=data;    
        // console.log(data1)
    })
    req.on('end',function(){
     
            //    console.log(data1.toString('utf-8'))
            //    console.log(qs.parse(data1))
            //    console.log(qs.parse(data1.toString('utf-8')))
               arr.push(qs.parse(data1.toString('utf-8')))
                // console.log(arr)
				res.end();
     
    })
}

//加载首页进行选择进入哪个页面
function add(res) {
    var html = '<!DOCTYPE html>'
        + '<html>'
        + '  <head>'
        + '    <meta charset="UTF-8">'
        + '    <title>home</title>'
        + '  </head>'
        + '    <body>'
        + '<ul>'
        + '      <li> <a href="/list/">list</a></li>'
        + '       <li><a href="/login/">login</a></li>'
        + '       <li><a href="/listmanager/">listmanagert</a></li>'
        + '       <li><a href="/addChapter/">addChapter</a></li>'
        + '</ul>'
        + '    </body>'
        + '</html>';

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.statusCode = 200;
    res.end(html);
}

//阅读全文项
var chapterList = [
    {
        "chapterId": 1,
        "chapterName": "hello ,这是后台取到的数据",
        "imgPath": "images/1442457564979540.jpeg",
        "chapterDes": "注定，有些路，只能一个人走；有些事，",
        "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
        "publishTimer": "2019-08-19",
        "author": "admin",
        "views": 1022
    },
    {
        "chapterId": 2,
        "chapterName": "那些不是事",
        "imgPath": "images/1442201163344838-lp.jpg",
        "chapterDes": "人生，原本就该这样。再大的事，无非是个经历而己。明天的太阳照样升起，就像罗俊杰个人博客​的时候水来土掩，兵来将挡。任何事情都会成为过去，只要有好的心态，就可以面对人生的.",
        "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
        "publishTimer": "2019-08-19",
        "author": "admin",
        "views": 102
    },
    {
        "chapterId": 3,
        "chapterName": "只想，留住心中的那份静美",
        "imgPath": "images/1442642178239101-lp.jpg",
        "chapterDes": "在这个鸟语花香的季节,踏着早晨罗俊杰个人博客的一缕光芒在小路间走着,呼吸着这自然的清晰空气，只想，衣袂飘飘，信步于绿荫小道，或俯首听花开，或低眉赏花香，盈脉脉春意，于眼波中...",
        "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
        "publishTimer": "2019-08-19",
        "author": "admin",
        "views": 202
    },
    {
        "chapterId": 4,
        "chapterName": "所以才会美",
        "imgPath": "images/1442539025939884-lp.jpg",
        "chapterDes": "人，越简单就会越快乐;水，掺杂东西越少才会显得清澈靓丽。大自然越安静,才会体现它的本质。人生就是这样，倘若有运，不用祈求，因为祈求也是无用。倘若无运，无需悲伤，因为悲...",
        "chapterContent": "有人说，生活生活，就是生下来活下去，也有人说，生容易，活容易，生活不容易。有个朋友曾经和我说，这个世界，大多数人都没有生活，他们有的仅仅是生存。我赞同这种说法吧，只是生存，对于我们可能都是一种奢侈。每个人都在努力，努力为着这个本来不属于我们的生活和努力。对于含着金钥匙而成长的人，我们又羡慕又嫉妒。可我们没有想过，他们的先人在斩荆棘的时候，付出的艰辛和艰苦，才有了后代荣华。生活是什么,其实在我看来，生活是一种需要，在你最需要亲人的时候，亲人已经突然不在了。子欲养而亲不待，说得成其深，对于我们是一种思考。他们的离开，对于我们都是一种打击，可也是一种思考。离开时痛苦的，可是生活就是有生老病死，当你一直都习惯存在的人已经离开的时候，慢慢地，你会看透很多，这就是你面对生活所需要的。生活是什么？其实在我看来，生活就是一种打拼，当过年过节的时候你看着别人的父母带着自己的孩子快乐的回家的时候、尔你还只能在大街上流浪的时候。许多游子和打工的人或许都有这种感觉吧，为了赚钱，为了养家。当我们看到留守儿童那迷茫孤寂的眼神，不由得心痛的时候，或许你能理解那份父母为了儿女在外打拼的奔波吧。其实在我看来，生活就是一种漠然，当你真正遇到困难而朋友都不能帮你的时候、怕你还不了钱的时候。你只能自己默默面对这一切，这一切让你十分无奈，可是你明白了一个道理，借给你是道理，不借给你是合理。人之常情，所以，想怪不能怪的时候，你留下的只是无奈。</p><p>生活是什么？</p><p>其实生活就是无奈的活着，不得不无奈的活着。我们活在这个世界上，为的只是寻找一个目标，而生活，给我们的感受，却是无奈与绝望的迷茫。这时候你不能说生活是美好和美满的吧？可是正因为有痛苦，无奈与悲伤，我们才有开心的日子。也正因为有了生存，才有了生活。</p><p>无奈的生活，才给我们无奈的心情，无奈的心情才有了悠然见南山的豁达与开朗，这就是生活，这种生活才会有着无限的魅力，也只有这种魅力才能吸引我们一直向前",
        "publishTimer": "2019-08-19",
        "author": "admin",
        "views": 102
    }
]
