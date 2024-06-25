const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

morgan.token("body", (req) => JSON.stringify(req.body));

const format =
  ":method :url :status :res[content-length] - :response-time ms :body";
app.use(morgan(format));
let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "daer Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});

app.get("/info", (request, response) => {
  const requestTime = new Date();
  const numberOfEntries = phoneBook.length;
  response.send(`<p>Phonebook has info for ${numberOfEntries} people</p>
    <p>${requestTime}</p>`);
});
app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;
  const person = phoneBook.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phoneBook = phoneBook.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }
  if (phoneBook.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }
  const newPerson = {
    id: Math.floor(Math.random() * 10000).toString,
    name: body.name,
    number: body.number,
  };
  phoneBook.push(newPerson);
  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
