describe('AdminControllerTest', function() {

  beforeEach(module('admin'));

  it('dummy test', inject(function() {
    expect(0).toBe(0);
  }));
  
  var $httpBackend, ctrl;
  beforeEach(inject(function($componentController, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $ctrl = $componentController('admin', {$httpBackend});
  }));
  
  it('createItem test', inject(function() {
    
    expect($ctrl.addItem).toBeDefined();
  }));

});