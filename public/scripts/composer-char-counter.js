$(document).ready(function() {

  $("#tweet-text").on("input",function() {

    const counterVal = 140 - $(this).val().length;
    const $counter = $(this).parent().find("div.separate").find("output.counter");
    
    $counter.text(counterVal);
  
    if (counterVal < 0) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }
  });
});
