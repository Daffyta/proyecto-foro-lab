var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

var $newTopics = $("#newTopics");

var cargarTopics = function () {
  $.getJSON(api.url, function (topics) {
    topics.forEach(function (topic) {
      crearTopic(topic);
    });
  });
};

var crearTopic = function(topic){
      var nombre = topic.author_name;
      var contenido = topic.content;
      var id = topic._id;
          
      var $tr = $("<tr />");
      var $nombreTd = $("<td />");
      $nombreTd.text(nombre);
      var $estadoTd = $("<td />");
      $estadoTd.text(contenido);

      $tr.append($nombreTd);
      $tr.append($estadoTd);
      $newTopics.append($tr);
}

$(document).ready(cargarTopics);
