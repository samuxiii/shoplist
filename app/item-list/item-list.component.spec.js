describe('ItemListControllerTest', function() {

  beforeEach(module('itemList'));

  it('executes a dummy test', inject(function() {
    expect(true).toBe(true);
  }));
  
  var $httpBackend, ctrl, item;
  
  beforeEach(inject(function($componentController, _$httpBackend_, _$location_) {
    item = {_id:1, text:"item", star:true, done:true};
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/shoplist')
                .respond([item]);
    $location = _$location_;
    ctrl = $componentController('itemList');
  }));
  
  it('checks certain methods are present', inject(function() {
    expect(ctrl.createItem).toBeDefined(); //direct to db
    expect(ctrl.deleteItem).toBeDefined(); //direct to db
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

  it('should update selected items removing or adding to the user list', inject(function() {
    $httpBackend.flush();
    expect(ctrl.list).toEqual([item]);

    var selectedItem = {_id:2, text:"new", star:true, done:true};
    
    ctrl.updateSelectedItems(selectedItem);
    expect(ctrl.user.list).toEqual([selectedItem]);

    ctrl.updateSelectedItems(item);
    expect(ctrl.user.list).toEqual([selectedItem, item]);
    
    ctrl.updateSelectedItems(selectedItem);
    expect(ctrl.user.list).toEqual([item]);
  }));

});