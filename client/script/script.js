$(document).ready(function(){
  $('#btn_update').hide()
  submitNew()
  showAll()

  $('#confirm-delete').on('show.bs.modal', function(e) {
      $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

      // $('.debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
  });
})

let submitDeleteButton = (id) => {
  $.ajax({
    url         : 'http://localhost:5000/api/articles/'+id,
    type        : 'DELETE',
    dataType    : 'json',
    contentType : 'application/x-www-form-urlencoded',
    success     : (deleted) => {
      console.log(deleted);
      $(`#${deleted._id}`).remove()
      $('.modal-backdrop.fade.in').hide()
    }
  })
}

function submitUpdateButton(){
  $('#btn_update').on('click', (e) => {
    e.preventDefault()
    let new_edit_data = {
      _id : $('#id').val(),
      articleId : $('#articleId').val(),
      content : $('#content').val()
    }

    $.ajax({
      url: "http://localhost:5000/api/articles/"+new_edit_data.articleId,
      method: 'PUT',
      data : new_edit_data,
      success: (new_edited) => {
        let replace_row = `
        <tr id=${new_edited._id}>
        <td>${new_edited.articleId}</td>
        <td>${new_edited.content}</td>
        <td>
          <button type="button" class="btn btn-warning" id="edit" onclick="submitEditButton('${new_edited.articleId}')">Edit</button>
          <button type="button" class="btn btn-danger" id="delete" data-toggle="modal" data-target="#confirm-delete">Delete</button>
          <div class="modal fade" class="delete_modal" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                          <h4 class="modal-title" id="myModalLabel">Confirm Delete</h4>
                      </div>
                      <div class="modal-body">
                          <p>Are you sure want to delete?</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                          <a class="btn btn-danger btn-ok" id="btn_confirm_delete" onclick="submitDeleteButton('${new_edited.articleId}')">Delete</a>
                      </div>
                  </div>
              </div>
          </div>
        </td>
        </tr>
        `
        $(`#${new_edited._id}`).replaceWith(replace_row)
        $('#form_new_content')[0].reset()
        $('#btn_update').hide()
        $('#btn_add').prop('disabled', false)
        $('#articleId').prop('disabled', false);
        $('#hidden_id').remove()
      }
    })
  })
}

let submitEditButton = (id) => {
  $.ajax({
    url:  "http://localhost:5000/api/articles/"+id,
    method: 'PUT',
    success: (edited) => {
      console.log(edited);
      $('#articleId').val(edited.articleId).prop('disabled', true);
      $('#content').val(edited.content)

      let hidden_id = `
      <tr id="hidden_id">
        <td>
          <input type="hidden" id="id" value="${edited._id}">
        </td>
      </tr>`

      $('#form_new_content').append(hidden_id)

      submitUpdateButton()

      $('#btn_add').prop('disabled', true)
      $('#btn_update').show()
    }
  })
}

function showAll(){
  $.ajax({
    url         : 'http://localhost:5000/api/articles',
    success     : function(all_data){
      console.log(all_data);
      let data_HTML = ''
      for(var i = 0; i < all_data.length; i++){
        data_HTML += `<tr id=${all_data[i]._id}>
        <td>${all_data[i].articleId}</td>
        <td>${all_data[i].content}</td>
        <td>
          <button type="button" class="btn btn-warning" id="edit" onclick="submitEditButton('${all_data[i].articleId}')">Edit</button>
          <button type="button" class="btn btn-danger" id="delete" data-toggle="modal" data-target="#confirm-delete">Delete</button>
          <div class="modal fade" class="delete_modal" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                          <h4 class="modal-title" id="myModalLabel">Confirm Delete</h4>
                      </div>
                      <div class="modal-body">
                          <p>Are you sure want to delete?</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                          <a class="btn btn-danger btn-ok" id="btn_confirm_delete" onclick="submitDeleteButton('${all_data[i].articleId}')">Delete</a>
                      </div>
                  </div>
              </div>
          </div>
        </td>
        </tr>
        `
      }
      $('#body_table').append(data_HTML)
    }
  })
}

function submitNew(){
  $('#btn_add').on('click', function(e){
    e.preventDefault()
    $.post({
      url         : 'http://localhost:5000/api/articles',
      data        : {
        articleId : $('#articleId').val(),
        content : $('#content').val()
      },
      success      : function(new_content){
        console.log(new_content);
        let appendHTML = `
        <tr id=${new_content._id}>
          <td>${new_content.articleId}</td>
          <td>${new_content.content}</td>
          <td>
            <button type="button" class="btn btn-warning" id="edit" onclick="submitEditButton('${new_content.articleId}')">Edit</button>
            <button type="button" class="btn btn-danger" id="delete" data-toggle="modal" data-target="#confirm-delete">Delete</button>
            <div class="modal fade" class="delete_modal" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">Confirm Delete</h4>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure want to delete?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                            <a class="btn btn-danger btn-ok" id="btn_confirm_delete" onclick="submitDeleteButton('${new_content.articleId}')">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
          </td>
        </tr>
        `

        $('#body_table').prepend(appendHTML)
      }
    })
    $('#form_new_content')[0].reset()
  })
}
