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

//Get All Cars
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

// load Cars to Table
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
        $('#tblCar').append(row);
    }

    // Table click Event
    $('#tblCar>tr').off('click');
    $('#tblCar>tr').click(function () {
        let carId = $(this).children('td:eq(0)').text();
        let brand = $(this).children('td:eq(1)').text();
        let carType = $(this).children('td:eq(2)').text();
        let noOfPass = $(this).children('td:eq(3)').text();
        let transType = $(this).children('td:eq(4)').text();
        let fuelType = $(this).children('td:eq(5)').text();
        let color = $(this).children('td:eq(6)').text();
        let regNo = $(this).children('td:eq(7)').text();
        let dailyRate = $(this).children('td:eq(8)').text();
        let monthlyRate = $(this).children('td:eq(9)').text();
        let priceForExtraKM = $(this).children('td:eq(10)').text();
        let lossDamageWaiver = $(this).children('td:eq(11)').text();
        let status = $(this).children('td:eq(12)').text();

        $("#txtCarId").val(carId);
        $("#txtBrand").val(brand);
        $("#cmbCarType :selected").text(carType);
        $("#cmbNoOfPassenger :selected").text(noOfPass);
        $("#cmbTransmissionType :selected").text(transType);
        $("#cmbFuelType :selected").text(fuelType);
        $("#cmbLossDamage :selected").text(lossDamageWaiver);
        $("#cmbCarStatus :selected").text(status);
        $("#txtColor").val(color);
        $("#txtRegNo").val(regNo);
        $("#txtDailyRate").val(dailyRate);
        $("#txtMonthlyRate").val(monthlyRate);
        $("#txtCostForExtraKM").val(priceForExtraKM);
    });
}

loadComboBoxes();

// loading combo box in form
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

getAllDrivers();
// Driver Add
$("#btnDriverAdd").click(function () {
    let driverId = $("#txtDriverId").val();
    let driverName = $("#txtDriverName").val();
    let driverAddress = $("#txtDriverAddress").val();
    let driverContact = $("#txtDriverContact").val();
    let driverEmail = $("#txtDriverEmail").val();
    let driverPassword = $("#txtDriverPassword").val();
    let driverStatus = $("#cmbDriverStatus :selected").val();

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            driverId: driverId,
            driverName: driverName,
            driverAddress: driverAddress,
            driverContact: driverContact,
            driverStatus: driverStatus,
            driverEmail: driverEmail,
            driverPassword: driverPassword
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
    let driverEmail = $("#txtDriverEmail").val();
    let driverPassword = $("#txtDriverPassword").val();
    let driverStatus = $("#cmbDriverStatus :selected").val();

    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            driverId: driverId,
            driverName: driverName,
            driverAddress: driverAddress,
            driverContact: driverContact,
            driverStatus: driverStatus,
            driverEmail: driverEmail,
            driverPassword: driverPassword
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

// Driver Delete
$("#btnDriverDelete").click(function () {
    let driverId = $("#txtDriverId").val();

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({
            driverId: driverId
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

function loadDriverStatusCombo() {
    $('#cmbDriverStatus').children().remove();
    $('#cmbDriverStatus').append("<option>-Select Driver Status-</option>");
    $($('#cmbDriverStatus').children().get(0)).attr('disabled', 'true');
    $('#cmbDriverStatus').append("<option>Available</option>");
    $('#cmbDriverStatus').append("<option>On Hire</option>");
    $('#cmbDriverStatus').append("<option>Not Available</option>");
}

// Get All Drivers
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

// load Drivers to Table
function loadAllDriversToTable(data) {
    let allDrivers = data;
    console.log(allDrivers);
    $("#tblDriver").empty();
    for (let i in allDrivers) {
        if (allDrivers[i].driverId !== "No_Driver") {
            let driverId = allDrivers[i].driverId;
            let driverName = allDrivers[i].driverName;
            let driverAddress = allDrivers[i].driverAddress;
            let driverContact = allDrivers[i].driverContact;
            let driverStatus = allDrivers[i].driverStatus;
            let driverEmail = allDrivers[i].driverEmail;

            let row = `<tr><td>${driverId}</td><td>${driverName}</td><td>${driverAddress}</td><td>${driverContact}</td><td>${driverStatus}</td><td>${driverEmail}</td></tr>`;
            $('#tblDriver').append(row);
        }
    }
    $('#tblDriver>tr').off('click');
    $('#tblDriver>tr').click(function () {
        let driverId = $(this).children('td:eq(0)').text();
        let driverName = $(this).children('td:eq(1)').text();
        let driverAddress = $(this).children('td:eq(2)').text();
        let driverContact = $(this).children('td:eq(3)').text();
        let driverStatus = $(this).children('td:eq(4)').text();
        let driverEmail = $(this).children('td:eq(5)').text();

        $("#txtDriverId").val(driverId);
        $("#txtDriverName").val(driverName);
        $("#txtDriverAddress").val(driverAddress);
        $("#txtDriverContact").val(driverContact);
        $("#txtDriverEmail").val(driverEmail);
        $("#cmbDriverStatus :selected").text(driverStatus);
    });
}

getPendingRequests();

// getting pending rental requests
function getPendingRequests() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/rentcar?status=pending",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            loadAllPendingRequests(data);
        }
    });
}

// load pending rental requests to a table
function loadAllPendingRequests(data) {
    let pendingReq = data;
    console.log(pendingReq);
    $("#tblPendingRequests").empty();
    for (let i in pendingReq) {
        let rentId = pendingReq[i].rentId;
        let cusEmail = pendingReq[i].customerEmail.email;
        let carId = pendingReq[i].carId.carId;
        let driver = pendingReq[i].driverId.driverId;
        let start = pendingReq[i].startDate;
        let end = pendingReq[i].endDate;
        let duration = pendingReq[i].duration;
        let cost = pendingReq[i].cost;
        let day = pendingReq[i].dayRate;
        let month = pendingReq[i].monthRate;


        let row = `<tr><td>${rentId}</td><td>${cusEmail}</td><td>${carId}</td><td>${driver}</td><td>${start}</td><td>${end}</td><td>${duration}</td><td>${cost}</td><td>${day}</td><td>${month}</td></tr>`;
        $('#tblPendingRequests').append(row);

        // Table click Event
        $('#tblPendingRequests>tr').off('click');
        $('#tblPendingRequests>tr').click(function () {
            let rentId = $(this).children('td:eq(0)').text();
            let cusEmail = $(this).children('td:eq(1)').text();
            let carId = $(this).children('td:eq(2)').text();
            let driver = $(this).children('td:eq(3)').text();
            let start = $(this).children('td:eq(4)').text();
            let end = $(this).children('td:eq(5)').text();
            let duration = $(this).children('td:eq(6)').text();
            let cost = $(this).children('td:eq(7)').text();
            let day = $(this).children('td:eq(8)').text();
            let month = $(this).children('td:eq(9)').text();

            $("#txtRentId0").val(rentId);
            $("#txtCarId0").val(carId);
            $("#txtCustomerEmail0").val(cusEmail);
            $("#txtDriverId0").val(driver);
            $("#txtStartDate0").val(start);
            $("#txtEndDate0").val(end);
            $("#txtDuration0").val(duration);
            $("#txtCost0").val(cost);
            $("#txtDayRate0").val(day);
            $("#txtMonthRate0").val(month);
            // $("#txtCost0").val(cost);
        });
    }
}

loadAvailableDriverComboForPendingRequests();

function loadAvailableDriverComboForPendingRequests() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver?status=Available",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            $('#cmbDriverId0').children().remove();
            $('#cmbDriverId0').append("<option>-Select Driver ID-</option>");
            // $($('#cmbDriverId0').children().get(0)).attr('disabled', 'true');
            for (let i in data) {
                let id = data[i].driverId;
                $('#cmbDriverId0').append("<option>" + id + "</option>");
            }
        }
    });
}

// request accept
$('#btnAccept').click(function () {
    let rentId = $("#txtRentId0").val();
    let carId = $("#txtCarId0").val();
    let cusEmail = $("#txtCustomerEmail0").val();
    let driverID = $("#txtDriverId0").val();
    let pickDate = $("#txtStartDate0").val();
    let returnDate = $("#txtEndDate0").val();
    let duration = $("#txtDuration0").val();
    let cost = $("#txtCost0").val();
    let dayRate = $("#txtDayRate0").val();
    let monthRate = $("#txtMonthRate0").val();

    let cmbId = $('#cmbDriverId0 :selected').text();


    let car;
    let customer;
    let driver;

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
                url: "http://localhost:8080/EasyCarRental_war_exploded/api/customer?email=" + cusEmail,
                contentType: 'application/json',
                async: true,
                success: function (data) {
                    console.log(data);
                    customer = data;
                    if (cmbId === "-Select Driver ID-") {
                        $.ajax({
                            method: "GET",
                            url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver?id=" + driverID,
                            contentType: 'application/json',
                            async: true,
                            success: function (data) {
                                console.log(data);
                                driver = data;
                                $.ajax({
                                    method: "PUT",
                                    url: "http://localhost:8080/EasyCarRental_war_exploded/api/rentcar",
                                    contentType: 'application/json',
                                    async: true,
                                    data: JSON.stringify({
                                        rentId: rentId,
                                        startDate: pickDate,
                                        endDate: returnDate,
                                        duration: duration,
                                        monthRate: monthRate,
                                        dayRate: dayRate,
                                        cost: cost,
                                        extraKM: 0,
                                        status: "Accepted",
                                        customerEmail: customer,
                                        carId: car,
                                        driverId: driver,
                                    }),
                                    success: function (data) {
                                        console.log(data);
                                        $.ajax({
                                            method: "PUT",
                                            url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
                                            contentType: 'application/json',
                                            async: true,
                                            data: JSON.stringify({
                                                carId: car.carId,
                                                brand: car.brand,
                                                carType: car.carType,
                                                noOfPassengers: car.noOfPassengers,
                                                transmissionType: car.transmissionType,
                                                fuelType: car.fuelType,
                                                color: car.color,
                                                registrationNumber: car.registrationNumber,
                                                dailyRate: car.dailyRate,
                                                freeMileageForADay: car.freeMileageForADay,
                                                monthlyRate: car.monthlyRate,
                                                freeMileageForAMonth: car.freeMileageForAMonth,
                                                priceForExtraKM: car.priceForExtraKM,
                                                lossDamageWaiver: car.lossDamageWaiver,
                                                status: "On Hire"
                                            }),
                                            success: function (data) {
                                                console.log(data)
                                                if (driverID !== "No_Driver") {
                                                    $.ajax({
                                                        method: "PUT",
                                                        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
                                                        contentType: 'application/json',
                                                        async: true,
                                                        data: JSON.stringify({
                                                            driverId: driver.driverId,
                                                            driverName: driver.driverName,
                                                            driverAddress: driver.driverAddress,
                                                            driverContact: driver.driverContact,
                                                            driverEmail: driver.driverEmail,
                                                            driverPassword: driver.driverPassword,
                                                            driverStatus: "On Hire"
                                                        }),
                                                        success: function (data) {
                                                            console.log(data)
                                                            getPendingRequests();
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        $.ajax({
                            method: "GET",
                            url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver?id=" + cmbId,
                            contentType: 'application/json',
                            async: true,
                            success: function (data) {
                                console.log(data);
                                driver = data;
                                $.ajax({
                                    method: "PUT",
                                    url: "http://localhost:8080/EasyCarRental_war_exploded/api/rentcar",
                                    contentType: 'application/json',
                                    async: true,
                                    data: JSON.stringify({
                                        rentId: rentId,
                                        startDate: pickDate,
                                        endDate: returnDate,
                                        duration: duration,
                                        monthRate: monthRate,
                                        dayRate: dayRate,
                                        cost: cost,
                                        extraKM: 0,
                                        status: "Accepted",
                                        customerEmail: customer,
                                        carId: car,
                                        driverId: driver,
                                    }),
                                    success: function (data) {
                                        console.log(data);
                                        $.ajax({
                                            method: "PUT",
                                            url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
                                            contentType: 'application/json',
                                            async: true,
                                            data: JSON.stringify({
                                                carId: car.carId,
                                                brand: car.brand,
                                                carType: car.carType,
                                                noOfPassengers: car.noOfPassengers,
                                                transmissionType: car.transmissionType,
                                                fuelType: car.fuelType,
                                                color: car.color,
                                                registrationNumber: car.registrationNumber,
                                                dailyRate: car.dailyRate,
                                                freeMileageForADay: car.freeMileageForADay,
                                                monthlyRate: car.monthlyRate,
                                                freeMileageForAMonth: car.freeMileageForAMonth,
                                                priceForExtraKM: car.priceForExtraKM,
                                                lossDamageWaiver: car.lossDamageWaiver,
                                                status: "On Hire"
                                            }),
                                            success: function (data) {
                                                console.log(data)
                                                $.ajax({
                                                    method: "PUT",
                                                    url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
                                                    contentType: 'application/json',
                                                    async: true,
                                                    data: JSON.stringify({
                                                        driverId: driver.driverId,
                                                        driverName: driver.driverName,
                                                        driverAddress: driver.driverAddress,
                                                        driverContact: driver.driverContact,
                                                        driverEmail: driver.driverEmail,
                                                        driverPassword: driver.driverPassword,
                                                        driverStatus: "On Hire"
                                                    }),
                                                    success: function (data) {
                                                        console.log(data)
                                                        getPendingRequests();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }

                }
            });
        }
    });
});

// request deny
$('#btnDeny').click(function () {
    let rentId = $("#txtRentId0").val();
    let carId = $("#txtCarId0").val();
    let cusEmail = $("#txtCustomerEmail0").val();
    let driverID = $("#txtDriverId0").val();
    let pickDate = $("#txtStartDate0").val();
    let returnDate = $("#txtEndDate0").val();
    let duration = $("#txtDuration0").val();
    let cost = $("#txtCost0").val();
    let dayRate = $("#txtDayRate0").val();
    let monthRate = $("#txtMonthRate0").val();
    let reason = $('#txtDenyReason0').val();

    let car;
    let customer;
    let driver;

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
                url: "http://localhost:8080/EasyCarRental_war_exploded/api/customer?email=" + cusEmail,
                contentType: 'application/json',
                async: true,
                success: function (data) {
                    console.log(data);
                    customer = data;
                    $.ajax({
                        method: "GET",
                        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver?id=" + driverID,
                        contentType: 'application/json',
                        async: true,
                        success: function (data) {
                            console.log(data);
                            driver = data;
                            $.ajax({
                                method: "PUT",
                                url: "http://localhost:8080/EasyCarRental_war_exploded/api/rentcar",
                                contentType: 'application/json',
                                async: true,
                                data: JSON.stringify({
                                    rentId: rentId,
                                    startDate: pickDate,
                                    endDate: returnDate,
                                    duration: duration,
                                    monthRate: monthRate,
                                    dayRate: dayRate,
                                    cost: cost,
                                    extraKM: 0,
                                    status: "Denied :- " + reason,
                                    customerEmail: customer,
                                    carId: car,
                                    driverId: driver,
                                }),
                                success: function (data) {
                                    console.log(data);
                                    getPendingRequests();
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// get DashBoard Info
getDashBoardInfo();
function getDashBoardInfo() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/customer",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            $('#regUsers').text(data);
        }
    });
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?status=Available",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            $("#availableCars").text(data.length);
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/EasyCarRental_war_exploded/api/car",
                contentType: 'application/json',
                async: true,
                success: function (allCar) {
                    let reserved = allCar.length - data.length;
                    $('#reservedCars').text(reserved);
                }
            });
        }
    });
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/rentcar?start=today&status=Accepted",
        contentType: 'application/json',
        async: true,
        success: function (today) {
            $('#todayBooking').text(today)
        }
    });
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver?status=Available",
        contentType: 'application/json',
        async: true,
        success: function (data) {
            $('#availableDriver').text(data.length);
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/EasyCarRental_war_exploded/api/driver",
                contentType: 'application/json',
                async: true,
                success: function (allDrivers) {
                    $('#occupiedDriver').text(allDrivers.length - data.length - 1/*No_Driver*/);
                }
            });
        }
    });
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?status=Damaged",
        contentType: 'application/json',
        async: true,
        success: function (damaged) {
            $('#needMaintenance').text(damaged.length);
        }
    });
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/EasyCarRental_war_exploded/api/car?status=In Maintenance",
        contentType: 'application/json',
        async: true,
        success: function (garage) {
            $('#inMaintenance').text(garage.length);
        }
    });
}