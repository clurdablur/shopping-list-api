var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});


app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
      // return request.body;
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});


app.delete('/items/:id', jsonParser, function(request, response) {
    var itemArr = [];
    console.log(request.params);
    for (var x = 0; x < storage.items.length; x++){
        if (storage.items[x].id != request.params.id){
            itemArr.push(storage.items[x]);
  }
}
storage.items = itemArr;
    response.status(201).json(itemArr);
});


app.put('/items/:id', jsonParser, function(request, response) {
    var item = {};
    response.status(201).json(item);
});

app.listen(process.env.PORT || 8080, process.env.IP);