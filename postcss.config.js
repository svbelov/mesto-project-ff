const autoprefixer = require('autoprefixer');   // подключение плагинов в файл
const cssnano = require('cssnano');             //

module.exports = {
  plugins: [                                    // подключение плагинов к PostCSS
    autoprefixer,
    cssnano({ preset: 'default' })              // передача объекта опций cssnano со стандартными настройками минификации
  ]
};