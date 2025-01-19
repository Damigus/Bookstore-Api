//import bibliotek
const http = require("http")
const app = require("./app")

//ustalam port na którym bedzie działał serwer
const port = process.env.PORT || 3000

//tworzę serwer
const server = http.createServer(app)

//odpalam serwer
server.listen(port)