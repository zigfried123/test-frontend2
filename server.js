const http = require("http");
const fs = require("fs");
http.createServer(function(request,res){

//app.use(cors());

const port = 3006;
const localhost = 'http://localhost:'+port;

   console.log(`Запрошенный адрес: ${request.url}`);
    // получаем путь после слеша
    const filePath = request.url.substr(1);

    console.log(filePath);
    // смотрим, есть ли такой файл
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
           res.setHeader('Access-Control-Allow-Origin', '*');

          // res.end(JSON.stringify("Resourse"));
            fs.createReadStream(filePath).pipe(res);
        }
      });

}).listen(3006, "127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});