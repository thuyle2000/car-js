//================
// load data ...
//================
var database = [];
$.getJSON("js/pizza.json")
    .done(function (result) {
        database = result;
    })
    .fail(function () {
        alert("Get data that bai ");
    });



//===========================
// xu ly lien ket chuyen trang
//===========================

$(document).ready(function () {

    $("#main-content").load("intro.html");


    /*********************************/
    /* Link home */
    /*********************************/
    $("#Home").click(function (e) {
        e.preventDefault();
        $("#main-content").load("intro.html");
    });



    /*********************************/
    /* Link about us */
    /*********************************/
    $("#About").click(function (e) {
        e.preventDefault();
        $("#main-content").load("contact.html");
    });


    /*********************************/
    /* Link xem danh sach cac mon an */
    /*********************************/

    $("#Menu").click(function (e) {
        e.preventDefault();
        $("#main-content").load("menu.html", function (response, status, request) {
            s = [];

            $.each(database, function (i, row) {
                s.push("<div class='col-sm-12 col-sm-6 col-md-4 item'>");
                s.push("<img src='images/" + row.image + "' />");
                s.push("<br/>" + row.price + "<br/>");
                s.push("<input type='button' value='Add To Cart' onclick='addCart(" + row.id + ")' class='btn btn-success'> <br><br>");
                s.push("<br>" + row.name.toUpperCase());
                s.push("<br>" + row.description.substring(0, 100));
                s.push("<br>");
                s.push("</div>");
            });
            s.push("</div> </div>");
            $("#data-product").html(s.join(" "));
        });

    });


    /*********************************/
    /* Link xem gio hang             */
    /*********************************/
    $("#Cart").click(function (e) {
        e.preventDefault();

        $("#main-content").load("cart.html", function (response, status, request) {
            if (localStorage.getItem("cart") != null) {
                cart = JSON.parse(localStorage.getItem("cart"));
                var s = [];
                var total = 0;
                $.each(cart, function (i, row) {

                    var row_total = roundToTwo(row.price * row.qty);

                    s.push("<tr><td>" + (i + 1) + "</td>");
                    s.push("<td>" + row.name + "</td>");
                    s.push("<td class='number'>" + row.price + "</td>");
                    s.push("<td class='number'>" + row.qty + "</td>");
                    s.push("<td class='number'>" + row_total + "</td>");
                    
                    s.push("</tr>");
                    total += row_total;
                });
                $("#cart").html(s.join(" "));
                $("#cart-total").html(roundToTwo(total));
            }

        });
    });


});



//=================
//   functions
//=================
function addCart(id) {
    var item = database[id];
    var newEle = {
        "id": id,
        "name": item.name,
        "price": item.price,
        "qty": 1
    }


    if (localStorage.getItem("cart") == null) {
        cart = [];
    }
    else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    var find = false;
    cart.forEach(element => {
        if (element.id == id) {
            element.qty++;

            find = true;
        }
    });

    if (!find) {
        cart.push(newEle);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("add cart succeeded !");

}



function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}