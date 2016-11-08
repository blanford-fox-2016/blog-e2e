$(document).ready(function () {
    var rowOfUser = $('#rowOfUser')
    $.ajax({
        url: "http://localhost:3000/api/user",
        success: function (data) {
            $.extend({}, data)
            var customers = []
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].userId)
                customers.push(`<tr id="rowUser${data[i].userId}">
                                        <td>${data[i].name}</td>
                                        <td>${data[i].username}</td>
                                        <td>${data[i].email}</td>
                                        <td>
                                            <span>
                                                <button id="update${data[i].userId}" class="btn btn-warning update" onclick="editUser('${data[i].userId}')">Edit</button>
                                                <button id="delete${data[i].userId}" class="btn btn-danger delete" onclick="deleteUser('${data[i].userId}')">Delete</button>
                                            </span>
                                        </td>
                                     </tr>`)
            }
            rowOfUser.append(customers.join(""))
        }
    })
})

//SEARCH

$(document).on('click', 'button[id="searchButton"]', function(e) {
    e.preventDefault()
    var search = $("input[name='search']").val()
    searchFromAPI(search)
})

function searchFromAPI(search) {
    $.ajax({
        url: `http://localhost:3000/api/user/search`,
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            search: search
        },
        success: function (search) {
            updateSearch(search)
        }
    })
}

function updateSearch(search) {
    var html = `<tbody id="rowOfUser">
                 <tr id="rowUser${search.userId}">
                    <td>${search.name}</td>
                    <td>${search.username}</td>
                    <td>${search.email}</td>
                    <td>
                        <span>
                            <button id="update${search.userId}" class="btn btn-warning update" onclick="editUser('${search.userId}')">Edit</button>
                            <button id="delete${search.userId}" class="btn btn-danger delete" onclick="deleteUser('${search.userId}')">Delete</button>
                        </span>
                    </td>
                 </tr>
                </tbody>  
               `
    $("tbody:last").replaceWith(html)
    $("input[name='search']").val("")
}

//CREATE USER
$(document).on('click', 'button[id="createUser"]', function(e) {
    console.log("FIRED!!!!")
    e.preventDefault()
    var userId = $("input[name='userId']").val()
    var name = $("input[name='name']").val()
    var username = $("input[name='username']").val()
    var password = $("input[name='password']").val()
    var email = $("input[name='email']").val()
    addUserFromAPI(userId, name, username, password, email)
})

function addUserFromAPI(userId, name, username, password, email) {
    $.ajax({
        url: "http://localhost:3000/api/register",
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            userId: userId,
            name: name,
            username: username,
            password: password,
            email: email
        },
        success: function (user) {
            updateCreateUser(user)
        }
    })
}

function updateCreateUser(user) {
    console.log(user)
    var html = `<tr id="rowUser${user.userId}">
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <span>
                            <button id="update${user._id}" class="btn btn-warning update" onclick="editUser('${user.userId}')">Edit</button>
                            <button id="delete${user._id}" class="btn btn-danger delete" onclick="deleteUser('${user.userId}')">Delete</button>
                        </span>
                    </td>
                 </tr>`
    $("tbody:last").append(html)
    $("input[name='userId']").val("")
    $("input[name='name']").val("")
    $("input[name='username']").val("")
    $("input[name='password']").val("")
    $("input[name='email']").val("")
}

//DELETE USER
function deleteUser(id) {
        deleteUserFromAPI(id)
    // var del = confirm("Are you sure you want to delete this user?")
    // if (del) {
    //     deleteUserFromAPI(id)
    // }
}
function deleteUserFromAPI(userId) {
    var temp = userId
    $.ajax({
        url: `http://localhost:3000/api/user/delete/${userId}`,
        method: "delete",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            userId: userId
        },
        success: function () {
            updateDeleteUser(temp)
        }
    })
}
function updateDeleteUser(id) {
    console.log(id)
    $("tbody").find(`#rowUser${id}`).remove()
}


//UDPATE USER
function editUser(userId) {
    getUserFromAPI(userId)
}
function getUserFromAPI(userId) {
    $.ajax({
        url: `http://localhost:3000/api/user/${userId}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            userId: userId
        },
        success: function (userId) {
            getUser(userId)
        }
    })
}
function getUser(user) {
    var name = `input[name=name]`
    var username = `input[name=username]`
    var email = `input[name=email]`
    $("form").find(name).val(user.name)
    $("form").find(username).val(user.username)
    $("form").find(email).val(user.email)
    $("form").find("button[id=createUser]").replaceWith(`<button type='submit' id='updateUser' class='btn btn-default'>Update</button>`)
    var temp = $("input[name='userId']").val()
    if ( typeof temp != "undefined") {
        $("input[name='userId']").replaceWith(`<input type='hidden' class='form-control' name='userId' value='${user.userId}'>`)
    }
    else {
        $(".form-group:first").append(`<input type='hidden' class='form-control' name='userId' value='${user.userId}'>`)
    }
}
$(document).on('click', 'button[id="updateUser"]', function(e) {
    e.preventDefault()
    updateUserFromAPI(
        $("input[name='userId']").val(),
        $("input[name='name']").val(),
        $("input[name='username']").val(),
        $("input[name='email']").val()
    )
});
function updateUserFromAPI(userId, name, username, email) {
    $.ajax({
        url: `http://localhost:3000/api/user/update/${userId}`,
        method: "put",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            userId: userId,
            name: name,
            username: username,
            email: email
        },
        success: function (user) {
            updateUpdateUser(user)
        }
    })
}
function updateUpdateUser(user) {
    console.log(user)
    var html = `<tr id="rowUser${user.userId}">
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <span>
                            <button id="update${user.userId}" class="btn btn-warning update" onclick="editUser('${user.userId}')">Edit</button>
                            <button id="delete${user.userId}" class="btn btn-danger delete" onclick="deleteUser('${user.userId}')">Delete</button>
                        </span>
                    </td>
                 </tr>`
    $("tbody").find(`#rowUser${user.userId}`).replaceWith(html)
    $("form").find("button[name=updateCustomer]").replaceWith("<button type='submit' id='createUser' class='btn btn-default'>Submit</button>")
    $("input[name='name']").val("")
    $("input[name='username']").val("")
    $("input[name='email']").val("")
}