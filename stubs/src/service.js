class Service {
    async makeRequest(url) {
        return (await fetch(url)).json() 
    }

    async getFilms(url) {
        const { title, release_date } = await this.makeRequest(url)
        return { title, release_date }
    }
}

module.exports = Service