export default {
    Query: {
        allCars: async(parent, args, { Car }) => {
            const cars = await Car.find();

            // Cada id de MongoDB es un objeto, así que hay que transformarlos por string
            return cars.map(car => {
                car._id = car._id.toString;

                return car;
            });
        }
    },

    Mutation: {
        createCar: async(parent, args, { Car }) => {
            const car = await new Car(args).save();
            car._id = car._id.toString;

            return car;
        }
    }
}