Yet another implementation of Conway's life game.
=================================================

>Written in pure javascript.

##What's inside?
* Current implementation supports field with big integer size such as 2^64 x 2^64 or may be even more: `client/js/algo.js`
* Visualization of this algo on field 100x100: `client/js/conway.js`

**Attention:** Don't try too much huge field on canvas, that's *javascript*, not *C*. If you do so, your browser will enjoy with infinite turning circle or kill your system. I warn you.

##Structure
`build-utils`: Util modules for build system: webpack and gulp

`client/js`: Source modules for client javascript

`client/style`: Source styles

`configs/build-config.js`: Configs for build system 

`node_modules`: Just node_modules

`public`: Folder for built static resources

`test`: Tests for application


##Install
1. `npm install`
2. `gulp` or `node node_modules/gulp/bin/gulp.js`
3. Open `http://localhost:9002` in browser
