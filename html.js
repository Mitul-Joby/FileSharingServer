const fs = require('fs');

const headHTML = `
<head> 
        <title>Mitul's File Sharing Server</title> 
        <style>
            img { 
                width:100%; 
                max-width:600px; 
                height:auto;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            body {
                background-color: #f2f2f2;
                font-family: Arial, Helvetica, sans-serif;
            }
            h1 {
                text-align: center;
            }
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #333333;
            }
            li {
                float: left;
            }
            li a {
                display: block;
                color: white;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }
            li a:hover:not(.active) {
                background-color: #111111;
            }
            .active {
                background-color: #4CAF50;
            }
        </style>
        <meta charset="UTF-8">
        <meta name="description" content="File Sharing Server">
        <meta name="keywords" content="HTML, CSS, JavaScript, Node.js">
        <meta name="author" content="Mitul Joby">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
`;

const indexHTML =  headHTML + 
    `<body>
        <ul> <li>
            <li><a href="/upload">Upload</a></li>
            <li><a href="/downloads">Download</a>
        </li> </ul>
        <h1>Mitul's File Sharing Server</h1> 
        <a title="Original by WMF, character extracted by User:Yuriy Bulka, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Sharing-Character.png"><img alt="Sharing-Character" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sharing-Character.png/512px-Sharing-Character.png"></a>
    </body>
`;

const successUploadHTML= (file) => {
    return  headHTML + `
    <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/downloads">View all files</a></li>
    </ul>
    <h1>File Uploaded Successfully</h1>
    <br>
    <h2>File Name: ${file}</h2>
    <br>
    <a href="/upload">Upload another file</a>
    `;
}

const uploadHTML = headHTML + 
    `<ul>
        <li><a href="/">Home</a></li>
        <li><a href="/downloads">View all files</a></li>
    </ul>
    <br>
    <h1>Upload a file</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
    </form>
`;

const downloadsHTML = () => {
    const files = fs.readdirSync('../Sharing');
    let html = headHTML + `
    <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/upload">Upload</a></li>
    <li><a href="/downloads">Refresh</a></li>
    </ul>
    <h1>Available Files to Download</h1>`;
    files.forEach(file => {
        html += `- <a href="/downloads/${file}">${file}</a><br>`;
    }
    );
    return html;
}

module.exports = {
    indexHTML,
    successUploadHTML,
    uploadHTML,
    downloadsHTML
};
