
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': './webpack.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: true,
    }],

    "no-param-reassign": ["error", { "props": false }],
  },
};
