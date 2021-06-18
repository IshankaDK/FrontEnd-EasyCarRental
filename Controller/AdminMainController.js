$('#carManageForm').hide();
$('#driverManageForm').hide();
$('#rentRequestsFrom').hide();

$('#carManage').click(function () {
    $('#carManageForm').show();
    $('#driverManageForm').hide();
    $('#rentRequestsFrom').hide();
});

$('#driverManage').click(function () {
    $('#carManageForm').hide();
    $('#driverManageForm').show();
    $('#rentRequestsFrom').hide();
});

$('#rentRequests').click(function () {
    $('#carManageForm').hide();
    $('#driverManageForm').hide();
    $('#rentRequestsFrom').show();
});