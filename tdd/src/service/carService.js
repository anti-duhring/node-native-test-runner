const BaseRepository = require('../repository/base/baseRepository')

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })
    }

    async getAvaliableCar(carCategory) {
        const cardId = this.chooseRandomCar(carCategory)
        const car = await this.carRepository.find(cardId)

        return car
    }

    getRandomPositionFromArray(list) {
        return Math.floor(Math.random() * list.length)
    }

    chooseRandomCar(carCategory) {
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomCarIndex]

        return carId
    
    }
}

module.exports = CarService