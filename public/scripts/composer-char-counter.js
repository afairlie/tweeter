$(document).ready(function() {

  $('#tweet-text').on('keyup', function(){
    const max = 140;
    let $charCount = $(this).val().length;

    const $output = $(this).closest('form').find('output.counter');

    $output.text(max - $charCount);

    if ($charCount > max) {
      $output.css({'color': 'red'})
    } else {
      $output.css({'color': 'black'})
    }

  });

});