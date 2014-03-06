describe("console log active", function() {
    it("return true or false", function() {
        expect(View.isConsoleAvailable()).toEqual(true);
    });
});


describe("getAll products", function() {
    var todoStorageInstance = new TodoStorage();
    it("should make an AJAX request to the correct URL", function() {
        spyOn($, "getJSON").andCallFake(function(e){
            return {
                "done": function() {
                    return {
                        "fail": function() {}
                    }
                }
            }
        });
        todoStorageInstance.getAll();
        expect($.getJSON.mostRecentCall.args[0]).toEqual("/gebruikers/1/todos");
    });
});

describe("", function() {
    var todoStorageInstance = new TodoStorage();
    var gebruikerId = "1"
    var todoId = "1"
    it("should make an AJAX request to the correct URL", function() {
        spyOn($, "ajax").andCallFake(function(e){
            return {
                "done": function() {
                    return {
                        "fail": function() {}
                    }
                }
            }
        });
        todoStorageInstance.moveTodo(gebruikerId, todoId);
        expect($.ajax.mostRecentCall.args[0]["data"]["nieuweGebruikerID"]).toEqual(gebruikerId);
    });
});