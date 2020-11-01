const http = require('http');

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;
    //GET /

    if(url === "/"){
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<header><title>My Server</title></header>");
        res.write("<body>Hello, how are you?</body>")
        res.write("<form action='/create-user' method='POST'><input type='text' name='user'><button type='submit'>Create User</button></form>")
        res.write("</html>");
        return res.end();
    }
    //GET /users
    if(url ==="/users"){
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<header><title>My Server</title></header>");
        res.write("<body>");
        res.write("<h1>Users</h1>");
        res.write("<ul>");
        res.write("<li>Jack</li>");
        res.write("<li>Jane</li>");
        res.write("<li>Thomas</li>");
        res.write("</ul>");
        res.write("</body>");

        res.write("</html>");
        return res.end();
    }

    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        })
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const userName = parsedBody.split('=')[1];
            console.log(userName);
            res.writeHead(302, {Location: '/'});
            res.end();
        })
    }
});

server.listen(3000);