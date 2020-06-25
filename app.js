(function () {
  "use strict";

  angular.module("App",[])
  .controller("menuController",menuController)
  .service("menuService",menuService);
  // .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  menuController.$inject=['menuService'];

  function menuController(menuService) {
    var ctrl=this;

    ctrl.item="C";

    var promise=menuService.getMenu();
    console.log(promise);

    promise.then(function (response) {
      ctrl.items=response.data.menu_items;
      console.log(ctrl.items);
      console.log("I'm in promise");

    })
    .catch(function (error) {
      console.log("Something went wrong");
    });
    console.log(ctrl.found);


    ctrl.narrItDown=function () {

        for (var i = 0; i < ctrl.items.length; i++) {
          console.log("In the for loop");

          ctrl.found=[];

          if (ctrl.items[i].name.includes(ctrl.item)) {
            console.log(ctrl.items[i].name);
            ctrl.found.push(ctrl.items[i]);
          }
          else {
            continue;
          }
          console.log(ctrl.found);
        }
    }

    // for (var i = 0; i < ctrl.items.length; i++) {
    //   ctrl.items[i]
    // }

  };

  menuService.$inject=['$http']

  function menuService($http) {
    var service=this;

    service.getMenu=function () {
      var response=$http({
       method:"GET",
       url:"http://davids-restaurant.herokuapp.com/menu_items.json"
     });
     return response;
   };
 };

  })()
