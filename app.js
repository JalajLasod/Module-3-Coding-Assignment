(
  function () {

    "use strict";

    angular.module("App",[])
    .controller("narrController",narrController)
    .service("narrService",narrService);

    narrController.$inject=["narrService"];

    function narrController(narrService) {

      var ctrl=this;

      ctrl.ctrl=false;

      ctrl.search="";

      ctrl.display=function () {

        console.log("inside display");

        narrService.query().then(function (result) {
          ctrl.found=[];

          console.log("inside query then");


          for (var i = 0; i < result.length; i++) {
            console.log("inside for loop");

            if (result[i].description.toLowerCase().includes(ctrl.search)) {
              ctrl.found.push(result[i]);
            }
          }
        }).then(function () {
          ctrl.switch=ctrl.nothingFound(ctrl.found.length);
        });

        if (ctrl.search!="") {
          ctrl.ctrl=true;
        }

      }

      ctrl.remove=function (index) {
        ctrl.found.splice(index,1);
      }

      ctrl.nothingFound=function (length) {
        if (length==0||ctrl.search=="") {
          return true;
        }
        else {
          return false;
        }
      }
    }

    narrService.$inject=["$http"];

    function narrService($http) {

      var service=this;

      service.query=function () {
        return $http({

          url:"http://davids-restaurant.herokuapp.com/menu_items.json"

        }).then(function (response) {

          return response.data.menu_items;

        })
      }
    }
  })();
