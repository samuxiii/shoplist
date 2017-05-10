describe('ItemListControllerTest', function() {

  beforeEach(module('itemList'));

  it('dummy test', inject(function() {
    expect(0).toBe(0);
  }));
  
  var $httpBackend, ctrl;
  beforeEach(inject(function($componentController, _$httpBackend_, _$location_) {
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    //$httpBackend.expectGET('phones/xyz.json').respond({name: 'phone xyz'});
    $ctrl = $componentController('itemList', {$httpBackend, $location});
  }));
  
  it('methods are created', inject(function() {
    
    expect($ctrl.createItem).toBeDefined();
    expect($ctrl.deleteItem).toBeDefined();
    expect($ctrl.starredItem).toBeDefined();
    expect($ctrl.updateSelectedItems).toBeDefined();
    expect($ctrl.wipe).toBeDefined();
  }));

});