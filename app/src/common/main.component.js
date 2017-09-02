(function(){

  angular.module('selfService')
    .controller('MainCtrl', ['navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast', '$scope','AuthService', MainCtrl]);

  function MainCtrl(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast, $scope, AuthService) {
    var vm = this;

    vm.menuItems = [ ];
    vm.selectItem = selectItem;
    vm.toggleItemsList = toggleItemsList;
    vm.showActions = showActions;
    vm.title = $state.current.data.title;
    vm.showSimpleToast = showSimpleToast;
    vm.toggleRightSidebar = toggleRightSidebar;

    vm.userDetails = AuthService.getUser();


    navService.loadAllItems().then(function(menuItems) {
        vm.menuItems = [].concat(menuItems);
    });

    function toggleRightSidebar() {
      $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectItem (itemName) {
      vm.title = itemName;
      vm.toggleItemsList();
    }

    function showActions($event) {
      $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: 'app/views/partials/bottomSheet.html',
        controller: [ '$mdBottomSheet', SheetController],
        controllerAs: "vm",
        bindToController : true,
        targetEvent: $event
      }).then(function(clickedItem) {
        clickedItem && $log.debug( clickedItem.name + ' clicked!');
      });

      function SheetController( $mdBottomSheet ) {
        var vm = this;

        vm.actions = [
          { name: 'Share', icon: 'share', url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc' },
          { name: 'Star', icon: 'star', url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers' }
        ];

        vm.performAction = function(action) {
          $mdBottomSheet.hide(action);
        };
      }
    }

    function showSimpleToast(title) {
      $mdToast.show(
        $mdToast.simple()
          .content(title)
          .hideDelay(2000)
          .position('bottom right')
      );
    }

    $scope.logout = function() {
      AuthService.logout();
    }

  }

})();
