$(function(){

  var $container = $('#app-container').find('.character-marvels');
  var $modal = $('#exampleModal').find('.modal-content');


  function renderResults(result){
    result.forEach(function(resultados){
      var extension = resultados.thumbnail.extension;
      var path = resultados.thumbnail.path;
      var punto = ".";
      var name = resultados.name;
      var id = resultados.id;
      var description = resultados.description;

      var article = template

      .replace(':id:', id)
      .replace(':name:', (name.length < 30) ? name : name.substring(0,30) + '...')
      .replace(':img:', path ? path + punto + extension : '' )
      .replace(':img alt:', name)

      var $article = $(article);
      $article.hide();
      $container.append($article.fadeIn(3000));


    })
  }


  /**
  * Submit search form
  */
  $("#app-header")
    .find('form')
    .submit(function(ev){
      ev.preventDefault();
      var busqueda = $(this)
        .find('input[type="text"]')
        .val();
        if ($('input[type="text"]').val().length < 1) {
          return $('input[type="text"]').focus();
        }
        $container.find('.character-marvel').remove();
        var $loader =  $('<div class="loader">');
        var $search = $('.search');
        $search.attr('disabled', true);
        $loader.appendTo($container);
        var apikey = "d18b9ec019b4185b639784f1698c9089";
        var url = "http://gateway.marvel.com:80/v1/public/characters";
        var limit = 100;
        $.ajax({
          data: { nameStartsWith : busqueda , limit , apikey},
          url: url ,
          success: function (res, textStatus, xhr){
            $loader.remove();
            $search.attr('disabled', false);
            var results = res.data.results.map(function (el) {
            return el;
            })
            renderResults(results);

          }
        }).fail(function() {
          $loader.remove();
          $search.attr('disabled', false);
        })

    });

    var template = '<article class="character-marvel  col-md-3 col-sm-6">'+
      '<button class="button-description" data-whatever=":id:" data-toggle="modal" data-target=".bs-example-modal-lg"><div class="left col-md-12">'+
          '<img src=":img:" class="col-md-12" alt=":img alt:" />'+
      '</div>' +
      '<div class="info col-md-12">'+
        '<h1>:name:</h1>' +
      '</div>'+
      '</button>'+
    '</article>';

    if (!localStorage.results) {
      $.ajax('http://gateway.marvel.com:80/v1/public/characters?orderBy=name&limit=100&apikey=d18b9ec019b4185b639784f1698c9089')
        .then(function (res){
        $('#app-container').find('.loader').remove();
        var result = res.data.results;
        localStorage.result = JSON.stringify(result);
        renderResults(result);
      })
    }else{
      renderResults(JSON.parse(localStorage.result));
    }

    $('#exampleModal').on('show.bs.modal', function (event) {

    })

    var ourDescription = '<div class="modal-header">'+
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
      '<h4 class="modal-title" id="gridSystemModalLabel">:name:</h4>'+
    '</div>'+
    '<div class="modal-body">'+
      '<div class="row description-character-marvel">'+
        '<div class="col-md-4 ">'+
          '<img src=":img:" alt="" />'+
        '</div>'+
        '<div class=" description-character-marvel-p col-md-8">'+
          '<p>:description:</p>'+
        '</div>'+
      '</div>'+
  '</div>';

  $('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var recipient = button.data('whatever')

  var apikey = "d18b9ec019b4185b639784f1698c9089";
  var url = "http://gateway.marvel.com:80/v1/public/characters/";
  $modal.find('.modal-body').remove();
  $modal.find('.modal-header').remove();
  $.ajax({
    data: { apikey },
    url: url + recipient ,
    success: function (res, textStatus, xhr){
      var results = res.data.results.map(function (el) {
        return el ;

      })

      renderDescription(results);
      }
    })
  });

  function renderDescription(result){
    result.forEach(function(resultados){
      var extension = resultados.thumbnail.extension;
      var path = resultados.thumbnail.path;
      var punto = ".";
      var name = resultados.name;
      var id = resultados.id;
      var description = resultados.description;

      var arti = ourDescription
      .replace(':name:', (name.length < 30) ? name : name.substring(0,30) + '...')
      .replace(':description:', description ? description : 'without description')
      .replace(':img:', path ? path + punto + extension : '' )
      var $arti = $(arti);
      $arti.hide();
      $modal.append($arti.fadeIn(3000));


    })
  }

});
