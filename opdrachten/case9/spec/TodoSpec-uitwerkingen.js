describe("console log active", function() {
    it("return true", function() {
        expect(View.isConsoleAvailable()).toEqual(true);
    });
});


describe("getAll todo s", function() {
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

describe("move todo to user", function() {
    var todoStorageInstance = new TodoStorage();
    var gebruikerId = "1"
    var todoId = "1"
    it("should make a post with user Id and todo Id", function() {
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

        expect($.ajax.mostRecentCall.args[1]["data"]["nieuweGebruikerID"]).toEqual(gebruikerId);
    });
});
