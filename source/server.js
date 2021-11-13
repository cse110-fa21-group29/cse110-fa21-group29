// Set up nodejs server
// Adapted from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

let http = require("http");
let fs = require("fs");
let path = require("path");

http
  .createServer((request, response) => {
    console.log(`request: ${request.url}`);

    let filePath = "./source" + request.url;
    if (filePath === "./source/") {
      filePath = "./source/index.html";
    }

    let extName = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[extName] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (!error) {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      } else {
        if (error.code == "ENOENT") {
          response.writeHead(404);
          response.end("File not found.\n");
        } else {
          response.writeHead(500);
          response.end(`Server error: ${error}.\n`);
        }
      }
    });
  })
  .listen(8125);
console.log("Server running");
