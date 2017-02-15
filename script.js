angular.module("testApp", [])
                .controller("testAppCtrl", function($scope, $http){
                    $scope.showSort=false;
                    $scope.showSearch=false;
                    $scope.show=function(param){
                        switch(param){
                            case "sort": $scope.showSort=!$scope.showSort;
                                break;
                            case "search": $scope.showSearch=!$scope.showSearch;
                                break;
                        }
                    }

                    $scope.changeSort=function(param){
                        switch(param){
                            case "inc": if ($scope.orderParam[0]==="-") {
                                $scope.orderParam = $scope.orderParam.substring(1);

                                $scope.incClass = "btn-success";
                                $scope.decClass = "btn-defult";
                            }
                                break;
                            case "dec": if ($scope.orderParam[0]!=="-") {
                                $scope.orderParam = "-" + $scope.orderParam;

                                $scope.incClass = "btn-defult";
                                $scope.decClass = "btn-success";
                            }
                                break;
                            default:
                                if ($scope.orderParam[0]==="-") {
                                    $scope.orderParam="-"+$scope.selectedForSort;
                                }
                                else{
                                    $scope.orderParam=$scope.selectedForSort;
                                }
                                break;
                        }

                    }

                    $scope.selectedForSort="name";
                    $scope.orderParam="name";
                    $scope.incClass="btn-success";
                    $scope.decClass="btn-defult";
                    $scope.sort=function(param){
                        switch(param){
                            case "inc": if ($scope.orderParam[0]==="-") {
                                $scope.orderParam=$scope.orderParam.substring(1);
                            }
                                $scope.incClass="btn-success";
                                $scope.decClass="btn-defult";
                                break;
                            case "dec": if ($scope.orderParam[0]!=="-") {
                                $scope.orderParam="-"+$scope.orderParam;
                            }
                                $scope.incClass="btn-defult";
                                $scope.decClass="btn-success";
                                break;
                        }

                    }


                    $scope.refresh=function(){
                        $http({
                            url: "users.txt",
                            method: "GET"
                        }).success(function (data) {
                            $scope.dataUsers = data;
                        });

                    }

                    $scope.id=10;
                    $scope.addNewUser = function (newUser) {

                        $scope.id++;
                        $scope.dataUsers.push({
                            id: $scope.id,
                            name: newUser.name,
                            username: newUser.username,
                            email: newUser.email,
                            address: {
                                street: newUser.street,
                                suite: newUser.suite,
                                city: newUser.city,
                                zipcode: newUser.zipcode,
                                geo: {
                                    lat: newUser.lat,
                                    lng: newUser.lng
                                }
                            },
                            phone: newUser.phone,
                            website: newUser.website,
                            company: {
                                name: newUser.company.name,
                                catchPhrase: newUser.company.catchPhrase,
                                bs: newUser.company.bs
                            }
                        });
                        $("#add").modal("hide");

                        newUser.name="";
                        newUser.username="";
                        newUser.email=""; newUser.street="";
                        newUser.suite="";
                        newUser.city="";
                        newUser.zipcode="";
                        newUser.lat=""; newUser.lng="";
                        newUser.phone=""; newUser.website="";
                        newUser.company.name="";
                        newUser.company.catchPhrase="";
                        newUser.company.bs="";
                    }

                    navigator.geolocation.getCurrentPosition(updateLocation, handleError);

                    function updateLocation(position) {
                        $scope.lat = position.coords.latitude;
                        $scope.lon = position.coords.longitude;

                    }

                    function handleError(error) {
                        $scope.error=error.message;
                    }

                    $scope.calcDistance = function (lat1, lon1, lat2, lon2){
                        const EARTH_RADIUS = 6372795;
                        
                        var Lat1 =  lat1 * Math.PI / 180;
                        var Lat2 =  lat2 * Math.PI / 180;
                        var Lon1 = lon1 * Math.PI / 180;
                        var Lon2 = lon2 * Math.PI / 180;
                        
                        
                        var cl1 = Math.cos(Lat1);
                        var cl2 = Math.cos(Lat2);
                        var sl1 = Math.sin(Lat1);
                        var sl2 = Math.sin(Lat2);
                        var delta = Lon2-Lon1;
                        var cdelta = Math.cos(delta);
                        var sdelta = Math.sin(delta);
                        console.log(cdelta);
                        
                        var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
                        var x = sl1 * sl2 + cl1 * cl2 * cdelta;

                        var ad = Math.atan2(y, x);
                        var dist = ad * EARTH_RADIUS;

                        return dist;
                    }

                    $scope.convertM=function(num){
                        if (isNaN(num)) return "not avalaible";
                        return Math.round(num/1000) + " km";
                    }

                    $scope.refresh();
                });