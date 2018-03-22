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

  var IntervalTime = 5000;
  setInterval(autoReload, IntervalTime);
  function autoReload () {
    var current_url = $(location).attr('href');
    $.ajax({
      url: current_url,
      dataType: 'json'
    })
  .done(function(data){
    var dataId = $('.message').data('messageId');
    var innerHTML = '';
    data.forEach(function(message) {
      if (message.id + 1 > dataId){
        innerHTML += buildHTML(message);
      }
    });
    $('.messages').prepend(innerHTML);
  })
  .fail(function(data) {
    alert ('エラーが発生しました');
  })
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
      alert ('メッセージを入力してください')
    });
  });
});
