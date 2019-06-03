const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');

//Monster Types

const MonsterQueryType = new GraphQLObjectType({
  name: 'Monsterquery',
  fields: () => ({
    count: { type: GraphQLInt },
    results: { type: new GraphQLList(MonsterResultType) },
  }),
});

const MonsterResultType = new GraphQLObjectType({
  name: 'MonsterResults',
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  })
});

const MonsterType = new GraphQLObjectType({
  name: 'MonsterType',
  fields: () => ({
    _id: { type: GraphQLString },
    index: { type: GraphQLInt },
    name: { type: GraphQLString },
    size: { type: GraphQLString },
    type: { type: GraphQLString },
    subtype: { type: GraphQLString },
    alignment: { type: GraphQLString },
    armor_class: { type: GraphQLInt },
    hit_points: { type: GraphQLInt },
    hit_dice: { type: GraphQLString },
    speed: { type: GraphQLString },
    strength: { type: GraphQLInt },
    dexterity: { type: GraphQLInt },
    constitution: { type: GraphQLInt },
    intelligence: { type: GraphQLInt },
    wisdom: { type: GraphQLInt },
    charisma: { type: GraphQLInt },
    wisdom_save: { type: GraphQLInt },
    charisma_save: { type: GraphQLInt },
    perception: { type: GraphQLInt },
    stealth: { type: GraphQLInt },
    damage_vulnerabilities: { type: GraphQLString },
    damage_resistances: { type: GraphQLString },
    damage_immunities: { type: GraphQLString },
    condition_immunities: { type: GraphQLString },
    senses: { type: GraphQLString },
    languages: { type: GraphQLString },
    challenge_rating: { type: GraphQLInt },
    special_abilities: { type: new GraphQLList(SpecialAbilityType) },
    actions: { type: new GraphQLList(ActionType) },
    legendary_actions: { type: new GraphQLList(LegendaryActionType) },
  })
})

const SpecialAbilityType = new GraphQLObjectType({
  name: 'SpecialAbility',
  fields: () => ({
    attack_bonus: { type: GraphQLInt },
    desc: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

const ActionType = new GraphQLObjectType({
  name: 'ActionType',
  fields: () => ({
    damage_bonus: { type: GraphQLInt },
    damage_dice: { type: GraphQLString },
    attack_bonus: { type: GraphQLInt },
    desc: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

const LegendaryActionType = new GraphQLObjectType({
  name: 'LegendaryActionType',
  fields: () => ({
    attack_bonus: { type: GraphQLInt },
    desc: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});


// Root Query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    monsters: {
      type: MonsterQueryType,
      resolve(arent, args) {
        return axios
          .get(`http://www.dnd5eapi.co/api/monsters`)
          .then(res => res.data)
      }
    },
    monster: {
      type: MonsterType,
      args: {
        index: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`http://www.dnd5eapi.co/api/monsters/${args.index}`)
          .then(res => res.data)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})