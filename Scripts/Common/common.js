
//following is our application module.ngGrid is the angular grid that we need to use to display data.
var customersApp = angular.module('customersApp', ['ngGrid']);
var url = 'api/Customer';

//the factory object for the webAPI call.
customersApp.factory('customerRepository', function ($http) {
    return {
        getCustomers: function (callback) {
               
            $http.get(url).success(callback);
        }
        ,
        //method for insert
        insertUser: function (callback,user) {
            var user = { "id": user.id, "city": user.city, "name": user.name, "address": user.address, "contactNo": user.contactNo, "emailId": user.emailId };
            $http.post(url, user).success(callback);
        }
            ,
        //method for update
        updateUser: function (callback,user) {
            var user = { "id": user.id, "city": user.city, "name": user.name, "address": user.address, "contactNo": user.contactNo, "emailId": user.emailId };
            $http.put(url + '/' + user.id, user).success(callback);
        }
        ,
        //method for delete
        deleteUser: function (callback, id) {
            $http.delete(url + '/' + id).success(callback);
        }

                    
    }
});

//controller   
customersApp.controller('customerCtrl', function ($scope, customerRepository) {
    getCustomers();
    function getCustomers() {
        customerRepository.getCustomers(function (results) {
            $scope.customerData = results;
        })
    }

    $scope.setScope = function (obj, action) {
        
        $scope.action = action;
        $scope.New = obj;
    }
       
        $scope.gridOptions = {
            data: 'customerData',
            showGroupPanel: true,
            columnDefs: [{ field: 'name', displayName: 'Name' , width: '15%'},
                { field: 'city', displayName: 'City', width: '15%' },
                { field: 'address', displayName: 'Address', width: '15%' },
                { field: 'contactNo', displayName: 'Contact No', width: '15%' },
                { field: 'emailId', displayName: 'Email Id', width: '15%' },
                { displayName: 'Options', cellTemplate: '<input type="button" ng-click="setScope(row.entity,\'edit\')" name="edit"  value="Edit">&nbsp;<input type="button" ng-click="DeleteUser(row.entity.id)"  name="delete"  value="Delete">', width: '25%' }
            ]
        };

    
        $scope.update = function () {
            if ($scope.action == 'edit') {
                customerRepository.updateUser(function () {
                    $scope.status = 'customer updated successfully';
                    alert('customer updated successfully');
                    getCustomers();
                }, $scope.New)
                $scope.action = '';
            }
            else
            {
                customerRepository.insertUser(function () {
                    alert('customer inserted successfully');
                    getCustomers();
                }, $scope.New)
                
            }


        }

        $scope.DeleteUser = function (id) {
            customerRepository.deleteUser(function () {
                alert('Customer deleted');
                getCustomers();
            }, id)

        }

});


