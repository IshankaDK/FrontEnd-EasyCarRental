$("#btnCustomerAdd").click(function () {
   saveCustomer();
});

function saveCustomer() {
    let email = $("#txtEmail").val();
    let address = $("#txtCustomerAddress").val();
    let nicNo = $("#txtCustomerNIC").val();
    let driveLice = $("#txtDriveLicense").val();
    let contact = $("#txtContact").val();
    let pass = $("#txtPassword").val();

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/customer",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            email: email,
            address: address,
            nic: nicNo,
            driveLicense: driveLice,
            contact: contact,
            password: pass
        }),
        success: function (data) {
            console.log(data)
            if (data){
               uploadNIC();
            }
        }
    });
}
function uploadNIC() {
    var fileObject = $("#nic")[0].files[0];//access file object from input field
    var fileName = $("#nic")[0].files[0].name; //get file name
    var data = new FormData(); //setup form data object to send file data
    data.append("nic", fileObject, fileName); //append data
    $.ajax({
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/customer",
        method: 'post',
        async: true,
        processData: false, //stop processing data of request body
        contentType: false, // stop setting content type by jQuery
        data: data,
        success: function () {
            alert("File Uploaded");
        }
    });
}