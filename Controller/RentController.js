getAllCars();

function loadCombo(data) {
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

    let allCars = data;
    for (var i in allCars) {
        let id = allCars[i].carId;
        let brand = allCars[i].brand;
        $('#cmbBrand').append("<option>" + brand + "</option>");
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
            loadCombo(data);
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


function CarIdChange(){
    $('#cmbCarId').on('change', function () {
        let carId = $("#cmbCarId :selected").val();
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?id=" + carId,
            contentType: 'application/json',
            async: true,
            success: function (data) {
                if ($('#cmbCarId :selected').val() === data.carId) {
                    $('#txtCarId').val(data.carId);
                    $('#txtNoOfPassenger').val(data.noOfPassengers);
                    $('#txtTransType').val(data.transmissionType);
                    $('#txtFuelType').val(data.fuelType);
                    $('#txtColor').val(data.color);
                    $('#txtLoosDamage').val(data.lossDamageWaiver);
                    $('#txtCostExtraKM').val(data.priceForExtraKM);
                    if ($('#txtMonths').val() >= 1 ){
                        $('#txtRate').val(data.monthlyRate+"/"+data.dailyRate);
                        $('#txtCost').val((data.monthlyRate * $('#txtMonths').val()) + data.dailyRate * $('#txtDays').val());
                    }else {
                        $('#txtRate').val(data.dailyRate);
                        $('#txtCost').val(data.dailyRate * $('#txtDays').val());
                    }
                }
                console.log(data)
            }
        });
    });
}

$("#txtPickupDate").change(function () {
    let date01 = new Date($(this).val());
    console.log(date01)
    $("#txtReturnDate").change(function () {
        let date02 = new Date($(this).val());
        console.log(date02)
        CarIdChange();
        Duration(date02,date01);
    });
});

function Duration(date1,date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    let diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
   if (diffDays<31){
       $("#txtDays").val(diffDays);
       $("#txtMonths").val(0);
   }else {
       let months = Math.floor( diffDays/31 );
       let days = diffDays%31;
       $("#txtMonths").val(months);
       $("#txtDays").val(days);
   }
    let carId = $("#cmbCarId :selected").val();
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?id=" + carId,
        contentType: 'application/json',
        async: true,
        success: function (data) {
            if ($('#cmbCarId :selected').val() === data.carId) {
                if ($('#txtMonths').val() >= 1 ){
                    $('#txtRate').val(data.monthlyRate+"/"+data.dailyRate);
                    $('#txtCost').val((data.monthlyRate * $('#txtMonths').val()) + data.dailyRate * $('#txtDays').val());
                }else {
                    $('#txtRate').val(data.dailyRate);
                    $('#txtCost').val(data.dailyRate * $('#txtDays').val());
                }
            }
        }
    });
}