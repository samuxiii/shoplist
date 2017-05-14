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

    var selectedItem = {_id:2, text:"new", star:false, done:false};
    
    ctrl.updateSelectedItems(selectedItem);
    expect(ctrl.user.list).toEqual([selectedItem]);

    ctrl.updateSelectedItems(item);
    expect(ctrl.user.list).toEqual([selectedItem, item]);
    
    ctrl.updateSelectedItems(selectedItem);
    expect(ctrl.user.list).toEqual([item]);
  }));

  it('should clean the list and the selected items', inject(function() {
    //$httpBackend.flush();
    expect(ctrl.user.list).toEqual([]);

    var item2 = {_id:2, text:"item2", star:false, done:false};
    var item3 = {_id:3, text:"item3", star:false, done:false};
    var item4 = {_id:4, text:"item4", star:true, done:false};
    
    //populate items
    ctrl.list = [item, item2, item3, item4];
    //selected items
    ctrl.user.list = [item2, item4];

    //define delete operations as expected
    $httpBackend.expectDELETE('/api/shoplist/2')
                .respond([item, item3, item4]);
    $httpBackend.expectDELETE('/api/shoplist/4')
                .respond([item, item3]);

    //call wipe
    ctrl.wipe();
    $httpBackend.flush();

    //the list and user list must be empty
    expect(ctrl.list).toEqual([item, item3]);
    expect(ctrl.user.list).toEqual([]);
  }));

});