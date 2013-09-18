/*global require:false, console:false */

require(['app'], function (app) {
    console.log('js/main.js loaded');
    window.app = app;
    app.initialize();
});