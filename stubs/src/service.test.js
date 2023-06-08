const Service = require('./service')
const { createSandbox } = require('sinon')
const assert = require('assert')
const mocks = {
    newHope: require('../mock/new_hope.json'),
    theEmpireStrikesBack: require('../mock/the_empire_strikes_back.json'),
}

const sinon = createSandbox()
const BASE_URL_1 = 'https://swapi.dev/api/films/1/'
const BASE_URL_2 = 'https://swapi.dev/api/films/2/'

void async function(){
    
    // {
    //     const service = new Service()
    //     const result = await service.makeRequest(BASE_URL_2)
    //     console.log(JSON.stringify(result))
    // }
    
    const service = new Service()
    // const stub = sinon.stub(service, service.makeRequest.name)

    // stub.withArgs(BASE_URL_1).resolves(mocks.newHope)
    // stub.withArgs(BASE_URL_2).resolves(mocks.theEmpireStrikesBack)


    {
        const expected = {
            title: 'A New Hope',
            release_date: '1977-05-25'
        }
        const result = await service.getFilms(BASE_URL_1)
        assert.deepStrictEqual(result, expected)
    }

    {
        const expected = {
            title: 'The Empire Strikes Back',
            release_date: '1980-05-17'
        }
        const result = await service.getFilms(BASE_URL_2)
        assert.deepStrictEqual(result, expected)
    }

}()