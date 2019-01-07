export default {
  Query:{
    getRegion: async (parent, args, { models, user }) =>{
      try{
        await models.Region.findOne({where:{}})
      }catch(err){}
    }
  },

  Mutation: {
    createRegion: async (parent, args, { models, user }) => {
      try {
        await models.Region.create({ ...args });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};