//===============================================================================
// inicialização de componentes bootstrap
//===============================================================================
//Collapse fixo
 $(document).ready(function() {
        $('.panel-heading').scrollToFixed();
    });

//Collapse
function toggleChevron(e) {

    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
		
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);


//tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('a').tooltip();
})
//popover
$(function () {
    $('[data-toggle="popover"]').popover({trigger: "focus"});
})
//Loading button
$('#enviar').on('click', function () {
    var $btn = $(this).button('loading')

    $btn.button('reset')
})
//função do componente datepicker for bootstrap
$('#data').on('change', function () {
    $('.datepicker').hide();
});

//função para mascaras
function txtBoxFormat(objeto, sMask, evtKeyPress) {
    var i, nCount, sValue, fldLen, mskLen, bolMask, sCod, nTecla;


    if (document.all) { // Internet Explorer
        nTecla = evtKeyPress.keyCode;
    } else if (document.layers) { // Nestcape
        nTecla = evtKeyPress.which;
    } else {
        nTecla = evtKeyPress.which;
        if (nTecla == 8) {
            return true;
        }
    }

    sValue = objeto.value;

    // Limpa todos os caracteres de formatação que
    // já estiverem no campo.
    sValue = sValue.toString().replace("-", "");
    sValue = sValue.toString().replace("-", "");
    sValue = sValue.toString().replace(".", "");
    sValue = sValue.toString().replace(".", "");
    sValue = sValue.toString().replace("/", "");
    sValue = sValue.toString().replace("/", "");
    sValue = sValue.toString().replace(":", "");
    sValue = sValue.toString().replace(":", "");
    sValue = sValue.toString().replace("(", "");
    sValue = sValue.toString().replace("(", "");
    sValue = sValue.toString().replace(")", "");
    sValue = sValue.toString().replace(")", "");
    sValue = sValue.toString().replace(" ", "");
    sValue = sValue.toString().replace(" ", "");
    fldLen = sValue.length;
    mskLen = sMask.length;

    i = 0;
    nCount = 0;
    sCod = "";
    mskLen = fldLen;

    while (i <= mskLen) {
        bolMask = ((sMask.charAt(i) == "-") || (sMask.charAt(i) == ".") || (sMask.charAt(i) == "/") || (sMask.charAt(i) == ":"))
        bolMask = bolMask || ((sMask.charAt(i) == "(") || (sMask.charAt(i) == ")") || (sMask.charAt(i) == " "))

        if (bolMask) {
            sCod += sMask.charAt(i);
            mskLen++;
        }
        else {
            sCod += sValue.charAt(nCount);
            nCount++;
        }

        i++;
    }

    objeto.value = sCod;

    if (nTecla != 8) { // backspace
        if (sMask.charAt(i - 1) == "9") { // apenas números...
            return ((nTecla > 47) && (nTecla < 58));
        }
        else { // qualquer caracter...
            return true;
        }
    }
    else {
        return true;
    }
}

//função de mascara avançada para campo telefone (nacional, internacional, 9° digito e 0800)
(function ($)
{
    $.fn.phoneMask = function (options)
    {
        return this.each(function (i, obj)
        {
            $(obj).attr('maxlength', '18');
            jQuery(obj).keypress(function (evt) {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                var r = getTelFormatValue(this.value);
                this.value = r;

                return true;
            });


            //FORMATA TELEFONE
            jQuery(obj).keyup(function (evt) {

                var r = getTelFormatValue(this.value);
                this.value = r;

            });



            var r = getTelFormatValue(jQuery(obj).val());
            jQuery(obj).val(r);




        });
    };
})(jQuery);

function getTelFormatValue(r) {

    var onlyNumber = r.replace(/[^\d]/gi, '');

    if (onlyNumber.length >= 4 && onlyNumber.length <= 7) {  //1234567 vira 123-4567
        r = onlyNumber.substr(0, 3) + "-" + onlyNumber.substr(3);
    } else if (onlyNumber.length == 8) { //12345678 vira 1234-5678
        r = onlyNumber.substr(0, 4) + "-" + onlyNumber.substr(4, 4);
    } else if (onlyNumber.length == 9) { //123456789 vira 12345-6789
        r = onlyNumber.substr(0, 5) + "-" + onlyNumber.substr(5, 4);
    } else if (onlyNumber.length == 10) { //1234567890 vira (12) 3456-7890
        r = "(" + onlyNumber.substr(0, 2) + ") " + onlyNumber.substr(2, 4) + "-" + onlyNumber.substr(6, 4);
    } else if (onlyNumber.length == 11) { //12345678901 vira (12) 34567-8901
        r = "(" + onlyNumber.substr(0, 2) + ") " + onlyNumber.substr(2, 5) + "-" + onlyNumber.substr(7, 4);
    } else if (onlyNumber.length == 12) { //123456789012 vira (12 34) 5678-9012
        r = "(" + onlyNumber.substr(0, 2) + " " + onlyNumber.substr(2, 2) + ") " + onlyNumber.substr(4, 4) + "-" + onlyNumber.substr(8, 4);
    } else if (onlyNumber.length == 13) { //1234567890123 vira (12 34) 56789-0123
        r = "(" + onlyNumber.substr(0, 2) + " " + onlyNumber.substr(2, 2) + ") " + onlyNumber.substr(4, 5) + "-" + onlyNumber.substr(9, 4);
    } else {
        r = onlyNumber;
    }

    return r;
}
//chamando a mascara de telefone 
$(function () {	 
    $('#telefone').phoneMask();
});
