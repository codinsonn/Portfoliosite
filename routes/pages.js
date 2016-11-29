'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return reply.view('Homepage');
    }
  }

  /* --- Info Routing -------------------------------------------- */

  /*{
    method: 'GET',
    path: '/sdamtp/{timeperiod_id}',
    handler: (request, reply) => {
      return reply.view('InfoScreenPage');
    }
  },*/

  /* --- Mobile Routing -------------------------------------------- */

  /*{
    method: 'GET',
    path: '/m/visitor',
    handler: (request, reply) => {
      return reply.view('MobileCardsPage');
    }
  }*/

];
