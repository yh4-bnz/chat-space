$(function(){
  function buildHTML(message){
    var Image = '';
    if (message.image){
      Image = `<img class="message_bottom__image" src="${ message.image }">`;
    }
    var html = `<div class="message">
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
