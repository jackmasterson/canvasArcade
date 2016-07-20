 


if ($('#menu').css('display') == 'block') {
    $('canvas').toggle();
}


$('#standard').click(function() {
    $('#menu').toggle(1000);
    $('canvas').toggle(1000);

});
$('#nonStandard').click(function() {
    $('#menu').toggle(1000);
    $('canvas').toggle(1000);

});
$('#boy').click(function() {
    (player.sprite).pop();
    (player.sprite).push(boy);
});
$('#horn').click(function() {
    (player.sprite).pop();
    (player.sprite).push(horn);
});
$('#pink').click(function() {
    (player.sprite).pop();
    (player.sprite).push(pink);
});
$('#ram').click(function() {
    (player.sprite).pop();
    (player.sprite).push(ram);
});
$('#cat').click(function() {
    (player.sprite).pop();
    (player.sprite).push(cat);
});
$('#ironman').click(function() {
    (player.sprite).pop();
    (player.sprite).push(ironman);
});
$('#joker').click(function() {
    (player.sprite).pop();
    (player.sprite).push(ironman);
});