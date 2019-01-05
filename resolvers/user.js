import bcrypt from 'bcrypt';
import {
  tryLogin
} from '../auth';
const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    if (JSON.stringify(e.errors) === '{}') return [{
      path: e.parent.constraint.split('_')[1],
      message: `${e.parent.constraint.split('_')[1]} is existed`
    }]
    return e.errors.map(err => ({
      path: err.path,
      message: err.message
    }))
  }
  return [{
    path: 'name',
    message: 'something went wrong'
  }]
}

export default {
  Query: {
    getUser: (parent, {
      id
    }, {
      models
    }) => models.User.findOne({
      where: {
        id
      }
    }),
    allUsers: (parent, args, {
      models
    }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, {
        email,
        password
      }, {
        models,
        SECRET,
        SECRET2
      }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, {
      password,
      ...otherArgs
    }, {
      models
    }) => {
      try {
        if (password.length < 5 || password.length > 10) return {
          ok: false,
          errors: [{
            path: 'password',
            message: 'The password should be between 5 to 10 characters'
          }]
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({ ...otherArgs,
          password: hashedPassword
        });
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
  },
};