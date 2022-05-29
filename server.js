const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const figlet = require('figlet')


const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname
    const params = querystring.parse(url.parse(req.url).query)
    console.log(page)

    const getFileDetails = (file, fileContent) => {
        fs.readFile(file, (err, data) => {
            res.writeHead(200, {'content-Type' : fileContent})
            res.write(data)
            res.end()
        })
    }

    if(page == '/'){
        getFileDetails('index.html', 'text/html')
    }
    else if(page == '/about'){
        getFileDetails('about.html', 'text/html')
    }

    else if(page == '/contact'){
        getFileDetails('contact.html', 'text/html')
    }

    else if(page == '/api'){
        if('student' in params){
            if(params['student'] == 'sullivan'){
                res.writeHead(200, {'content-Type' : 'application/json'})
                const objToJason = {
                    name:'sullivan',
                    status : 'Amazon Developer',
                    currentOccupation : 'Software Engineer'
                }   
                res.end(JSON.stringify(objToJason))         
            }else if(params['student'] !== 'sullivan'){
                res.writeHead(200, {'content-Type': 'application/json'})
                const ObjToJason = {
                    name: 'unknown',
                    status : 'unknown',
                    currentOccupation : 'unknown'
                }
                res.end(JSON.stringify(ObjToJason)) 
            }
        }
    }
    
    else if(page == '/css/style.css'){
        getFileDetails('css/style.css', 'text/css')
    }

    else if(page == '/js/main.js'){
        getFileDetails('js/main.js', 'text/javascript')
    }

    else{
        figlet('404!!', function(err, data){
            if(err){
                console.log('something went wrong.....')
                console.log(dir)
                return;
            }
        res.write(data)
        res.end()
        })
    }

    
})

server.listen(8000)