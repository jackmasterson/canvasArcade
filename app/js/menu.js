
//this is the code for the Game Menu

var HTMLmenu = '<div id="menu"><h1>CHOOSE YOUR CHARACTER</h1><div id="standard"><h2>Standard</h2></div><div id="nonStandard"><h2>Non-Standard</h2></div></div>';
$('body').prepend(HTMLmenu);

var boy = 'images/char-boy.png';
var girl = 'images/char-cat-girl.png';
var horn = 'images/char-horn-girl.png';
var pink = 'images/char-pink-girl.png';
var ram = 'images/ram.png';
var cat = 'images/cat.png';
var ironman = 'images/ironman.png';
var characters = [boy, girl, horn, pink, ram, cat, ironman];
var id = ['boy', 'girl', 'horn', 'pink', 'ram', 'cat', 'ironman'];
var HTMLcharInit = '<div id="charIn"><img class="charImg" id="%id%" src=%data%></div>';

var boyChar = HTMLcharInit.replace('%data%', characters[0])
    .replace("%id%", id[0]);
$('#standard').append(boyChar);
var girlChar = HTMLcharInit.replace('%data%', characters[1])
    .replace("%id%", id[1]);
$('#standard').append(girlChar);
var hornChar = HTMLcharInit.replace('%data%', characters[2])
    .replace("%id%", id[2]);
$('#standard').append(hornChar);
var pinkChar = HTMLcharInit.replace('%data%', characters[3])
    .replace("%id%", id[3]);
$('#standard').append(pinkChar);
var ramChar = HTMLcharInit.replace('%data%', characters[4])
    .replace("%id%", id[4]);
$('#nonStandard').append(ramChar);
var catChar = HTMLcharInit.replace('%data%', characters[5])
    .replace("%id%", id[5]);
$('#nonStandard').append(catChar);
var starkChar = HTMLcharInit.replace('%data%', characters[6])
    .replace("%id%", id[6]);
$('#nonStandard').append(starkChar);

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