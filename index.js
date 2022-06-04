$(function(){
    loadProduct();
    $(".product").on("click",".btn-outline-danger",handleDelete);
    $(".product").on("click",".btn-outline-warning",handleUpdate);
    $("#addbtn").click(addproduct);
    $("#update_btn").click(function(){
      var id = $("#updateid").val()
      var Name = $("#update_product_name").val();
      var Description = $("#update_D_Product").val();
      var Price = $("#update_price").val();
      var Color = $("#update_product_clr").val();
      var Category = $("#update_category").val();
      
      $.ajax({
        url:"https://api-zee-ass-2.herokuapp.com/api/products/"+id,
        data:{Name,Description,Price,Color,Category},
        method: "PUT",
        success: function(response){
          console.log(response);
          loadProduct();
          $("#updateModel").modal("hide");

        }
        })
      })
});


function handleUpdate(){
  $("#updateModel").modal("show");
  var btn = $(this);
  var parentDiv = btn.closest(".product")
  let id = parentDiv.attr("data-id")
  $.get("https://api-zee-ass-2.herokuapp.com/api/products/" +id,function(response){
      $("#updateid").val(response._id)
      $("#update_product_name").val(response.Name);
      $("#update_D_Product").val(response.Description);
      $("#update_price").val(response.Price);
      $("#update_product_clr").val(response.Color);
      $("#update_category").val(response.Category);
      $("#updateModel").modal("show");


  })
}
function addproduct(){
  var Name = $("#product_name").val();
  var Description = $("#D_Product").val();
  var Price = $("#price").val();
  var Color = $("#product_clr").val();
  var Category = $("#category").val();
  $.ajax({
    url:"https://api-zee-ass-2.herokuapp.com/api/products",
    method: "POST",
    data: { Name,Description, Price, Color, Category },
    success: function(response){
      console.log(response);
      loadProduct();
      $("#addmodel").modal("hide");
      $("#product_name").val("");
      $("#D_Product").val("");
      $("#price").val("");
      $("#product_clr").val("");
      $("#category").val("");
    },
  })
}

function handleDelete(){
  var btn = $(this);
  var parentDiv = btn.closest(".product")
  let id = parentDiv.attr("data-id")
  console.log(id);
  $.ajax({
    url:"https://api-zee-ass-2.herokuapp.com/api/products/" +id,
        method:"DELETE",
        success:function(){
          
    loadProduct();
        }

  })
} 
function loadProduct(){
    $.ajax({
        url:"https://api-zee-ass-2.herokuapp.com/api/products",
        method:"GET",
        error: function(response){
          var prod =  $(".product");
          prod.html("An error has been occured")
        },
        success:function(response){
            console.log(response)
            var prod =  $(".product");
            prod.empty();
            for(var i=0; i<response.length; i++){
              var pro = response[i];
                prod.append(`
                <div class="product col-lg-4 my-2 px-4" data-id=${pro._id}>
                <div class="card">
                <img class="card-img-top" src="./city.png" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${pro.Name}</h5>
              <p class="card-text">${pro.Description}</p>
              <p class="card-text text-black font-weight-bold">Price: $${pro.Price}</p>
              <p class="card-text font-weight-bold">Color: ${pro.Color}</p>
              <p class="card-text font-weight-bold">Category: ${pro.Category}</p>
              
              <button type="button" class="btn btn-outline-warning">
              Edit
            </button>
              <button type="button" class="btn btn-outline-danger">
            Delete
          </button>
          
            </div>
          </div>
          </div>
                `);
            }
        }
    });
}