const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;

const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

const onRequest = (req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    const filePath = path.join(PUBLIC_DIRECTORY, "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (req.url.match(".css$")) {
    var cssPath = path.join(__dirname, "../public", req.url);
    var fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
};

const server = http.createServer(onRequest);

server.listen(PORT, "localhost", () =>
  console.log(`Server sudah berjalan, silahkan buka http://0.0.0.0:${PORT}`)
);
