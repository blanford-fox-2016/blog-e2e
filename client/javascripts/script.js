$(document).ready(function() {
  //NEW DATA ITEM
  $("#submitItem").click(function() {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/article",
      data: {
        title: $('#articleTitle').val(),
        content: $('#articleContent').val(),
        category: $('#articleCategory').val(),
        slug: $('#articleTitle').val().replace(' ', '-').toLowerCase()
      },
      dataType: "json",
      success: function appendnew(data) {
        var newHTML = '';
        newHTML += `<div class="col-sm-6 col-md-4" id="article${data._id}">
          <div class="thumbnail">
            <div class="caption">
              <h3>${data.title}</h3>
              <p><span style='font-weight:bolder;'>Category: </span>${data.category}</p>
              <p class="text-center">
              <button type="button" class="btn btn-primary" role="button"  data-toggle="modal" data-target="#detailmodal${data._id}">
                <i class="glyphicon glyphicon-eye-open"></i> Detail
              </button>
              <button type="button" class="btn btn-danger" role="button"  data-toggle="modal" data-target="#deletemodal${data._id}">
                <i class="glyphicon glyphicon-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade deletemodal" id="deletemodal${data._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Delete Arcticle</h4>
              </div>
              <div class="modal-body">
                Are you sure want to delete this article (${data.title})?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger delt" onclick="deleteItem('${data._id}')">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade detailmodal" id="detailmodal${data._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">${data.title}</h4>
              </div>
              <div class="modal-body">
                <form class = col-md-12 id="detailArticle${data._id}">
                  <div class="form-group">
                    <label class="control-label" for="detArticleTitle">Title : </label>
                    <div id="detArticleTitle${data._id}">${data.title}</div>
                    <label class="control-label" for="detArticleContent">Content : </label>
                    <div id="detArticleContent${data._id}">${data.content}</div>
                    <label class="control-label" for="detArticleCategory">Category : </label>
                    <p id="detArticleCategory${data._id}">${data.category}</p>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <span id="editbtn${data._id}">
                  <button type="button" class="btn btn-success edt" onclick=editItem('${data._id}')>Edit</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        `;
        $( '#inputArticles' ).each(function(){
            this.reset();
        });
        $("#articles").append(newHTML);
      }
    });
  });

  //GET ALL DATA ITEM
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/article",
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded',
    success: function(data) {
      var dataHTML = '';
      for (var i = 0; i < data.length; i++) {
        dataHTML += `<div class="col-sm-6 col-md-4" id="article${data[i]._id}">
          <div class="thumbnail">
            <div class="caption">
              <h3>${data[i].title}</h3>
              <p><span style='font-weight:bolder;'>Category: </span>${data[i].category}</p>
              <p class="text-center">
              <button type="button" class="btn btn-primary" role="button"  data-toggle="modal" data-target="#detailmodal${data[i]._id}">
                <i class="glyphicon glyphicon-eye-open"></i> Detail
              </button>
              <button type="button" class="btn btn-danger" role="button"  data-toggle="modal" data-target="#deletemodal${data[i]._id}">
                <i class="glyphicon glyphicon-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade deletemodal" id="deletemodal${data[i]._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Delete Arcticle</h4>
              </div>
              <div class="modal-body">
                Are you sure want to delete this article (${data[i].title})?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger delt" onclick="deleteItem('${data[i]._id}')">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade detailmodal" id="detailmodal${data[i]._id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">${data[i].title}</h4>
              </div>
              <div class="modal-body">
                <form class = col-md-12 id="detailArticle${data[i]._id}">
                  <div class="form-group">
                    <label class="control-label" for="detArticleTitle">Title : </label>
                    <div id="detArticleTitle${data[i]._id}">${data[i].title}</div>
                    <label class="control-label" for="detArticleContent">Content : </label>
                    <div id="detArticleContent${data[i]._id}">${data[i].content}</div>
                    <label class="control-label" for="detArticleCategory">Category : </label>
                    <p id="detArticleCategory${data[i]._id}">${data[i].category}</p>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <span id="editbtn${data[i]._id}">
                  <button type="button" class="btn btn-success edt" onclick=editItem('${data[i]._id}')>Edit</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        `
      }
      $("#articles").append(dataHTML);
    }
  })

})

function editItem(id) {
  var title = document.getElementById('detArticleTitle'+id).innerHTML;
  var content = document.getElementById('detArticleContent'+id).innerHTML;
  var category = document.getElementById('detArticleCategory'+id).innerHTML;
  document.getElementById('detArticleTitle'+id).innerHTML = `<input class="form-control arcTitle" id="articleTitle${id}" type="text" value="${title}">`;
  document.getElementById('detArticleCategory'+id).innerHTML = `<input class="form-control arcCategory" id="articleCategory${id}" type="text" value="${category}">`;
  document.getElementById('detArticleContent'+id).innerHTML = `<textarea class="form-control arcContent" id="articleContent${id}">${content}</textarea>`;
  document.getElementById('editbtn'+id).innerHTML = `<button type="button" class="btn btn-success edt" onclick="updateItem('${id}')" data-dismiss="modal">Save</button>`;
}

function updateItem(id) {
  $.ajax({
    url: "http://localhost:3000/api/article/"+id,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    data : {
      _id : id,
      title : $('#articleTitle'+id).val(),
      content : $('#articleContent'+id).val(),
      category : $('#articleCategory'+id).val(),
      slug: $('#articleTitle').val().replace(' ', '-').toLowerCase()
    },
    success: function(editedData) {
      console.log(editedData);
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/article/id/"+id,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded',
        success: function(data) {
          console.log(data);
          var newDataArticle = `<div class="col-sm-6 col-md-4" id="item${data._id}">
            <div class="thumbnail">
              <div class="caption">
                <h3>${data.title}</h3>
                <p>${data.category}</p>
                <p class="text-center">
                  <button type="button" class="btn btn-primary" role="button"  data-toggle="modal" data-target="#detailmodal${data._id}">
                    <i class="glyphicon glyphicon-eye-open"></i> Detail
                  </button>
                  <button type="button" class="btn btn-danger" role="button"  data-toggle="modal" data-target="#deletemodal${data._id}">
                    <i class="glyphicon glyphicon-trash"></i> Delete
                  </button>
              </div>
            </div>
          </div>`;

          var newDetailArticle = `
            <form class = col-md-12 id="detailArticle${data._id}">
              <div class="form-group">
                <label class="control-label" for="detArticleTitle">ItemCode : </label>
                <div id="detArticleTitle${data._id}">${data.title}</div>
                <label class="control-label" for="detArticleContent">Content : </label>
                <div id="detArticleContent${data._id}">${data.content}</div>
                <label class="control-label" for="detArticleCategory">Category : </label>
                <p id="detArticleCategory${data._id}">${data.category}</p>
              </div>
            </form>;`

          $(`#article${id}`).replaceWith(newDataArticle);
          $(`#detailArticle${id}`).replaceWith(newDetailArticle);
        }
      })
    }
  })
}


function deleteItem(id) {
  $.ajax({
    url         : 'http://localhost:3000/api/article/'+id,
    type        : 'DELETE',
    dataType    : 'json',
    contentType : 'application/x-www-form-urlencoded',
    success     : function() {
      $(`#article${id}`).remove();
      $(`#detailmodal${id}`).remove();
      $(`#deletemodal${id}`).remove();
      $(`.modal-backdrop.fade.in`).remove();
    }
  })

}
