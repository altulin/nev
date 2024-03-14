<!-- ##### node v18.13.0 -->

# gulp-scss-pug-starter

<!-- ![License](https://img.shields.io/github/license/altulin/gulp-scss-pug-starter) -->

<!-- <a href="https://qiwi.com/n/ALTULIN" target="_blank">
	<img src="https://img.shields.io/badge/%D0%92%D0%9D%D0%95%D0%A1%D0%A2%D0%98%20%D0%94%D0%9E%D0%9D%D0%90%D0%A2-QIWI-red">
</a> -->

## Используемые технологии

- система сборки [Gulp](https://gulpjs.com/)
- оптимизация изображений
- генерация SVG-спрайтов
- шаблонизация с помощью [Pug](https://pugjs.org/)
- CSS-препроцессор [SCSS](http://sass-lang.com/) и [Autoprefixer](https://autoprefixer.github.io/ru/)
- ES6
- [Browsersync](https://www.browsersync.io/), автоматическое обновление страницы при разработке
- используется [Webpack](https://webpack.js.org/) для сборки JavaScript-модулей
- генерация иконки сайта в адресную строку браузера (favicon)
- возможность быстро создать архив проекта

## Начало работы

- установите [NodeJS](https://nodejs.org/en/)
- установите [Gulp](https://gulpjs.com/): `npm i -g gulp`
- клонируйте сборку с помощью [Git](https://git-scm.com/downloads): `git clone git@github.com:altulin/gulp-scss-pug-starter.git`
- перейдите в папку со сборкой: `cd gulp-scss-pug-starter`
- установите все зависимости: `npm i`
- вводим команду `npm start` и можно приступать к работе.
- для сборки проекта требуется команда: `npm run build`

## Структура папок и файлов

```
gulp-scss-pug-starter
├── dist
├── _src
│ ├── _favicon
│ ├── _img
│ │ ├── sprite
│ │ ├── svg
│ │ ├── webp
│ ├── css
│	│	├── style.css
│ │ ├── style.min.css
│ ├── favicon
│ ├── fonts
│ ├── img
│ │ ├── svg
│ │ ├── webp
│ ├── js
│ │ ├── modules
│ │ ├── main.js
│ │ ├── script.js
│ │ ├── script.min.js
│ │ ├── vendor
│ ├── pug
│ │ ├── helpers
│ │ ├── modules
│ │ ├── pages
│ │ │ ├── index.pug
│ │ ├── sections
│ │ ├── templates
│ │ │ ├── _main.pug
│ ├── sass
│ │ ├── blocks
│ │ ├── helpers
│ │ ├── style.scss
│ ├── index.html
├── gulp-modules
├── gulpfile.js

```

### `_src`

В папке `_src` хранятся исходные файлы проекта.

### `_src/_favicon`

Папка `_src/_favicon` предназначена для png или jpg изображения из которого будет сгенерирована иконка сайта в адресную строку браузера (favicon). Готовые иконки попадают в папку: `_src/img/favicon`.

### `_src/_img`

Папка `/_img` предназначена для хранения изображений.
Файлы из данной папки попадают в `/img`.

### `_src/_img/sprite`

Папка `_src/_img/sprite` предназначена для хранения векторных иконок. Файлы из данной папки объединяются в один спрайт: `_src/img/sprite.svg`.

### `_src/_img/svg`

Папка `_src/_img/svg` предназначена для хранения векторных иконок. Файлы из данной папки оптимизируются и попадают в папку: `_src/img/svg`.

### `_src/_img/webp`

Папка `_src/_img/webp` предназначена для хранения png или jpg изображений . Файлы из данной папки преобразуются в webp и попадают в папку: `_src/img/webp`.

### `_src/_img/css`

Папка `_src/_img/css` предназначена для хранения готовых стилей.

### `_src/_img/fonts`

Папка `_src/_img/fonts` предназначена для хранения шрифтов. Шрифты ttf автоматически конвертируются в woff и woff2.

### `_src/js`

Папка `_src/js` предназначена для хранения скриптов.

### `_src/js/modules`

Папка `_src/js/modules` предназначена для хранения модулей.

### `_src/js/main.js`

Файл `_src/js/main.js` предназначен для хранения основной логики сайта.

### `_src/js/vendor`

Папка `_src/js/vendor` предназначена для хранения скриптов сторонних библиотек, которых нет в репозитории npm.

### `_src/pug`

Папка `_src/pug` предназначена для хранения шаблонов.

### `_src/pug/helpers/arrays.pug`

Файл `_src/pug/helpers/arrays.pug` предназначен для хранения переменных, списков и тд для Pug.

### `_src/pug/helpers/mixins.pug`

Файл `_src/pug/helpers/mixins.pug` предназначен для хранения Pug-миксинов.

### `_src/pug/modules/_head.pug`

В файле `_src/pug/modules/_head.pug` хранится шаблон тега head.

### `_src/pug/pages`

Папка `_src/pug/pages` предназначена для хранения шаблонов страниц.

### `_src/pug/templates`

Папка `_src/pug/templates` предназначена для хранения базовых шаблонов.

### `_src/pug/sections`

Папка `_src/pug/sections` предназначена для хранения pug блоков.

### `_src/scss`

Папка `_src/scss` предназначена для хранения стилей.

---

<!-- <a href="https://qiwi.com/n/ALTULIN" target="_blank">
	<img src="https://img.shields.io/badge/%D0%92%D0%9D%D0%95%D0%A1%D0%A2%D0%98%20%D0%94%D0%9E%D0%9D%D0%90%D0%A2-QIWI-red">
</a> -->
