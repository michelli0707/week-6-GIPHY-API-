$("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(animalDiv);
        }
      });

    // Function for displaying anime data
    function renderButtons() {

      // Deletes the movies prior to adding new movies
      // (this is necessary otherwise you will have repeat buttons)
      $("#animebuttons").empty();

      for(var i = 0; i < animes.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var animeAdd = $("<button>");

        // Adds a class of anime to our button
        animeAdd.addClass("anime");

        // Added a data-attribute
        animeAdd.attr("data-name", animes[i]);

        // Provided the initial button text
        animeAdd.text(animes[i]);

        var rating = $(".Rating").text("Rating: " + response.Rating);
        var img = $("<img>").attr("src", response.embed-url);

        // Added the button to the buttons-view div
        $("#gifs-appear-here").append(img);
      }
    }

    // This function handles events where the add anime button is clicked
    $("#add-anime").on("click", function(event){
      event.preventDefault();

      // This line of code will grab the input from the textbox
      var anime = $("#anime-input").val().trim();

      // The anime from the textbox is then added to our array
      animes.push(anime);

      // Calling renderButtons which handles the processing of our anime array
      renderButtons();
    });

    // Adding click event listeners to all elements with a class of "anime"
    $(document).on("click", ".anime", displayAnimeShow);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});