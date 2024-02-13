require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: Array,
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 87,
    favoriteFoods: ['something', 'something'],
  });

  person.save(function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: 'Frankie', age: 74, favoriteFoods: ['Del Taco'] },
  { name: 'Sol', age: 76, favoriteFoods: ['roast chicken'] },
  { name: 'Robert', age: 78, favoriteFoods: ['wine'] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const personName = 'Frankie';
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  Person.findOneAndUpdate(
    { _id: personId },
    { $push: { favoriteFoods: foodToAdd } },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);

      updatedPerson.markModified('favoriteFoods');
      updatedPerson.save((err, savedPerson) => {
        if (err) return console.error(err);
        done(null, savedPerson);
      });
    },
  );
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
