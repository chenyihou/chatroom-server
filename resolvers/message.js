const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const NEW_MESSAGE = 'NEW_MESSAGE';
export default {

  Message: {
    user: ({ user, userId }, args, { models }) => {
      if (user) {
        return user;
      }
      return models.User.findOne({ where: { id: userId } }, { raw: true });
    },
  },

  Query: {
    allMessages: async (parent, args, {
        models
      }) => 
      models.Message.findAll()

  },



  Mutation: {
    createMessage: async (parent, args, {
      models,
      user
    }) => {
      try {
        console.log(user.id)
        const msg=await models.Message.create({
          ...args,
          userId: user.id,
        });
        return msg;
      } catch (err) {
        console.log(err);
        return {id:-1,text:'error',user:{id:-1,username:'error'},created_at:'12153151'}
      }
    },
  },
};