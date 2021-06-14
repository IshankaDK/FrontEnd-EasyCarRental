getAllCars();

// Car Add
$("#btnCarAdd").click(function () {
    let carId = $("#txtCarId").val();
    let carBrand = $("#txtBrand").val();
    let carType = $("#cmbCarType :selected").val();
    let noOfPassenger = $("#cmbNoOfPassenger :selected").val();
    let transType = $("#cmbTransmissionType :selected").val();
    let fuelType = $("#cmbFuelType :selected").val();
    let color = $("#txtColor").val();
    let regNo = $("#txtRegNo").val();
    let dayRate = $("#txtDailyRate").val();
    let freeForDay = $("#lbnFreeForDay").text();
    let monthRate = $("#txtMonthlyRate").val();
    let freeForMonth = $("#lblFreeForMonth").text();
    let forExtraCost = $("#txtCostForExtraKM").val();
    let lossDamage = $("#cmbLossDamage :selected").val();
    let carStatus = $("#cmbCarStatus :selected").val();

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            carId: carId,
            brand: carBrand,
            carType: carType,
            noOfPassengers: noOfPassenger,
            transmissionType: transType,
            fuelType: fuelType,
            color: color,
            registrationNumber: regNo,
            dailyRate: dayRate,
            freeMileageForADay: freeForDay,
            monthlyRate: monthRate,
            freeMileageForAMonth: freeForMonth,
            priceForExtraKM: forExtraCost,
            lossDamageWaiver: lossDamage,
            status: carStatus
        }),
        success: function (data) {
            console.log(data)
            if (data) {
                alert("Car Saved!");
                getAllCars();
            } else {
                alert("Saving Failed!");
            }
        }
    });
});

// Car Update
$("#btnCarUpdate").click(function () {
    let carId = $("#txtCarId").val();
    let carBrand = $("#txtBrand").val();
    let carType = $("#cmbCarType :selected").val();
    let noOfPassenger = $("#cmbNoOfPassenger :selected").val();
    let transType = $("#cmbTransmissionType :selected").val();
    let fuelType = $("#cmbFuelType :selected").val();
    let color = $("#txtColor").val();
    let regNo = $("#txtRegNo").val();
    let dayRate = $("#txtDailyRate").val();
    let freeForDay = $("#lbnFreeForDay").text();
    let monthRate = $("#txtMonthlyRate").val();
    let freeForMonth = $("#lblFreeForMonth").text();
    let forExtraCost = $("#txtCostForExtraKM").val();
    let lossDamage = $("#cmbLossDamage :selected").val();
    let carStatus = $("#cmbCarStatus :selected").val();

    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            carId: carId,
            brand: carBrand,
            carType: carType,
            noOfPassengers: noOfPassenger,
            transmissionType: transType,
            fuelType: fuelType,
            color: color,
            registrationNumber: regNo,
            dailyRate: dayRate,
            freeMileageForADay: freeForDay,
            monthlyRate: monthRate,
            freeMileageForAMonth: freeForMonth,
            priceForExtraKM: forExtraCost,
            lossDamageWaiver: lossDamage,
            status: carStatus
        }),
        success: function (data) {
            console.log(data)
            if (data) {
                alert("Car Updated!");
                getAllCars();
            } else {
                alert("Update Failed!");
            }
        }
    });
});

//Delete Car
$("#btnCarDelete").click(function () {
    let carId = $("#txtCarId").val();
    let option = confirm(`Do you want to Delete Car ID:${carId}`);
    if (option) {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
            contentType: 'application/json',
            async: true,
            data: JSON.stringify({
                carId: carId
            }),
            success: function (data) {
                console.log(data);
                if (data) {
                    alert("Car Deleted!");
                    getAllCars();
                } else {
                    alert("Delete Failed!");
                }
            }
        });
    }
});

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
    $("#tblCar").empty();
    for (var i in allCars) {
        let carId = allCars[i].carId;
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


        var row = `<tr><td>${carId}</td><td>${brand}</td><td>${carType}</td><td>${noOfPassengers}</td><td>${transmissionType}</td><td>${fuelType}</td><td>${color}</td><td>${registrationNumber}</td><td>${dailyRate}</td><td>${monthlyRate}</td><td>${priceForExtraKM}</td><td>${lossDamageWaiver}</td><td>${status}</td></tr>`;
        // console.log(id);
        $('#tblCar').append(row);
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
loadComboBoxes();
function loadComboBoxes() {
    // Car Type
    $('#cmbCarType').children().remove();
    $('#cmbCarType').append("<option>-Select Type-</option>");
    $($('#cmbCarType').children().get(0)).attr('disabled', 'true');
    $('#cmbCarType').append("<option>General Car</option>");
    $('#cmbCarType').append("<option>Premium Car</option>");
    $('#cmbCarType').append("<option>Luxury Car</option>");

    // No Of Passengers
    $('#cmbNoOfPassenger').children().remove();
    $('#cmbNoOfPassenger').append("<option>-Select No Of Passengers-</option>");
    $($('#cmbNoOfPassenger').children().get(0)).attr('disabled', 'true');
    $('#cmbNoOfPassenger').append("<option>2</option>");
    $('#cmbNoOfPassenger').append("<option>4</option>");
    $('#cmbNoOfPassenger').append("<option>5</option>");

    // Transmission Type
    $('#cmbTransmissionType').children().remove();
    $('#cmbTransmissionType').append("<option>-Select Transmission Type-</option>");
    $($('#cmbTransmissionType').children().get(0)).attr('disabled', 'true');
    $('#cmbTransmissionType').append("<option>Auto</option>");
    $('#cmbTransmissionType').append("<option>Manual</option>");

    // Fuel Type
    $('#cmbFuelType').children().remove();
    $('#cmbFuelType').append("<option>-Select Fuel Type-</option>");
    $($('#cmbFuelType').children().get(0)).attr('disabled', 'true');
    $('#cmbFuelType').append("<option>Petrol</option>");
    $('#cmbFuelType').append("<option>Diesel</option>");

    // Loss Damage Waiver
    $('#cmbLossDamage').children().remove();
    $('#cmbLossDamage').append("<option>-Select Loss Damage Waiver-</option>");
    $($('#cmbLossDamage').children().get(0)).attr('disabled', 'true');
    $('#cmbLossDamage').append("<option>10000.00</option>");
    $('#cmbLossDamage').append("<option>15000.00</option>");
    $('#cmbLossDamage').append("<option>20000.00</option>");

    // Loss Damage Waiver
    $('#cmbCarStatus').children().remove();
    $('#cmbCarStatus').append("<option>-Select Car Status-</option>");
    $($('#cmbCarStatus').children().get(0)).attr('disabled', 'true');
    $('#cmbCarStatus').append("<option>Available</option>");
    $('#cmbCarStatus').append("<option>Damaged</option>");
    $('#cmbCarStatus').append("<option>In Maintenance</option>");
    $('#cmbCarStatus').append("<option>On Hire</option>");
}