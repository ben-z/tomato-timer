import restify from 'restify';
import { graphql } from 'graphql';
import { schema } from './schema.js';

var server = restify.createServer({
  name: 'GraphQL Demo'
});

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.post('/', (req, res, next) => {
  graphql(schema, req.body).then((result) => {
    res.send(result);
  })
})

server.get('/', (req, res, next) => {
  let instruction = 'POST GraphQL queries to ' + server.url + '. Sample query: "query Query {task(id:0){id,title,importance, notes}}" ' 
  res.send(instruction)
})

server.listen(process.env.PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url)
})
