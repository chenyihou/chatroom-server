export default {
  Mutation: {
    createActivity: async (parent, args, { models }) => {
      try {
        await models.Activity.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};