/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

       

        console.log('Received Event: ' + id);
    }

};
var ok = true;
var oggettoFilm;
$(document).ready(function () {
  
    //setInterval(function () { $.mobile.changePage("#menu"); }, 1500);
    app.initialize();
    $.ajax({ 
        url: 'http://46.228.240.137/Cinema/service/films/',
        success: function (data) {
            oggettoFilm = data;
            for (var i = 0; i < data.length; i++) {
                $("#listaFilm").append("<li class='liListaFilm'><img class='imgfilm' src='"+data[i].posterURL+"'><p class='titleLista'>" + data[i].title +
                     "</p><input type='button' data-role='button' data-path=" + i + " class='btnOrario btnLFilm' value='Orari' /><input type='button' data-path=" + i + " class='btnTrama btnLFilm' value='Trama'></li>");
            }
            $("#listaFilm").listview("refresh");

            $('.btnTrama').on('click', function () {
                $('#ImgDettaglioFilm').html("");

                $.mobile.changePage("#trama", { transition: "flip" });
                var film = parseInt($(this).attr('data-path'));
                    
                $('#ImgDettaglioFilm').append("<img src='" + data[film].posterURL + "' id='imgTrama1' ></img>");
                $('#ImgDettaglioFilm').append("<img src='" + data[film].posterURL + "' id='imgTrama2' ></img>");
                $('#ImgDettaglioFilm').append("<img src='" + data[film].posterURL + "' id='imgTrama3' ></img>");

                $('#autore').html("" + data[film].director + "");
                $('#tramaSpan').html("<p>" + data[film].plot + "</p>");
                $('#anno').html("<p>'" + data[film].year + "'</p>");
                $('#attori').html("<p>'" + data[film].actors + "'</p>");
                $('#fineDettaglio').html("<input id='tramaOrariGo' type='button' data-role='button'  data-path=" + film + " class='btnOrario' value='Orari' />");
               
               
                $('#orario').on('pagebeforeshow', function () {

                });
                $('.btnOrario').on('click', function () {


                    $.mobile.changePage("#orario", { transition: "flip" });
                    var film = parseInt($(this).attr('data-path'));
                    $('#ulListaOre').html("");
                    $('#imageOrario').html("");
                    $('#imageOrario').append("<img src='" + data[film].posterURL + "' id='imgTrama1' ></img>");
                    $('#imageOrario').append("<img src='" + data[film].posterURL + "' id='imgTrama2' ></img>");
                    $('#imageOrario').append("<img src='" + data[film].posterURL + "' id='imgTrama3' ></img>");

                    film++;
                    $.ajax({
                        url: 'http://46.228.240.137/Cinema/service/screeningsByFilm/' + film + '/',
                        success: function (data) {

                            for (var i = 0; i < data.length; i++) {
                                $('#ulListaOre').append("<li class='ulLiListaOre'><p>" + data[i].day + "</p></li>");

                            }

                            $("#ulListaOre").listview("refresh");


                            $(".ulLiListaOre").on('click', function () {
                                for (var i = 0; i < 20; i++) {
                                    if (i == 10) {
                                        $("#posti").append("<div class='nPosto' style='clear:left;'><img src='img/nop.png' style='margin: 0px; padding: 0px; width: 100%; ' /></div>");

                                    }else
                                    $("#posti").append("<div class='nPosto' style='clear:left;'><img src='img/p.png' style='margin: 0px; padding: 0px; width: 100%; ' /></div>");

                                    for (var j = 0 ; j < 18; j++) {
                                        if (i == 10) {
                                            $("#posti").append("<div class='nPosto'><img src='img/nop.png' style='margin: 0px; padding: 0px; width: 100%; ' /></div>");

                                        } else
                                            if (j == 3 || j == 13) {
                                                $("#posti").append("<div class='nPosto'><img src='img/nop.png' style='margin: 0px; padding: 0px; width: 100%; ' /></div>");

                                            }else
                                    $("#posti").append("<div class='nPosto'><img src='img/p.png' style='margin: 0px; padding: 0px; width: 100%; border-radius:3px; ' /></div>");
                                    }
                                   
                                }
                                $(".nPosto").on('click', function () {
                                    $(this).html("<img src='img/pbook.png' style='margin: 0px; padding: 0px; width: 100%; border-radius:3px; ' />");
                                });
                                $.mobile.changePage("#divPostiCinema", { transition: "flip" });

                            });
                        },
                        error: function (xhr, errorText) {
                            alert('error OK' + JSON.stringify(xhr));
                        }
                    });
            });

          

               

            });
            /*   $(".addToC").on("click", function () {

                   $("#productsCart").append("<p><strong>Nome:</strong>" + $(this).attr("data-nameC") + "<br/><strong>Price:</strong>" +
                                              $(this).attr("data-price") + " </p>");

               });*/
        },
        error: function (xhr, errorText) {
            alert('error OK' + JSON.stringify(xhr));
        }
    });
    setInterval(function () {
        if(ok){
      

             $.mobile.changePage("#menu", { transition: "flip" });
            ok = false;
        } 
        
    }, 10);
   
    //parte registrazione login

    $('#btnRegistrati').on('click', function () {
        var json = new Object();
        if ($('#txtNome').val() == "" || $('#txtCognome').val() == "" || $('#txtIndirizzo').val() == "" || $('#txtUsername').val() == "" || $('#txtPassword').val() == "" || $('#txtCPassword').val() == "" || $('#txtEmail').val() == "" || $('#txtTelefono').val() == "") {
            alert('Inserire tutti i campi');
            return;
        }
        if ($('#txtPassword').val() != $('#txtCPassword').val()) {
            alert('Le password non corrispondono');
            return;
        }
        json.name = $('#txtNome').val();
        json.surname = $('#txtCognome').val();
        json.address = $('#txtIndirizzo').val();
        json.username = $('#txtUsername').val();
        json.password = $('#txtPassword').val();
        json.email = $('#txtEmail').val();
        json.telephone = $('#txtTelefono').val();
        json = JSON.stringify(json);

        $.ajax({
            url: 'http://46.228.240.137/Cinema/service/register/',
            type: 'POST',
            data: json,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                alert('Registrazione effettuata con successo');
                $.mobile.changePage('#menu', { transition: 'flip' });
            },
            error: function (xhr, errorText) {
                alert('error OK' + JSON.stringify(xhr));
            }
        });
    });

    $('#btnLogin').on('click', function () {
        if ($('#txtEmailL').val() == "" || $('#txtPasswordL').val() == "") {
            alert('Inserire tutti i campi');
            return;
        }

        var json = new Object();
        json.email = $('#txtEmailL').val();
        json.password = $('#txtPasswordL').val();
        json = JSON.stringify(json);

        $.ajax({
            url: 'http://46.228.240.137/Cinema/service/emaillogin/',
            type: 'POST',
            data: json,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.result != 'wrong credentials') {
                    alert('Login effettuato con successo');
                    $.mobile.changePage('#menu', { transition: 'flip' });
                } else {
                    alert('Email o password errati');
                }

            },
            error: function (xhr, errorText) {
                alert('error OK' + JSON.stringify(xhr));
            }
        });


    });
   
});