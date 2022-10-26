const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mangodb"))
  .catch((err) => console.error("could not connect to mongodb", err.message));
//schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});
//create model
const Person = mongoose.model("Person", personSchema);
//create person (create a document)
const createPerson = async () => {
  const person = new Person({
    name: "Sihem Mhadhbi",
    age: 24,
    favoriteFoods: ["Pizza", "Lazagne", "Pencake"],
  });
  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//createPerson();

//Create Many person
const createPeople = async (people) => {
  try {
    const result = await Person.create(people);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

/*createPeople([
      {
        name: "Ines Elkefi",
        age: 27,
        favoriteFoods: ["Spageti", "Crepe"],
      },
      {
        name: "Rawdha Rawdha",
        age: 27,
        favoriteFoods: ["Couscous", "Gateau"],
      },
      {
        name: "Mary Mary",
        age: 25,
        favoriteFoods: ["Soupe", "Gateau"],
      },
    ]);*/
//model find()
const findPerson = async (person) => {
  try {
    const result = await Person.find({ name: person });
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//findPerson("Ines Elkefi");

// model findone
const findFood = async (food) => {
  try {
    const result = await Person.findOne({ favoriteFoods: food });
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//findFood("Gateau");
//find by id
const findId = async (id) => {
  try {
    const result = await Person.findById({ _id: id });
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//findId("635953c4bc7ac9262497420a");
//Perform Classic Updates
const updateFood = async (id, food) => {
  try {
    const result = await Person.findById({ _id: id });
    result.favoriteFoods.push(food);
    await result.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//updateFood("635953c4bc7ac9262497420a", "hamburger");
// find one and update
const updateAge = async (name, age) => {
  try {
    const result = await Person.findOneAndUpdate(
      { name },
      { age },
      { new: true }
    );
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
//updateAge("Sihem Mhadhbi", 20);
// find by id and delete
const deletePerson = async (id) => {
  try {
    const result = await Person.findByIdAndRemove(id);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
deletePerson("635953c4bc7ac92624974209");
