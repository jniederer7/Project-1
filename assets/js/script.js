   
   // This are our API credentials 
    var x_app_id = "47b34827";
    var x_app_key = "382d2ac51b6cd7e53d642a6467b86e27";
    var inputProduct = "";

    // Input form
    $("#select-product").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    inputProduct = $("#product-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchProduct(inputProduct);
  });


    // Creates dynamic list of products
   function searchProduct(){
    // Here we are building the URL we need to query the database
    var search = inputProduct;
    var queryURL = "https://trackapi.nutritionix.com/v2/search/instant?query=" + search + "?";

    // Here we run our AJAX call to Nutritionix API
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {"x-app-id": x_app_id, "x-app-key": x_app_key, "x-remote-user-id":"0"}
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(responseSearch) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(responseSearch);

        // clear results
        $("#data").empty();

         for (var i = 0; i < responseSearch.branded.length; i++) {
               var textDiv = $("<div>");
               var brandName = responseSearch.branded[i].brand_name;
               var foodName = responseSearch.branded[i].food_name;
               var calories = responseSearch.branded[i].nf_calories;
               var servingQty = responseSearch.branded[i].serving_qty;
               var servingUnit = responseSearch.branded[i].serving_unit;
               var photoSrc = responseSearch.branded[i].photo.thumb;
               var nixItemId = responseSearch.branded[i].nix_item_id;


               var p1 = $("<p>").html("Brand name: " + brandName);
               var p2 = $("<p>").html("Food name: " + foodName);
               var p4 = $("<p>").html(servingQty + " " + servingUnit);
               
               
               textDiv.attr('data-num', nixItemId);
               textDiv.addClass("product-item");
               console.log(textDiv.attr('data-num'));

            
               textDiv.append(p1); // Brand name
               textDiv.append(p2); // food name
              //  textDiv.append(p3); // Calories
               textDiv.append(p4); // serving size
               textDiv.append("<hr>")
               $("#data").prepend(textDiv);

        }

      });

    } // function searchProduct


    $(document).on("click", ".product-item", displayReport);

    function displayReport(){

        // This are our API credentials 
        var x_app_id = "47b34827";
        var x_app_key = "382d2ac51b6cd7e53d642a6467b86e27";
        var nutritionalSearch = $(this).data('num');

        // Here we are building the URL we need to query the database
        var queryURL = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id=" + nutritionalSearch;
        console.log(queryURL);

          $.ajax({
            url: queryURL,
            method: "GET",
            headers: {"x-app-id": x_app_id, "x-app-key": x_app_key, "x-remote-user-id":"0"}
          })
          // We store all of the retrieved data inside of an object called "response"
          .done(function(response) {

                 var foodName = response.foods[0].food_name;
                 var brandName = response.foods[0].nix_brand_name;

                // nutrient Calories
                  var energy_value  = response.foods[0].nf_calories;
                  var calories = Math.ceil(energy_value);

               // serving size 
                  var nf_servingQty  = response.foods[0].serving_qty;
                  var nf_servingUnit = response.foods[0].serving_unit;
                  var servingSize = " " + nf_servingQty + " " + nf_servingUnit;
             
              //  nutrient protein
              if (response.foods[0].nf_protein === null){
                    var protein_value = 0; 
                  } else {
                    var protein_value = response.foods[0].nf_protein;
                  };
                  var protein = parseInt(protein_value).toFixed(1);

                 // total fat
                 if (response.foods[0].nf_total_fat === null){
                    var totalFat_value = 0; 
                  } else {
                    var totalFat_value = response.foods[0].nf_total_fat;
                  };
                  var totalFat = parseInt(totalFat_value).toFixed(1);

                 // saturated fat
                 if (response.foods[0].nf_saturated_fat === null){
                    var sat_fat_value = 0; 
                  } else {
                    var sat_fat_value = response.foods[0].nf_saturated_fat;
                  };
                  var sat_fat = parseInt(sat_fat_value).toFixed(1);

                 // carbohydrate
                  if (response.foods[0].nf_total_carbohydrate === null){
                    var carbohydrate_value = 0; 
                  } else {
                    var carbohydrate_value = response.foods[0].nf_total_carbohydrate;
                  };
                 var carbohydrate = parseInt(carbohydrate_value).toFixed(1);

                 // fiber
                 if (response.foods[0].nf_dietary_fiber === null){
                    var fiber_value = 0; 
                  } else {
                    var fiber_value = response.foods[0].nf_dietary_fiber;
                  };
                  var fiber = parseInt(fiber_value).toFixed(1);

                 // sodium
                 if (response.foods[0].nf_sodium === null){
                    var sodium_value = 0; 
                  } else {
                    var sodium_value = response.foods[0].nf_sodium;
                  };
                  var sodium = parseInt(sodium_value).toFixed(1);
                  
                  // cholesterol
                  if (response.foods[0].nf_cholesterol === null){
                    var cholesterol_value = 0; 
                  } else {
                    var cholesterol_value = response.foods[0].nf_cholesterol;
                  };

                 // sugars
                 if (response.foods[0].nf_sugars === null){
                    var sugars_value = 0;
                  } else {
                    var sugars_value = response.foods[0].nf_sugars;
                  };

                 var sugars = parseInt(sugars_value).toFixed(1);

                  // Check for extra nutrients
                 var nutrientsArray = response.foods[0].full_nutrients;
                 for (var i = 0; i < nutrientsArray.length; i++){
                    
                    if (nutrientsArray[i].attr_id === 606){ 
                    var trans_Fat = nutrientsArray[i].value;    
                    } else {
                    var trans_Fat = 0;
                    };

                    if (nutrientsArray[i].attr_id === 320){ 
                    var vitamin_A = nutrientsArray[i].value;    
                    } else {
                    var vitamin_A = 0;
                    };

                    if (nutrientsArray[i].attr_id === 401){ 
                    var vitamin_C = nutrientsArray[i].value;    
                    } else {
                    var vitamin_C = 0;
                    };

                    if (nutrientsArray[i].attr_id === 301){ 
                    var calcium_value = nutrientsArray[i].value;    
                    } else {
                    var calcium_value = 0;
                    };

                    if (nutrientsArray[i].attr_id === 303){ 
                    var iron_value = nutrientsArray[i].value;    
                    } else {
                    var iron_value = 0;
                    };

                  };        

                  var transFat = parseInt(trans_Fat).toFixed(1);
                  var vitaminA = parseInt(vitamin_A).toFixed(1);
                  var vitaminC = parseInt(vitamin_C).toFixed(1);
                  var calcium = parseInt(calcium_value).toFixed(1);
                  var iron = parseInt(iron_value).toFixed(1);
              

               // calories from fat
               var calories_from_fat = totalFat * 9;

               // nutrients
              // Transfer content to Nutritions Fact Label
               $(".foodName").html(foodName);
               $(".calories").html(calories);
               $(".calories_from_fat").html(calories_from_fat);
               $(".protein").html(protein + "g");
               $(".servingSize").html(servingSize);
               $(".totalFat").html(totalFat + "g");
               $(".totalFatPercentage").html(Math.ceil(parseInt(totalFat_value)/0.65) + "%");
               $(".sat_fat").html(" " + sat_fat + "g");
               $(".sat_fatPercentage").html(Math.ceil(parseInt(sat_fat)*5) + "%");
               $(".cholesterol").html(" " + cholesterol_value + "mg");
               $(".cholesterolPercentage").html(Math.ceil(parseInt(cholesterol_value)/3) + "%");
               $(".sodium").html(" " + sodium + "mg");
               $(".sodiumPercentage").html(Math.ceil(parseInt(sodium_value)/24) + "%");
               $(".carbohydrates").html(carbohydrate + "g");
               $(".carboPercentage").html(Math.ceil(parseInt(carbohydrate_value)/3) + "%");
               $(".fiber").html(" " + fiber + "g");
               $(".fiberPercentage").html(Math.ceil(parseInt(fiber_value)/0.25) + "%");
               $(".sugars").html(" " + sugars + "g");
               $(".trans_fat").html(" " + transFat + "g");
               $(".brandName").html(brandName);
               $(".vitamin_C").html(Math.ceil(parseInt(vitaminC)/0.6) + "%");
               $(".calcium").html(Math.ceil(parseInt(calcium)/10) + "%");
               $(".iron").html(Math.ceil(parseInt(iron)/0.18) + "%");
       
              }); // ajax
            }

