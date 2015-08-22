import { 
  graphql, 
  GraphQLSchema, 
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

let dummyData = [
  {id:'0', title:'task0', importance:1, difficulty:1, notes:'task0notes'},
  {id:'1', title:'task1', importance:2, difficulty:2, notes:'task1notes'}
]

let importanceEnum = new GraphQLEnumType({
  name: 'Importance',
  description: 'Describes the importance',
  values: {
    NOT_IMPORTANT: {
      value: 0
    },
    MEDIUM: {
      value: 1
    },
    IMPORTANT: {
      value: 2
    }
  }
})


let difficultyEnum = new GraphQLEnumType({
  name: 'Difficulty',
  description: 'Describes the difficulty',
  values: {
    NOT_DIFFICULT: { 
      value: 0 
    }, 
    MEDIUM: {
      value: 1
    },
    DIFFICULT: {
      value: 2
    }
  }
})

let TaskObject = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    importance: { type: importanceEnum },
    difficulty: { type: difficultyEnum },
    notes: { type: GraphQLString }
  })
})

let RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    task: {
      type: TaskObject,
      args: { id: { type: GraphQLID } },
      resolve: (root, {id}) => dummyData.filter((o) => o.id == id)[0]
    }
  }
})

export let schema = new GraphQLSchema({
  query: RootQuery
})

// Sample Query:  curl -XPOST -d 'query Query {task(id:0){id,title,importance, notes}}' http://localhost:3000
