(function(){
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var textNk = document.getElementById('text-nk');
    var textEn = document.getElementById('text-en');

    initializeButtons();
    registerHandlers();
    textEn.focus();

    function createLetterSymbol(letter) {
        return '<div class="nk' + letter + '"></div>';
    }

    function updateLetters() {
        var result = '';
        for (var i = 0; i < textEn.value.length; i++) {
            var character = textEn.value[i].toLowerCase();
            if (characters.indexOf(character) > -1) {
                result += createLetterSymbol(character);
            } else {
                if (character == "\n")
                    result += '<div class="clear">&nbsp;</div>';
                else
                    result += '<div class="nnk">' + character + '</div>';
            }
        }
        textNk.innerHTML = result;
    }

    function registerHandlers() {
        document.addEventListener("keydown", function(e) {
            buttonEvent(e.keyCode, true);
        }, false);
        document.addEventListener("keyup", function(e) {
            buttonEvent(e.keyCode, false);
        }, false);

        if (textEn.addEventListener) {
            textEn.addEventListener('input', updateLetters, false); // Sane browsers
        } else if (textEn.attachEvent) {
            textEn.attachEvent('onpropertychange', updateLetters); // IE
        }

        function buttonEvent(keyCode, isPressed) {
            if (48 <= keyCode && keyCode <= 90) {
                var keychar = String.fromCharCode(keyCode).toLowerCase();
                if (characters.indexOf(keychar) > -1) {
                    document.getElementById('button-' + keychar).classList.toggle('pressed');
                }
            }
        }
    }

    function initializeButtons() {
        var buttons = document.getElementById('button-container');
        for (var i in characters) {
            if (characters.hasOwnProperty(i)) {
                (function(){
                    var ti = i;
                    var b = document.createElement('button');
                    b.className = 'button';
                    b.id = 'button-' + characters[ti];
                    b.innerHTML = createLetterSymbol(characters[ti]) + "<br /><span>" + characters[ti] + "</span>";
                    b.onmousedown = b.onmouseup = function(e) {
                        e.currentTarget.classList.toggle('pressed');
                    };
                    b.onclick = function() {
                        var d = document.createElement('div');
                        d.className = 'nk' + characters[ti];
                        textNk.appendChild(d);
                        textEn.value += characters[ti];
                    };
                    buttons.appendChild(b);
                })();
            }
        }
    }

})();