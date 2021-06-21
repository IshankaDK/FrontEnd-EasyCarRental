$('#carManageForm').hide();
$('#driverManageForm').hide();
$('#rentRequestsFrom').hide();

$('#carManage').click(function () {
    $('#carManageForm').show();
    $('#driverManageForm').hide();
    $('#rentRequestsFrom').hide();
    getAllCars();
});

$('#driverManage').click(function () {
    $('#carManageForm').hide();
    $('#driverManageForm').show();
    $('#rentRequestsFrom').hide();
    getAllDrivers();
});

$('#rentRequests').click(function () {
    $('#carManageForm').hide();
    $('#driverManageForm').hide();
    $('#rentRequestsFrom').show();
    getPendingRequests();
});