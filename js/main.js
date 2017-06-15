var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $newTopics = $("#newTopics");

var cargarPagina = function () {
  cargarTopics();
  $("#add-form").submit(agregarTopic);
};

var cargarTopics = function () {
  $.getJSON(api.url, function (topics) {
    topics.forEach(function (topic){
      crearTopic(topic);
    });
  });
};

// Visualizando los topics de mis compañeras
var crearTopic = function(topic){
      var nombre = topic.author_name;
      var contenido = topic.content;

      var $tr = $("<tr />");
      var $nombreTd = $("<td />");
      $nombreTd.text(nombre);
      var $contenidoTd = $("<td />");
      $contenidoTd.text(contenido);

      $tr.append($nombreTd);
      $tr.append($contenidoTd);
      $newTopics.append($tr);
};

// Agregando topics
var agregarTopic = function (e){
  e.preventDefault();
  var nombre = $("#nombre-autor").val();
  var mensaje = $("#mensaje").val();
  $.post(api.url, {
    author_name: nombre,
    content: mensaje,
  }, function (topic){
    crearTopic(topic);
    $("#myModal").modal("hide");
  });
};

// Intento de Filtrado
$( "#searchForm" ).submit( function(e) {
  e.preventDefault();
  var $form = $(this),
    term = $form.find("#sercher").val(),
    url = $form.attr("#action");
  var posting =
    $.post( api.url, { sercher: term } );
    posting.done(function( data ) {
    var content = $(data).find( "#content" );
    $( "#result" ).empty().append( content );
  });
});

$(document).ready(cargarPagina);
