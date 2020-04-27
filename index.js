
const http = require('http');
const path = require('path');
const fs = require('fs');
const hostname = "localhost";
const port = 3000;

//  createing server
const server = http.createServer((req, res) =>{
	console.log('request for'+ req.url +'by method : '+req.method);

		if(req.method == 'GET'){
			var fileURL;
			if(req.url == '/'){
				fileURL = "/index.html";
			}else{
				fileURL = req.url;
			}

			var filePath = path.resolve('./public'+fileURL);
			const fileExt = path.extname(filePath);

			if(fileExt == ".html"){
				fs.exists(filePath , (exists) =>{
					if(!exists){
						res.statusCode = 404;
						res.setHeader('Content-Type','text/html');
						res.end('<html> <body> <h1> Error 404'+ fileURL +' does not exists  </h1> </body> </html>');
					}else{

						res.statusCode = 200;
						res.setHeader('Content-Type','text/html');
						fs.createReadStream(filePath).pipe(res);
					} 
				});
			}else{
				res.statusCode = 404;
				res.setHeader('Content-Type','text/html');
				res.end('<html> <body> <h1> Error 404'+ fileURL +' is not HTML file  </h1> </body> </html>');
			}
		}
		else{
			res.statusCode = 404;
			res.setHeader('Content-Type','text/html');
			res.end('<html> <body> <h1> Error 404'+ fileURL +' is not supported  </h1> </body> </html>');
		}

 });
//  start the server
 server.listen(port,hostname,() => {
 	console.log(`server running at http://${hostname}:${port}`);
 });

   