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

function createCustomer(e) {
    console.log("FIRED!!!!")
    e.preventDefault()
    var name = $("input[name='name']").val()
    var username = $("input[name='username']").val()
    var password = $("input[name='password']").val()
    var email = $("input[name='email']").val()
    addCustomerFromAPI(name, memberId, address, zip, phone)
}

function addCustomerFromAPI(name, memberId, address, zip, phone) {
    $.ajax({
        url: "http://localhost:3000/api/customer/create",
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            name: name,
            memberId: memberId,
            address: address,
            zip: zip,
            phone: phone
        },
        success: function (customer) {
            updateCreateCustomer(customer.customer)
        }
    })
}