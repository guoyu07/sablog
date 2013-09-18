$( function() {
    // Todo:
    // 1. make this cors a bower package, for requirejs, say have CORS.ajax(), static method, returns new instance of the cors object
    // 2. put in links (otherwise 'todo')
    // 3. think about Cascade and calendar events how they can change ... document small stuff in our notes
    // 4. refactor redesign javascript, make all rational
    // 5. make sablog actually pull from studentaffairsnu.wordpress.com/feed

    var Test = {
        initialize: function() {
            this.$button = $('button');
            this.$output = $('output');
            this.postsUrl = 'http://dev.dnsdojo.com/sablog/posts';
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
                ins.render(data[1].title);
            }).fail( function() {
                console.log('fail');
            });
        },
        render: function(msg) {
            this.$output.html(msg);
        }
    };

    Test.initialize();
});