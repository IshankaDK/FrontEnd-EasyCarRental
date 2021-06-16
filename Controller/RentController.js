getAllCars();
loadStaticCombo();

function loadStaticCombo() {
    // Car Type
    $('#cmbCarType').children().remove();
    $('#cmbCarType').append("<option>-Select Type-</option>");
    $($('#cmbCarType').children().get(0)).attr('disabled', 'true');
    $('#cmbCarType').append("<option value='1'>General Car</option>");
    $('#cmbCarType').append("<option value='2'>Premium Car</option>");
    $('#cmbCarType').append("<option value='3'>Luxury Car</option>");

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

function loadBrandCombo(data) {
    $('#cmbBrand').children().remove();
    $('#cmbBrand').append("<option>-Select Car Brand-</option>");
    $($('#cmbBrand').children().get(0)).attr('disabled', 'true');
    let allCars = data;
    for (var i in allCars) {
        let brand = allCars[i].brand;
        $('#cmbBrand').append("<option>" + brand + "</option>");
    }
}

function loadCarIdCombo(data) {
    $('#cmbCarId').children().remove();
    $('#cmbCarId').append("<option>-Select Car Brand-</option>");
    $($('#cmbCarId').children().get(0)).attr('disabled', 'true');
    let allCars = data;
    for (var i in allCars) {
        let id = allCars[i].carId;
        $('#cmbCarId').append("<option>" + id + "</option>");
    }
}

function getAllCars() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            loadAllCarsToTable(data);
            loadBrandCombo(data);
            loadCarIdCombo(data);
        }
    });
}


function loadAllCarsToTable(data) {
    let allCars = data;
    console.log(allCars);
    $("#tblCarInRent").empty();
    for (var i in allCars) {
        let id = allCars[i].carId;
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


        var row = `<tr><td>${id}</td><td>${brand}</td><td>${carType}</td><td>${noOfPassengers}</td><td>${transmissionType}</td><td>${fuelType}</td><td>${color}</td><td>${registrationNumber}</td><td>${dailyRate}</td><td>${monthlyRate}</td><td>${priceForExtraKM}</td><td>${lossDamageWaiver}</td><td>${status}</td><td> <button type="button" class="btn btn-success" id="btnView" style="font-size: 12px">View</button></td></tr>`;
        $('#tblCarInRent').append(row);
    }
}

function CarIdChange() {
    $('#cmbCarId').on('change', function () {
        let carId = $("#cmbCarId :selected").text();
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?id=" + carId,
            contentType: 'application/json',
            async: true,
            success: function (data) {
                if ($('#cmbCarId :selected').text() === data.carId) {
                    $('#txtCarId').val(data.carId);
                    $('#txtNoOfPassenger').val(data.noOfPassengers);
                    $('#txtTransType').val(data.transmissionType);
                    $('#txtFuelType').val(data.fuelType);
                    $('#txtColor').val(data.color);
                    $('#txtLoosDamage').val(data.lossDamageWaiver);
                    $('#txtCostExtraKM').val(data.priceForExtraKM);
                    $('#txtMonthRate').val(data.monthlyRate);
                    $('#txtDayRate').val(data.dailyRate);
                    if ($('#txtMonths').val() >= 1) {
                        $('#txtCost').val((data.monthlyRate * $('#txtMonths').val()) + data.dailyRate * $('#txtDays').val());
                    } else {
                        $('#txtCost').val(data.dailyRate * $('#txtDays').val());
                    }
                }
                console.log(data)
            }
        });
    });
}

CarIdChange();

$("#txtPickupDate").change(function () {
    let date01 = new Date($(this).val());
    console.log(date01)
    $("#txtReturnDate").change(function () {
        let date02 = new Date($(this).val());
        console.log(date02)
        Duration(date02, date01);
    });
});

function Duration(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    let diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
    if (diffDays < 31) {
        $("#txtDays").val(diffDays);
        $("#txtMonths").val(0);
    } else {
        let months = Math.floor(diffDays / 31);
        let days = diffDays % 31;
        $("#txtMonths").val(months);
        $("#txtDays").val(days);
    }
    let carId = $("#cmbCarId :selected").val();
    if (carId != "-Select Car ID-") {
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?id=" + carId,
            contentType: 'application/json',
            async: true,
            success: function (data) {
                if ($('#cmbCarId :selected').val() === data.carId) {
                    if ($('#txtMonths').val() >= 1) {
                        $('#txtCost').val((data.monthlyRate * $('#txtMonths').val()) + data.dailyRate * $('#txtDays').val());
                    } else {
                        $('#txtCost').val(data.dailyRate * $('#txtDays').val());
                    }
                }
            }
        });
    }

}

$('#btnRent').click(function () {
    let rentId = "R001";
    let pickDate = $("#txtPickupDate").val();
    console.log(pickDate);
    let returnDate = $("#txtReturnDate").val();
    console.log(returnDate);
    let duration = $("#txtMonths").val() * 31 + ($('#txtDays').val());
    let monthRate = $("#txtMonthRate").val();
    let dayRate = $("#txtDayRate").val();
    let cost = $("#txtCost").val();
    let extraKM = 0;
    let status = "pending";
    let customerEmail = "abc"; // $("#txtCustomerEmai").val();
    let carId = $("#txtCarId").val();
    let driverId = "driver1";

    let car;
    let customer;

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?id=" + carId,
        contentType: 'application/json',
        async: true,
        success: function (data) {
            console.log(data);
            car = data;
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/EasyCarRental_war_exploded/api/customer?email=" + customerEmail,
                contentType: 'application/json',
                async: true,
                success: function (data) {
                    console.log(data);
                    customer = data;
                    $.ajax({
                        method: "POST",
                        url: "http://localhost:8080/EasyCarRental_war_exploded/api/rentcar",
                        contentType: 'application/json',
                        async: true,
                        data: JSON.stringify({
                            startDate: pickDate,
                            endDate: returnDate,
                            duration: duration,
                            monthRate: monthRate,
                            dayRate: dayRate,
                            cost: cost,
                            extraKM: extraKM,
                            status: status,
                            customerEmail: customer,
                            carId: car,
                            driverId: {
                                "driverId": "driver1",
                                "driverName": "kamal",
                                "driverAddress": "galle",
                                "diverContact": "0777897456",
                                "driverStatus": "avail"
                            }
                        }),
                        success: function (data) {
                            console.log(data)
                            // if (data) {
                            //
                            //     // alert("Rent Saved!");
                            // } else {
                            //     alert("Saving Failed!");
                            // }
                        }
                    });
                }
            });
        }
    });
});


$('#cmbCarType').on('change', function () {
    let carType = $("#cmbCarType :selected").text();
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?type=" + carType,
        contentType: 'application/json',
        async: true,
        success: function (data) {
            console.log(data)
            loadAllCarsToTable(data);
            loadBrandCombo(data);
            loadCarIdCombo(data);
        }
    });
});

$('#cmbBrand').on('change', function () {
    let carBrand = $("#cmbBrand :selected").text();
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?brand=" + carBrand,
        contentType: 'application/json',
        async: true,
        success: function (data) {
            console.log(data)
            loadAllCarsToTable(data);
            loadCarIdCombo(data);
            for (const dataKey in data) {
                if (data[dataKey].carType == "Luxury Car") {
                    $("#cmbCarType").val('3');
                } else if (data[dataKey].carType == "Premium Car") {
                    $("#cmbCarType").val('2');
                } else {
                    $("#cmbCarType").val('1');
                }
            }

        }
    });
});