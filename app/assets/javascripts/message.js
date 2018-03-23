$(function(){
  function buildHTML(message){
    var Image = '';
    if (message.image){
      Image = `<img class="message_bottom__image" src="${ message.image }">`;
    }
    var html = `<div class="message" data-message-id="${message.id}">
    <div class="message__top">
    <div class="message__top__name">
    ${ message.name }
    </div>
    <div class="message__top__date">
    ${ message.time }
    </div>
    </div>
    <div class="message__bottom">
    <p class="message__bottom__body">
    ${ message.body }
    </p>
    ${ Image }
    </div>
    </div>`
    return html;
  }

  var Intervals = setInterval(autoReload, 5000);
  function autoReload () {
    var current_url = $(location).attr('pathname');
    if (current_url.match(/\/groups\/\d+\/messages/)) {
        var dataId = $('.message:last-child').data('messageId');
      $.ajax({
        url: current_url,
        data: {
          messageId: dataId
        },
        dataType: 'json'
      })
      .done(function(data){
        console.log(data);
        var innerHTML = '';
        data.forEach(function(message) {
            innerHTML += buildHTML(message);
        });
        $('.messages').append(innerHTML);
      })
      .fail(function(data) {
        alert ('エラーが発生しました');
      })
    } else {
      clearInterval(Intervals);
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight}, 1500);
      $('.form__message').val('');
    })
    .fail(function(data) {
      alert ('メッセージを入力してください');
    });
  });
});
