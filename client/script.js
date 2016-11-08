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
                                                <button id="buttonEditUser${data[i]._id}" class="btn btn-warning" onclick="">Edit</button>
                                                <button id="buttonDeleteUser${data[i]._id}" class="btn btn-danger" onclick="${data[i].userId}">Delete</button>
                                            </span>
                                        </td>
                                     </tr>`)
            }
            rowOfUser.append(customers.join(""))
        }
    })
})

$(document).on('click', 'button[name="createUser"]', function(e) {
    console.log("FIRED!!!!")
    e.preventDefault()
    var name = $("input[name='name']").val()
    var username = $("input[name='username']").val()
    var password = $("input[name='password']").val()
    var email = $("input[name='email']").val()
    addUserFromAPI(name, username, password, email)
    return false
})

function addUserFromAPI(name, username, password, email) {
    $.ajax({
        url: "http://localhost:3000/api/register",
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            userId: 10,
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
                            <button id="buttonEditUser${user._id}" class="btn btn-warning" onclick="">Edit</button>
                            <button id="buttonDeleteUser${user._id}" class="btn btn-danger" onclick="deleteUser(${user.userId})">Delete</button>
                        </span>
                    </td>
                 </tr>`
    $("tbody:last").find(`#rowOfUser`).append(html)
    $("input[name='userId']").val("")
    $("input[name='name']").val("")
    $("input[name='username']").val("")
    $("input[name='password']").val("")
    $("input[name='email']").val("")
}

//DELETE USER
function deleteUser(id) {
    console.log(id)
    var del = confirm("Are you sure you want to delete this user?")
    if (del) {
        deleteUserFromAPI(id)
    }
}
function deleteUserFromAPI(id) {
    var temp = id
    $.ajax({
        url: `http://localhost:3000/api/customer/delete/${id}`,
        method: "delete",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id
        },
        success: function () {
            updateDeleteUser(temp)
        }
    })
}
function updateDeleteUser(id) {
    console.log(id)
    $("tbody").find(`#rowCustomer${id}`).remove()
}
