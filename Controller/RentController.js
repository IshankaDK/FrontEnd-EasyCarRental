getAllCars();
loadCombo();

function loadCombo() {
    // Car Type
    $('#cmbCarType').children().remove();
    $('#cmbCarType').append("<option>-Select Type-</option>");
    $($('#cmbCarType').children().get(0)).attr('disabled', 'true');
    $('#cmbCarType').append("<option>General Car</option>");
    $('#cmbCarType').append("<option>Premium Car</option>");
    $('#cmbCarType').append("<option>Luxury Car</option>");

    // Dropoff Location:
    $('#cmbDropOff').children().remove();
    $('#cmbDropOff').append("<option>-Select Dropoff Location-</option>");
    $($('#cmbDropOff').children().get(0)).attr('disabled', 'true');
    $('#cmbDropOff').append("<option>Easy Car Rental - Panadura</option>");
    $('#cmbDropOff').append("<option>Your Home</option>");
    $('#cmbDropOff').append("<option>Other</option>");

    // Need A Driver:
    $('#cmbDriverNeed').children().remove();
    $('#cmbDriverNeed').append("<option>-Select Driver-</option>");
    $($('#cmbDriverNeed').children().get(0)).attr('disabled', 'true');
    $('#cmbDriverNeed').append("<option>Drive Yourself</option>");
    $('#cmbDriverNeed').append("<option>Driver From Easy Car Rental</option>");


}
function getAllCars() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            loadAllCarsToTable(data);
        }
    });
}


function loadAllCarsToTable(data) {
    let allCars = data;
    console.log(allCars);
    $("#tblCarInRent").empty();
    for (var i in allCars) {
        let brand = allCars[i].brand;
        let carType = allCars[i].carType;
        let noOfPassengers = allCars[i].noOfPassengers;
        let transmissionType = allCars[i].transmissionType;
        let fuelType = allCars[i].fuelType;
        let color = allCars[i].color;
        let registrationNumber = allCars[i].registrationNumber;
        let dailyRate = allCars[i].dailyRate;
        let monthlyRate = allCars[i].monthlyRate;
        let priceForExtraKM = allCars[i].priceForExtraKM;
        let lossDamageWaiver = allCars[i].lossDamageWaiver;
        let status = allCars[i].status;


        var row = `<tr><td>${brand}</td><td>${carType}</td><td>${noOfPassengers}</td><td>${transmissionType}</td><td>${fuelType}</td><td>${color}</td><td>${registrationNumber}</td><td>${dailyRate}</td><td>${monthlyRate}</td><td>${priceForExtraKM}</td><td>${lossDamageWaiver}</td><td>${status}</td><td> <button type="button" class="btn btn-success" id="btnView" style="font-size: 12px">View</button></td></tr>`;
        // console.log(id);
        $('#tblCarInRent').append(row);
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