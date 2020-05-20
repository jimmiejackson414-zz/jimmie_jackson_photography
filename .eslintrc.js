module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "vue/script-indent": ["error", 2, { "baseIndent": 1 }],
    "vue/css-indent": [],
    "vue/max-attributes-per-line": [
      2,
      {
        "multiline": {
          "allowFirstLine": false
        }
      }
    ],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        "startTag": "never",
        "endTag": "never",
        "selfClosingTag": "always"
      }
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "never"
      }
    ],
    "vue/attributes-order": [
      "error",
      {
        "order": [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT"
        ]
      }
    ],
    "vue/order-in-components": [
      "error",
      {
        "order": [
          "el",
          "name",
          "parent",
          "functional",
          ["delimiters", "comments"],
          "extends",
          "mixins",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "fetch",
          "asyncData",
          "data",
          "computed",
          "methods",
          "LIFECYCLE_HOOKS",
          "watch",
          ["components", "directives", "filters"],
          "head",
          ["template", "render"],
          "renderError"
        ]
      }
    ],
  }
}
