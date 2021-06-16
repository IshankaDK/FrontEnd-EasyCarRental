getAllDrivers();
// Car Add
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
                getAllCars();
            } else {
                alert("Saving Failed!");
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

    // // Table click Event
    // $('#tblCar>tr').off('click');
    // $('#tblCar>tr').click(function () {
    //     let carId = $(this).children('td:eq(0)').text();
    //     let brand = $(this).children('td:eq(1)').text();
    //     let carType = $(this).children('td:eq(2)').text();
    //     let transmissionType = $(this).children('td:eq(3)').text();
    //     let fuelType = $(this).children('td:eq(4)').text();
    //     let color = $(this).children('td:eq(5)').text();
    //     let dailyRate = $(this).children('td:eq(6)').text();
    //     let monthlyRate = $(this).children('td:eq(7)').text();
    //     let priceForExtraKM = $(this).children('td:eq(8)').text();
    //     let lossDamageWaiver = $(this).children('td:eq(9)').text();
    //     let status = $(this).children('td:eq(10)').text();
    //
    //     $("#txtCarId").val(carId);
    //     $("#txtBrand").val(brand);
    //     $("#cmbCarType :selected").val(carType);
    // $("#txtCustomerSalary0").val(salary);
    // });
}