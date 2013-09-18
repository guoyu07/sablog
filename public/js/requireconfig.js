/* global require:true */

var require = {
    urlArgs: 'bust=' + new Date().getTime(),
    paths: {
        requireLib: '../assets/requirejs/require',
        jquery:     '../assets/jquery/jquery',
        simplecors: '../assets/simplecors/simplecors'
    },
    shim: {
    }
};
window.require = require;