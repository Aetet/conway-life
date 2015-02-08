Yet another implementation of Conway's life game.
=================================================

>Written in pure javascript.

##What's inside?
Current implementation supports field with big integer size such as 2^64 x 2^64 and of course visualization of this algo on field 100x100.
**Attention:** Don't try too much huge field on canvas, that's *javascript*, not *C*. If you do so, your browser will enjoy with infinite turning circle or kill your system. I warn you.

##Install
1. `npm install`
2. `gulp` or `node node_modules/gulp/bin/gulp.js`
3. Open `http://localhost:9002` in browser
