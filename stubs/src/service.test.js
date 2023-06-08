const Service = require('./service')

const BASE_URL_1 = 'https://swapi.dev/api/films/1/'
const BASE_URL_2 = 'https://swapi.dev/api/films/2/'

void async function(){
    
    {
        const service = new Service()
        const result = await service.makeRequest(BASE_URL_2)
        console.log(JSON.stringify(result))
    }

    

}()