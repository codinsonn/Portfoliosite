'use strict';

let fs = require('fs');

module.exports = [

  {
    method: 'GET',
    path: '/api/periods',
    handler: function(request, reply){

      fs.readFile('./data/cards.json', 'utf-8', (err, data) => {

        if(err){
          console.error(err);
        }

        reply(JSON.parse(data));

      });

    }
  },

  {
    method: 'GET',
    path: '/api/periods/{period_id}',
    handler: function(request, reply){

      fs.readFile('./data/cards.json', 'utf-8', (err, data) => {

        if(err){
          console.error(err);
        }

        let periods = JSON.parse(data);
        let periodId = request.url.path.split('/')[3];
        let period = periods.timeperiods[periodId];

        reply(period);

      });

    }
  },

  {
    method: 'GET',
    path: '/api/periods/{period_id}/cards/{card_id}',
    handler: function(request, reply){

      fs.readFile('./data/cards.json', 'utf-8', (err, data) => {

        if(err){
          console.error(err);
        }

        let periods = JSON.parse(data);
        let periodId = request.url.path.split('/')[3];
        let period = periods.timeperiods[periodId];
        let cardId = request.url.path.split('/')[5];
        let card = period.cards[cardId];

        reply(card);

      });

    }
  }

];
