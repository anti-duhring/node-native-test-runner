class Service {
    async makeRequest(url) {
        return (await fetch(url)).json() 
    }

    async getFilms(url) {

    }
}

module.exports = Service