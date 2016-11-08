function loadArticle() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/article');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            html = `<table class='table table-hover'>
                <thead>
                    <tr>
                        <td>Article Title
                        </td>
                        <td>Article Content
                        </td>
                    </tr>
                </thead>
                <tbody>`
            for (var i = 0; i < data.length; i++) {
                html += `<tr id="rowItem${data[i]._id}">
                    <td>${data[i].title}</td>
                    <td>${data[i].content}</td>
                    <td><span>
                            <button id="buttonEditArticle" class="btn btn-warning" onclick="formEditArticle('${data[i].id}')">Edit</button>
                            <button id="buttonDeleteArticle" class="btn btn-danger" onclick="deleteArticle('${data[i].id}')">Delete</button>
                        </span></td>
                </tr>`
            }
            html += `</tbody>
            </table>
            <div class="page-header">
                <h2>Add or Manage Article</h2>
            </div>
            <div class='container'>
                <form id='itemForm'>
                    <div class="form-group">
                        <label for="itemCode_new">Article Title</label>
                        <input type="text" class="form-control" id="input_title" placeholder="Item Code" name='itemCode' required>
                    </div>
                    <div class="form-group">
                        <label for="name_new">Article Content</label>
                        <input type="text" class="form-control" id="input_content" placeholder="Item Name" name='name' required>
                    </div>
                    <div id='button-replace-item'>
                        <button id='addArticleButton' type="submit" class="btn btn-primary" onclick='addArticle()'>Submit</button></div>
                </form>
            </div>`
            document.getElementById('articlepanel').className = "active"

            document.getElementById('main-container').innerHTML = html
        } else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

function addArticle() {
    let article_title = document.getElementById('input_title').value
    let article_content = document.getElementById('input_content').value

    if (article_title != "" && article_content != "") {
        // var query = "status="+document.getElementById('exampleTextarea').value
        var query = `title=${article_title}&content=${article_content}`
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/article', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.onreadystatechange = function() {
            loadArticle()
        };
        xhr.send(query);
    } else {
        alert('Please Fill All Fields')
    }

}

function formEditArticle(parameter) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/api/article/${parameter}`);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            document.getElementById('input_title').value = data[0].title
            document.getElementById('input_content').value = data[0].content
            $("#button-replace-item").html(`<button type='submit' class='btn btn-warning' onclick=putItem('${data[0].id}')>Update</button>`)
        } else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

}

function putItem(parameter) {
    let article_title = document.getElementById('input_title').value
    let article_content = document.getElementById('input_content').value
    let item_desc = document.getElementById('input_description').value
    let item_price = document.getElementById('input_price').value
    let item_stock = document.getElementById('input_stock').value
    if (article_title != "" && article_content != "" && item_desc != "" && item_price != "" && item_stock != "") {
        $.ajax({
            url: `http://localhost:3000/api/item/${parameter}`,
            method: "put",
            contentType: 'application/x-www-form-urlencoded',
            data: {
                id: parameter,
                itemCode: article_title,
                name: article_content,
                description: item_desc,
                price: item_price,
                stock: item_stock
            },
            success: function(data) {
                alert('Updated Successfully')
                loadTableItem()
            }
        })
    } else {
        alert('Please Fill All Fields')
    }
}

function deleteItem(parameter) {
    var del = confirm("Are you sure want to delete this item?")
    if (del) {
        $.ajax({
            url: `http://localhost:3000/api/item/${parameter}`,
            method: "delete",
            contentType: 'application/x-www-form-urlencoded',
            data: {
                id: parameter
            },
            success: function() {
                alert('Deleted Successfully')
                loadTableItem()
            }
        })
    }

}
