/*global console:false, define:false */

define(['simplecors'], function (CORS) {
    var App = {
        initialize: function() {
            this.$button = $('button');
            this.$output = $('output');
            // this.postsUrl = 'http://dev.dnsdojo.com/sablog/posts';
            this.postsUrl = '//go.dosa.northwestern.edu/shared/sablog/posts';
            this.registerEvents();
        },
        registerEvents: function() {
            this.$button.on('click', $.proxy(this.onClickButton, this));
        },
        onClickButton: function() {
            var
                ins = this;

            CORS.ajax({
                url: ins.postsUrl
            }).done( function(data) {
                ins.render(data);
            }).fail( function(/*jqXHR, textStatus, errorThrown*/) {
                console.log('failure!');
                // console.log(jqXHR);
                // console.log(textStatus);
                // console.log(errorThrown);
            });
        },
        render: function(data) {

            var $fragment = data.reduce( function($container, item, index) {
                var linkedTitle = '<a href="' + item.link + '">' + item.title + '</a>';
                $container.append('<dt>Title<dt><dd>' + linkedTitle + '</dd>');
                $container.append('<dt>Link<dt><dd>' + item.link + '</dd>');
                $container.append('<dt>Description<dt><dd>' + item.description + '</dd>');
                return $container;
            }, $('<dl>'));

            this.$output.append($fragment).append('<hr />');
        }
    }
    return App;
});