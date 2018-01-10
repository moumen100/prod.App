
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "http://localhost:49162/Suppliers/GetProducts",
        cache: false,
        success: function (result) {
            var product = result

            $.each(product, function (i, item) {
                list = "<tr>" + "<td>" + item.ProductName + "</td> <td> <a href= \"#\" class =\"det\" id=\"" + i + "\">Details</a></td>" +
                    "<td><a href=\"#\" class =\"edi\" id=\"" + i + "\">Edit</a> </td>" +
                    "<td><a href=\"#\" class =\"del\" id=\"" + i + "\">Delete</a></td> </tr>" + 
                    "<tr><td><div id = \"info"+i+"\"></div></td></tr>";

                $("table").append(list)


            })

        }
    }
    )
    
})

$(document).ready(function () {
    $("table").on("click", ".det", function () {
        var self = $(this).closest(".det");
        index = self.attr("id");
        $.ajax({
            type: "GET",
            url: "http://localhost:49162/Suppliers/GetProducts",
            cache: false,
            success: function (result) {

                info = "<p><b>Nom du produit :</b>&nbsp" + result[index].ProductName + "</br>" +
                    "<b>Prix :</b>&nbsp" + result[index].UnitPrice + "</br>" +
                    "<b>Package :</b>&nbsp" + result[index].Package + "</br>" +
                    "<b>Disponible : </b>";
                if (result[index].IsDiscontinued) info += "Oui";
                else info += "Non";
                $("#info"+index).append(info);
                
            }
        }
        )
    }
        )
})

/// Post Request Ajax

// fonction create

function create() {
    if ($("#np").val() == "") {
        alert("Vous devez introduire le nom du produit ")
        $("#np").parent("div").addClass("has-error");
    }
    else {
        if ($("#p").val() == "") { alert("Vous devez introduire le Prix unitaire "); $("#p").parent("div").addClass("has-error"); }
        else {
            if ($("#u").val() == "") { alert("Vous devez préciser l'unité"); $("#u").parent("div").addClass("has-error"); }
            else {
                if ($("#un").val() == "") { alert("Vous devez préciser l'unité") }
                else {
                    if ($("#d").val() == "") { alert("Vous devez préciser si le produit est disponible") }
                    else {
                        var d
                        if ($("#d").val() == "Oui") d = true
                        else d = false
                        var produit = {
                            ProductName: $("#np").val(),
                            UnitPrice: $("#p").val(),
                            Package: $("#u").val() + " " + $("#un").val(),
                            IsDiscontinued: d
                        };

                        $.ajax({
                            url: "http://localhost:49162/Suppliers/AddProduct/",
                            type: "POST",
                            cache: false,
                            dataType: 'json',
                            data: produit,
                            success: function () {
                                alert("hhhhhhh")
                            },
                            error: function (exception) { alert('Exception:' + exception); }


                        })
                    }
                }
            }
        }
    }
}


/*$(document).ready(function () {
    $(".btn-primary").click(function () {
        create()
    })
})
/*$(document).ready(function () {
    $("#btn-Add").click(function () {
        
    })
}

)*/


