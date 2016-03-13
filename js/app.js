$(function(){

  var $container = $('#app-container').find('.character-marvels');

  function renderResults(result){
    result.forEach(function(resultados){
      var extension = resultados.thumbnail.extension;
      var path = resultados.thumbnail.path;
      var punto = ".";
      var name = resultados.name;
      var description = resultados.description;
      var article = template
      .replace(':name:', name)
      .replace(':img:', path + punto + extension )
      .replace(':img alt:', name)

      var $article = $(article);
      $article.hide();
      $container.append($article.fadeIn(3000));
    })
  }


  /**
  * Submit search form
  */
  $("#app-container")
    .find('form')
    .submit(function(ev){
      ev.preventDefault();
      var busqueda = $(this)
        .find('input[type="text"]')
        .val();
        $container.find('.character-marvel').remove();
        var $loader =  $('<div class="loader">');
        $loader.appendTo($container);
        var apikey = "d18b9ec019b4185b639784f1698c9089";
        var url = "http://gateway.marvel.com:80/v1/public/characters";

        $.ajax({
          data: { name : busqueda , apikey},
          url: url ,
          success: function (res, textStatus, xhr){
            $loader.remove();
            var results = res.data.results.map(function (el) {
              return el;
            })
            renderResults(results);

          }
        })

    });

    var template = '<article class="character-marvel">'+
      '<div class="left">'+
          '<img src=":img:" alt=":img alt:" />'+
      '</div>' +
      '<div class="info">'+
        '<h1>:name:</h1>' +
      '</div>'+
    '</article>';

    $.ajax({
    url: 'http://gateway.marvel.com:80/v1/public/characters?orderBy=name&limit=100&apikey=d18b9ec019b4185b639784f1698c9089',
    success: function (res, textStatus, xhr){
      $('#app-container').find('.loader').remove();

      var result = res.data.results;
      renderResults(result);

    }
    })


});
