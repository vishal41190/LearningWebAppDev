
var main = function () {
    "use strict";
    var toDos = ["Get groceries",
                 "Make up some new ToDos",
                 "Prep for Monday's class",
                 "Answer emails",
                 "Take Gracie to the park",
                 "Finish writing this book"];
  
   
    
    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                // input a new to-do
                $input = $("<input>");
                $button = $("<button>").text("+");
								
                $button.on("click", function () {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        $input.val("");
                    }
                });

                $content = $("<div>").append($input).append($button);
               /* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */
            } else if ($element.parent().is(":nth-child(4)")) {
               
                $content = $("<div class='slideshow'>");
                $content.append("<a class='picture' href='pictures/screenshot1.png'><img src='pictures/screenshot1.png' title='Screen Shot1'/> </a>");
                $content.append("<a class='picture' href='pictures/screenshot2.png'><img src='pictures/screenshot2.png' title='Screen Shot1'/> </a>");
                $content.append("<a class='picture' href='pictures/screenshot3.png'><img src='pictures/screenshot3.png' title='Screen Shot1'/> </a>");
                $content.append("<a class='picture' href='pictures/screenshot4.png'><img src='pictures/screenshot4.png' title='Screen Shot1'/> </a>");
        
            }

            $("main .content").append($content);
            
            $(".picture").colorbox({
                rel: "group1",
                width: "70%",
                height: "70%"
       
            });

            return false;
        });
    });
    
    $(".tabs a:first-child span").trigger("click");
   
};

$(document).ready(main);
