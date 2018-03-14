$(function(){
  function buildHTML(message){
    var html = `<div class="message">
    <div class="message__top">
    <div class="message__top__name">
    ${message.name}
    </div>
    <div class="message__top__date">
    ${message.time}
    </div>
    </div>
    <div class="message__bottom">
    <p class="message__bottom__body">
    ${message.body}
    </p>
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
      $('.messages').append(html)
      $('.form__message').val('')
    })
    .fail(function() {
      alert('error')
    });
  });
});
