
$('#carManageForm').hide();
$('#driverManageForm').hide();
$('#rentRequestsFrom').hide();
$('#dashboard').show();

$('#carManage').click(function () {
    $('#carManageForm').show();
    $('#driverManageForm').hide();
    $('#rentRequestsFrom').hide();
    $('#dashboard').hide();
    getAllCars();
});

$('#driverManage').click(function () {
    $('#carManageForm').hide();
    $('#driverManageForm').show();
    $('#rentRequestsFrom').hide();
    $('#dashboard').hide();
    getAllDrivers();
});

$('#rentRequests').click(function () {
    $('#carManageForm').hide();
    $('#driverManageForm').hide();
    $('#rentRequestsFrom').show();
    $('#dashboard').hide();s
    getPendingRequests();
});


$('#btnDashBoard').click(function () {
    $('#carManageForm').hide();
    $('#driverManageForm').hide();
    $('#rentRequestsFrom').hide();
    $('#dashboard').show();
    getDashBoardInfo();
});