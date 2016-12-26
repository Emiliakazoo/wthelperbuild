$(function() {

    $("form").on("submit", function(e) {
        e.preventDefault();

        var state = $("input[name=state]").val();
        console.log(state)

        $.getJSON("/api/" + state, function(data) {
            console.log(data.response.legislator[0]["@attributes"].firstlast);

            data.response.legislator.forEach(function(val, index) {

                var cidNumber = val["@attributes"].cid
                $(".representatives").append("<a class='representative' href='api/contributors/" + cidNumber + "'>" + "<li>" + val["@attributes"].firstlast + "</li></a>")

            });

        });

    });


    $(".representatives").on("click", ".representative", function(e) {
        e.preventDefault();
         $(".donors").empty()
        var anchorEndpoint = $(this).attr("href");
        var arr = anchorEndpoint.split("");
        var cid = arr.slice(17).join("");

        $.getJSON("/api/contributors/" + cid, function(data) {
            console.log(cid);
            console.log(data);

            data.response.contributors.contributor.forEach(function(val) {

                $(".donors").append("<li>" +val["@attributes"].org_name+ ": " + "$" +val["@attributes"].total+   "</li>")

               


            });


        });


    });



});
