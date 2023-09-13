const dir = '../Sharing';
const PORT = process.env.PORT || 80;

const fs = require('fs');
const http = require('http');
const path = require('path');
const formidable = require('formidable');
const { indexHTML, successUploadHTML, uploadHTML, downloadsHTML } = require('./html');

function sendResponse (staus, message, ...args) {
    return JSON.stringify(
        {
            staus: staus,
            message : message,
            ...args
        }
    );
}

const server = http.createServer((req,res) => {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(indexHTML);
    } else if(req.url === '/info') {
        const time = new Date();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(sendResponse(200, 'Server is running', {author: 'Mitul Joby', time: time}));
    } else if (req.url === '/upload') {
        if (req.method === 'POST') {
            const form = new formidable.IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (!files.file) {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(
                        {
                            staus: 404,
                            message : 'File not found'
                        }
                    ));
                    return;
                }
                let fileName = files.file[0].originalFilename;
                let oldPath = files.file[0].filepath;
                let newPath = path.join(__dirname, dir)
                    + '/' + fileName
                let rawData = fs.readFileSync(oldPath)         
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) console.log(err)
                })
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(successUploadHTML(fileName));
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(uploadHTML);
        }
    } else if (req.url.startsWith('/downloads')) {
        if (req.url === '/downloads') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(downloadsHTML());
        } else {
            const fileName = req.url.split('/')[2];
            const file = fs.readFileSync(`${dir}/${fileName}`);
            if (!file) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(sendResponse(404, 'File not found'));
            }
            res.writeHead(200, {'Content-Type': 'application/octet-stream'});
            res.end(file);
        }
    } else {
        const time = new Date();
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(sendResponse(404, 'Page not found', {author: 'Mitul Joby', time: time}));
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
