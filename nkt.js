(function(){
    var c = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var textNk = document.getElementById('text-nk');
    var textEn = document.getElementById('text-en');

    initializeButtons();
    registerHandlers();
    textEn.focus();

    function isValidLetter(letter) {
        return c.indexOf(letter) > -1;
    }

    function createLetterSymbol(letter) {
        return '<div class="nk' + letter + '"></div>';
    }

    function updateLetters() {
        var result = '';
        for (var i = 0; i < textEn.value.length; i++) {
            var character = textEn.value[i].toLowerCase();
            if (isValidLetter(character)) {
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
        document.addEventListener("keydown", globalKeydown, false);
        document.addEventListener("keyup", globalKeyup, false);

        if (textEn.addEventListener) {
            textEn.addEventListener('input', updateLetters, false); // Sane browsers
        } else if (textEn.attachEvent) {
            textEn.attachEvent('onpropertychange', updateLetters); // IE
        }

        function globalKeydown(e) {
            buttonEvent(e.keyCode, true);
        }

        function globalKeyup(e) {
            buttonEvent(e.keyCode, false);
        }

        function buttonEvent(keyCode, isPressed) {
            if (48 <= keyCode && keyCode <= 90) {
                var key = String.fromCharCode(keyCode).toLowerCase();
                if (isValidLetter(key)) {
                    document.getElementById('button-' + key).style.borderStyle =
                        isPressed ? 'inset' : 'outset';
                }
            }
        }
    }

    function initializeButtons() {
        var buttons = document.getElementById('button-container');
        for (var i in c) {
            if (c.hasOwnProperty(i)) {
                (function(){
                    var ti = i;
                    var b = document.createElement('button');
                    b.className = 'button';
                    b.id = 'button-' + c[ti];
                    b.innerHTML = createLetterSymbol(c[ti]) + "<br /><span>" + c[ti] + "</span>";
                    b.onclick = function() {
                        var d = document.createElement('div');
                        d.className = 'nk' + c[ti];
                        textNk.appendChild(d);
                        textEn.value += c[ti];
                    };
                    buttons.appendChild(b);
                })();
            }
        }
    }

})();