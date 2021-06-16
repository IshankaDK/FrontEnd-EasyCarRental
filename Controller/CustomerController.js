$("#btnCustomerAdd").click(function () {
   uploadNICAndLicense();
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
                alert("Customer Saved and 2 files uploaded.")
            }
        }
    });
}
function uploadNICAndLicense() {
    var fileObject1 = $("#nic")[0].files[0];//access file object from input field
    var fileName1 = $("#nic")[0].files[0].name; //get file name
    var fileObject2 = $("#license")[0].files[0];
    var fileName2 = $("#license")[0].files[0].name;

    var data = new FormData();
    data.append("nic", fileObject1, fileName1);
    data.append("license", fileObject2, fileName2); //append data
    $.ajax({
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/customer",
        method: 'POST',
        async: true,
        processData: false, //stop processing data of request body
        contentType: false, // stop setting content type by jQuery
        data: data,
        success: function (data) {
            if (data){
                saveCustomer();
            }
        }
    });
}
