$(document).on("ready", function() {
  var textarea = $('textarea.text')
  textarea.on('keyup', function (ev) {
    var textLength = textarea.val().length
    var max = 140;
    $('.counter').text(max - textLength);

    if (textLength > max) {
      $('.counter').css("color", "red");
      alert("Slow down! That's too many characters!")
    } else {
      $('.counter').css("color", "black");
    }
  });
});