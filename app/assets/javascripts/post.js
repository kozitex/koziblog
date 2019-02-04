$(function() {
  // アコーディオン開閉
  $('#new').click(function(){
    $('.inner').slideToggle();
  });

  // 削除
  $('.destroy').on('click', function(e) {
    var delConf = confirm('削除してよろしいですか？');

    if(delConf == true) {
      e.preventDefault();
      var thePost = $(this);
      var postID = thePost.attr('id');

      $.ajax({
        type: 'POST',
        url: '/posts/' + postID,
        data: { 'id': postID, '_method': 'DELETE' }
      })

      .done(function() {
        thePost.parents('div.row').remove();
      })

      .fail(function() {
        alert('エラー');
      });
    } else {
      (function(e) {
        e.preventDefault()
      });
    };
  });

  // 新規投稿
  $('.new_post').on('submit', function(e) {
    e.preventDefault();
    var textField = $('#post_content');
    var post = textField.val();
    var userID = $('.current_user_id').val();

    $.ajax({
      type: 'POST',
      url:  '/posts',
      data: {
        post: {
          'content': post, 'user_id': userID
        }
      }
    })

    .done(function(data) {
      textField.val('');
      $('.inner').slideToggle();
      var postID = data.id;

      console.log(post);

      var strHTML1 = '<span class="black-text"><p>' + post + '</p></span>'
      var strHTML2 = '<ul><li><a id="' + postID + '" class="light-blue darken-3 waves-effect waves-light btn right destroy">削除</a></li><li><a class="light-blue darken-3 waves-effect waves-light btn right" href="/posts/' + postID + '/edit">修正</a></li><li><a class="light-blue darken-3 waves-effect waves-light btn right" href="/posts/' + postID + '">詳細</a></li><div style="height: 40px;"></div></ul>'
      var strHTML3 = $('<div class="card-panel">').append(strHTML1 + strHTML2);
      var strHTML = $('<div class="row">').append($('<div class="col s6 offset-s3">').append(strHTML3));
      $('.posts').prepend(strHTML);
    })

    .fail(function() {
      alert('エラー');
    })

    .always(function() {
      $('.waves-button-input').removeAttr('disabled');
    });
  });
});
