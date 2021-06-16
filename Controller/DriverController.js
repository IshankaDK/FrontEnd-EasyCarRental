getAllDrivers();
// Driver Add
$("#btnDriverAdd").click(function () {
    let driverId = $("#txtDriverId").val();
    let driverName = $("#txtDriverName").val();
    let driverAddress = $("#txtDriverAddress").val();
    let driverContact = $("#txtDriverContact").val();
    let driverStatus = $("#cmbDriverStatus :selected").val();

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            driverId:driverId,
            driverName:driverName,
            driverAddress:driverAddress,
            driverContact:driverContact,
            driverStatus:driverStatus
        }),
        success: function (data) {
            console.log(data)
            if (data) {
                alert("Driver Saved!");
                getAllDrivers();

            } else {
                alert("Saving Failed!");
            }
        }
    });
});

// Driver Update
$("#btnDriverUpdate").click(function () {
    let driverId = $("#txtDriverId").val();
    let driverName = $("#txtDriverName").val();
    let driverAddress = $("#txtDriverAddress").val();
    let driverContact = $("#txtDriverContact").val();
    let driverStatus = $("#cmbDriverStatus :selected").val();

    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            driverId:driverId,
            driverName:driverName,
            driverAddress:driverAddress,
            driverContact:driverContact,
            driverStatus:driverStatus
        }),
        success: function (data) {
            console.log(data)
            if (data) {
                alert("Driver Updated!");
                getAllDrivers();

            } else {
                alert("update Failed!");
            }
        }
    });
});

$("#btnDriverDelete").click(function () {
    let driverId = $("#txtDriverId").val();

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            driverId:driverId
        }),
        success: function (data) {
            console.log(data)
            if (data) {
                alert("Driver Deleted!");
                getAllDrivers();

            } else {
                alert("Delete Failed!");
            }
        }
    });
});
loadDriverStatusCombo();
function loadDriverStatusCombo(){
    $('#cmbDriverStatus').children().remove();
    $('#cmbDriverStatus').append("<option>-Select Driver Status-</option>");
    $($('#cmbDriverStatus').children().get(0)).attr('disabled', 'true');
    $('#cmbDriverStatus').append("<option>Available</option>");
    $('#cmbDriverStatus').append("<option>On Hire</option>");
    $('#cmbDriverStatus').append("<option>Not Available</option>");
}

function getAllDrivers() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            loadAllDriversToTable(data);
        }
    });
}

function loadAllDriversToTable(data) {
    let allDrivers = data;
    console.log(allDrivers);
    $("#tblDriver").empty();
    for (var i in allDrivers) {
        let driverId = allDrivers[i].driverId;
        let driverName = allDrivers[i].driverName;
        let driverAddress = allDrivers[i].driverAddress;
        let driverContact = allDrivers[i].driverContact;
        let driverStatus = allDrivers[i].driverStatus;

        var row = `<tr><td>${driverId}</td><td>${driverName}</td><td>${driverAddress}</td><td>${driverContact}</td><td>${driverStatus}</td></tr>`;
        $('#tblDriver').append(row);
    }
}