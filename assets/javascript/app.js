$(document).ready(function () {

    var topics = ["Arrested Development", "Schitt's Creek", "Broad City", "It's Always Sunny in Philadelphia"];

    function displayGifs() {
        var show = $(this).attr("data-name");
        var APIKey = "eALZ4S6DRHN6EW8JtWGOzG6xBJU5q8IE";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=" + APIKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#gif-view").empty();
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var showImage = $("<img>");
                showImage.addClass("showGif");
                showImage.attr("src", results[i].images.fixed_height_still.url);
                showImage.attr("data-still", results[i].images.fixed_height_still.url);
                showImage.attr("data-animate", results[i].images.fixed_height.url);
                showImage.attr("data-state", "still");

                gifDiv.append(p);
                gifDiv.append(showImage);
                $("#gif-view").prepend(gifDiv);
            }
        })
    }

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("tvshow");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#buttons-view").append(newButton);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var addedTopic = $("#user-input").val().trim();
        topics.push(addedTopic);
        renderButtons();
    })

    $(document).on("click", ".showGif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", ".tvshow", displayGifs);

    renderButtons();

})