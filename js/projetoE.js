
//===============================================================================
//Validações
//===============================================================================
// Validando CPF
function CPF(strCPF) {
    var Soma;
    var Resto;
    var msg = "There is something wrong with your CPF. Type a valid number without special caracters!";
    Soma = 0;
    if (strCPF == "00000000000")
        return alert(msg);
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)))
        return  alert(msg);
    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11)))
        return alert(msg);

}
//Validando quantidade de caracteres no campo
function validaNome(nome) {
    if (nome.length < 3) {
        alert("The input must have at least 3 caracters");
    }
}
// Valida a quantidade de numeros do telefone
function validaTelefone(Telefone) {
    if (Telefone.length < 9) {
        alert("Your phone number is not complete. Check it please!");
    }
}
//valida e-mail
function validacaoEmail(email) {
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@") + 1, email.length);
    if ((usuario.length >= 1) && (dominio.length >= 3) && (usuario.search("@") == -1) && (dominio.search("@") == -1) && (usuario.search(" ") == -1) && (dominio.search(" ") == -1) && (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) && (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("msgemail").innerHTML = '<span class="label label-success">Valid e-mail</span>';

    } else {
		alert("Invalid e-mail, please complete the input with a valid e-mail!");
        document.getElementById("msgemail").innerHTML = '<span class="label label-danger">Invalid e-mail</span>';

    }

}
// aplica auto complete no endereço a partir do CEP
$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco").val(dados.uf + " " + dados.localidade + " " + dados.bairro + " " + dados.logradouro);

                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("Zip Code was not find.");
                    }
                });
            } //end if.

            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Invalid Zip Code.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});


//===============================================================================
//Retorna os dados a partir da pesquisa do campo Endereço
//===============================================================================

var input = document.getElementById('endereco');
var options = {
};

var autocomplete = new google.maps.places.Autocomplete(input, options);

google.maps.event.addListener(autocomplete, 'place_changed', function () {
    $("#results").html('');
    var place = autocomplete.getPlace();

    // $("#results").append('<p> Latitude e Longtidute : ' + place.geometry.location + '</p>');
	$("#results").addClass('mui-panel');
    $("#results").append('<div class="well"> <p> Complete address: ' + place.formatted_address + '</p><p> place name: ' + place.name + '</p></div>');



    var searchAddressComponents = place.address_components;
    $.each(searchAddressComponents, function () {
        if (this.types[0] == "postal_code") {
            searchCountry = this.short_name;
        }
    });
});

// Calcula a idade


function calculateAge(dobString) {
    var dob = new Date(dobString);
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate());
    var age = currentYear - dob.getFullYear();
    if (birthdayThisYear > currentDate) {
        age--;
    }
    return age;
}
function calcular(data) {
    var data = document.form.nascimento.value;
    var partes = data.split("/");
    var junta = partes[2] + "-" + partes[1] + "-" + partes[0];
    //document.form.idade.value = (calculateAge(junta));
    if(isNaN(calculateAge(junta))){
        alert("Complete the data input!");
    }
    $("#idade").html(calculateAge(junta)+" years");  
}





