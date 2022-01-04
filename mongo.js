const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Wrong number of arguments! Instructions:')
  console.log('node mongo.js yourpassword: list people in phonebook')
  console.log('node mongo.js yourpassword name number: add contact to phonebook')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.reua1.mongodb.net/phonebook?retryWrites=true`
mongoose.connect(url)
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
