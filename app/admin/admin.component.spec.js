describe('AdminControllerTest', function() {

  beforeEach(module('admin'));

  it('executes a dummy test', inject(function() {
    expect(0).toBe(0);
  }));
  
  var $httpBackend, ctrl;
  var item;

  beforeEach(inject(function($componentController, _$httpBackend_) {
    item = {_id:1, text:"new", star:true, done:true};
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/shoplist/starred')
                .respond([item]);
    ctrl = $componentController('admin');
  }));
  
  it('should load the default list of starred items', inject(function() {
    expect(ctrl.defaultList).toBeUndefined();
    $httpBackend.flush();
    expect(ctrl.defaultList).toBeDefined();
    expect(ctrl.defaultList.length).toBe(1);
  }));

  it('should create a new item', inject(function() {
    expect(ctrl.defaultList).toBeUndefined();
    $httpBackend.flush();
    expect(ctrl.defaultList).toBeDefined();

    $httpBackend.expectPUT(/\/api\/shoplist\/.*/).respond(200, [item]);
    ctrl.moveStarredToList(item);
    $httpBackend.flush();
    expect(ctrl.defaultList.length).toBe(0);
  }));

});