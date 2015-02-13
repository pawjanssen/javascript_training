
        var foo = "bar";
        var test = 1;
        var t = foo + test; -> ????


        var MyView = function() {};

        MyView.prototype.log = function(message) {
            console.log(message);
        };

        MyView.prototype.renderGebruikers = function(gebruikers) {
            var _this = this;
            gebruikers.forEach(function(gebruiker){
                _this.log(gebruiker);
            });
        };

        var gebruikers = [ "a", "b", "c" ]