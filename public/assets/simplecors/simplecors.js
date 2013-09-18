define(['jquery'], function($) {
    var CORS = {
        ajax: function(args) {
            var
                deferred = new $.Deferred(),
                ins = this,
                fetch =
                    $.support.cors ?
                        $.proxy(ins.standardCORS, ins) :
                        $.proxy(ins.IE9CORS, ins);

            fetch(args)
                .done(function(data) {
                    deferred.resolve(data);
                }).fail(function(/*jqXHR, textStatus, errorThrown*/) {
                    deferred.reject(/*jqXHR, textStatus, errorThrown*/);
                });

            return deferred.promise();
        },
        standardCORS: function(args) {
            var
                deferred = new $.Deferred();

            $.ajax({
                type: 'GET',
                url: args.url,
                // IE9 uses this as a rule, so might as well be consistent:
                contentType: 'text/plain',
                dataType: 'json' // but we are getting back json
            }).done( function(data, textStatus, jqXHR) {
                deferred.resolve(data);
            }).fail( function(jqXHR, textStatus, errorThrown) {
                deferred.reject(jqXHR, textStatus, errorThrown);
            });

            return deferred.promise();
        },
        IE9CORS: function(args) {

            var
                deferred = new $.Deferred(),
                xdr = new XDomainRequest();

            xdr.onerror = function() {
                deferred.reject();
            };
            xdr.onload = function() {
                var data =
                    JSON.parse(xdr.responseText);
                deferred.resolve(data);
            };
            xdr.open('get', args.url);
            xdr.send();

            return deferred.promise();
        }
    }
    return CORS;
});