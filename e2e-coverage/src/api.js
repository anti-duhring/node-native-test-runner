const http = require('http')
const { once } = require('events')

const DEFAULT_USER = {
    username: 'foo',
    password: 'bar'
}

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us')
        return response.end()
    },
    // curl -X POST --data '{"username": "foo", "password": "bar"}' localhost:3000/login
    '/login:post': async (request, response) => {
        const { username, password} = JSON.parse(await once(request, 'data'))

        if(username !== DEFAULT_USER.username || password !== DEFAULT_USER.password) {
            response.writeHead(401)
            response.write('Login failed!')

            return response.end()
        }

        return response.end()
    },
    default: (request, response) => response.end('Not Found')
}
function handler(request, response) {
    const { url, method } = request
    
    const routeKey = `${url}:${method.toLowerCase()}`
    const routeChosen = routes[routeKey] || routes.default

    return routeChosen(request, response)
    
}

const app = http.createServer(handler).listen(3000, () => console.log('running in port 3000'))