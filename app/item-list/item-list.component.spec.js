describe('ItemListControllerTest', function() {

  beforeEach(module('itemList'));

  it('executes a dummy test', inject(function() {
    expect(true).toBe(true);
  }));
  
  var $httpBackend, ctrl, item;
  
  beforeEach(inject(function($componentController, _$httpBackend_, _$location_) {
    item = {_id:1, text:"new", star:true, done:true};
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/shoplist')
                .respond([item]);
    $location = _$location_;
    ctrl = $componentController('itemList');
  }));
  
  it('checks certain methods are present', inject(function() {
    expect(ctrl.createItem).toBeDefined();
    expect(ctrl.deleteItem).toBeDefined();
    expect(ctrl.starredItem).toBeDefined();
    expect(ctrl.updateSelectedItems).toBeDefined();
    expect(ctrl.wipe).toBeDefined();
  }));

  it('should be initialized', inject(function() {
    expect(ctrl.formItem).toBeDefined();
    expect(ctrl.user).toBeDefined();
    $httpBackend.flush();
    expect(ctrl.list).toEqual([item]);
  }));

});