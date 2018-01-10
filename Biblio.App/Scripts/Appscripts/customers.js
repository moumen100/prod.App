function getCustomers() {
    $.get("http://localhost:49162/Home/GetCustomers").success(function (result){
        var customers = result
        customers.forEach(function (elem) {
            list = "<li>" + elem.FullUpperName + "</li>";
            $("#listCustomers").append(list);
        })
        
    })
}

