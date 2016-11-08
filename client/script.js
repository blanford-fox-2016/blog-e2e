$(document).ready(function () {
    var rowOfUser = $('#rowOfUser')
    $.ajax({
        url: "http://localhost:3000/api/user",
        success: function (data) {
            console.log(data)
            $.extend({}, data)
            var customers = []
            for (var i = 0; i < data.length; i++) {
                customers.push(`<tr id="rowUser${data[i]._id}">
                                        <td>${data[i].name}</td>
                                        <td>${data[i].username}</td>
                                        <td>${data[i].email}</td>
                                        <td>
                                            <span>
                                                <button id="buttonEditUser${data[i]._id}" class="btn btn-warning" onclick="">Edit</button>
                                                <button id="buttonDeleteUser${data[i]._id}" class="btn btn-danger" onclick="">Delete</button>
                                            </span>
                                        </td>
                                     </tr>`)
            }
            rowOfUser.append(customers.join(""))
        }
    })
})