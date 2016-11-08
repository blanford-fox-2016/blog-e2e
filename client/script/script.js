$(document).ready(function(){
  $('#btn_update').hide()
  submitNew()
  showAll()
})

let submitDeleteButton = (id) => {
  if(confirm('Are you sure want to delete?')){
    $.ajax({
      url         : 'http://localhost:3000/api/articles/'+id,
      type        : 'DELETE',
      dataType    : 'json',
      contentType : 'application/x-www-form-urlencoded',
      success     : (deleted) => {
        console.log(deleted);
        $(`#${deleted._id}`).remove()
      }
    })

  }else{
    return false
  }
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
      url: "http://localhost:3000/api/articles/"+new_edit_data.articleId,
      method: 'PUT',
      contentType: 'application/x-www-form-urlencoded',
      data : new_edit_data,
      success: (new_edited) => {
        let replace_row = `
        <tr id=${new_edited._id}>
        <td>${new_edited.articleId}</td>
        <td>${new_edited.content}</td>
        <td>
          <button type="button" class="btn btn-warning" id="edit" onclick="submitEditButton('${new_edited.articleId}')">Edit</button>
          <button type="button" class="btn btn-danger" id="delete" onclick="submitDeleteButton('${new_edited.articleId}')">Delete</button>
        </td>
        </tr>
        `
        $(`#${new_edited._id}`).replaceWith(replace_row)
        $('#form_new_content')[0].reset()
        $('#btn_update').hide()
        $('#btn_add').prop('disabled', false)
        $('#articleId').prop('disabled', true);
        $('#hidden_id').remove()
      }
    })
  })
}

let submitEditButton = (id) => {
  $.ajax({
    url:  "http://localhost:3000/api/articles/"+id,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
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
    url         : 'http://localhost:3000/api/articles',
    success     : function(all_data){
      console.log(all_data);
      let data_HTML = ''
      for(var i = 0; i < all_data.length; i++){
        data_HTML += `<tr id=${all_data[i]._id}>
        <td>${all_data[i].articleId}</td>
        <td>${all_data[i].content}</td>
        <td>
          <button type="button" class="btn btn-warning" id="edit" onclick="submitEditButton('${all_data[i].articleId}')">Edit</button>
          <button type="button" class="btn btn-danger" id="delete" onclick="submitDeleteButton('${all_data[i].articleId}')">Delete</button>
        </td>
        </tr>`
      }
      $('#body_table').append(data_HTML)
    }
  })
}

function submitNew(){
  $('#btn_add').on('click', function(e){
    e.preventDefault()
    $.post({
      url         : 'http://localhost:3000/api/articles',
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
            <button type="button" class="btn btn-danger" id="delete" onclick="submitDeleteButton('${new_content.articleId}')">Delete</button>
          </td>
        </tr>
        `

        $('#body_table').prepend(appendHTML)
      }
    })
    $('#form_new_content')[0].reset()
  })
}
