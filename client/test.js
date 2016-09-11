/* Test Code */

describe('startFrom filter', function() {

    var $filter;
    
    beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
    }));
    
    it('should return first page', function() {
    var startFrom = $filter('startFrom');
    expect(startFrom([1,2,3], 1, 1)).toEqual([1]);
    });
    
    it('should return second page', function() {
    var startFrom = $filter('startFrom');
    expect(startFrom( [1,2,3,4,5], 2, 2 )).toEqual([3,4]);
    });
    
    it('input empty array', function() {
    var startFrom = $filter('startFrom');
    expect(startFrom( [], 2, 2 )).toEqual([]);
    });
    
    it('currentPageNum<0', function() {
    var startFrom = $filter('startFrom');
    expect(startFrom( [1,2,3,4,5], -2 , 2 )).toEqual([]);
    });
    
    it('numVideosEachPage<0', function() {
    var startFrom = $filter('startFrom');
    expect(startFrom( [1,2,3,4,5], 2 , -2 )).toEqual([]);
    });
  
    it('currentPageNum=0,numVideosEachPage=null', function() {
    var startFrom = $filter('startFrom');
    expect(startFrom( [1,2,3,4,5], 0 , null )).toEqual([]);
    }); 
});


describe('function page.pageBtn', function () {

    beforeEach(module('app'));
    var $controller;
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(function() {
      $scope = {};
      controller = $controller('AppController', { $scope: $scope });
    });
    
    it('should add page num correctly', function () {

      $scope.page.currentPageNum=1;
      $scope.page.pageBtn('next');
      expect($scope.page.currentPageNum).toBe(2);
    }); 
    
    it('should subtract page num correctly', function () {

      $scope.page.pageBtn('last');
      expect($scope.page.currentPageNum).toBe(1);
    }); 
    
    it('should stop subtract page num correctly', function () {

      $scope.page.pageBtn('last');
      expect($scope.page.currentPageNum).toBe(1);      
    }); 
    
    it('should ignore error input', function () {

      $scope.page.pageBtn('xx');
      expect($scope.page.currentPageNum).toBe(1);
    }); 
});


describe('function rating', function () {

    beforeEach(module('app'));
  
    var $controller;
    
    beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
    }));
    
    beforeEach(function(){
      var $scope = {};
      var controller = $controller('AppController', { $scope: $scope });
    });
    
    it('$scope.popup.myRate', function () {
        
      $scope.rating(3);
      expect($scope.popup.myRate).toBe(4);
      
    }); 
    
    it('$scope.popup.rateStyle', function () {
        
      $scope.rating(0);
      expect($scope.popup.rateStyle).toEqual([{color:'gold'}]);
      
    });
    
    it('$scope.popup.rateStyle', function () {
        
      $scope.rating(4);
      expect($scope.popup.rateStyle.length).toEqual(5);
      
    });

});


describe('function popupOpen', function () {

    beforeEach(module('app'));
    var $controller;
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    beforeEach(function(){
        var $scope = {};
        var controller = $controller('AppController', { $scope: $scope });
        var mockElement = document.createElement('video');
        mockElement.load=function(){};
        mockElement.id='popupVideo';
        angular.element(document.body).append(mockElement);
    });
    
    it('background shoud ban scrolling', function () {
        
        $scope.videos[0]={
            _id:"57d1a3c23d8a3b0fde58f9f2",
            description:"React.js is a JavaScript library.",
            name:"[0] Getting Started With ReactJs",
            ratings:[3,3,3],
            rateStar:['','','']
        };
        
        $scope.popupOpen(0);
        
        expect($scope.stopScrolling).toBe('hidden');
    
    }); 
    
    it('popup index should return as expect', function () {
        
        expect($scope.popup.index).toEqual(0);
    
    }); 
    
    it('popup _id should return as expect', function () {
    
        expect($scope.popup.index._id).toEqual("57d1a3c23d8a3b0fde58f9f2");
    
    }); 
    
    it('popup rateStar should return as expect', function () {
    
        expect($scope.popup.rateStar).toEqual(['','','']);
    
    }); 
    
});



describe('function popupClose', function () {

    beforeEach(module('app'));
    
    var $controller;
    
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    beforeEach(function(){
        var $scope = {};
        var controller = $controller('AppController', { $scope: $scope });
        
        var mockElement = document.createElement('video');
        mockElement.pause=function(){};
        mockElement.id='popupVideo';
        angular.element(document.body).append(mockElement);
    });
    
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        myAjax = $injector.get('myAjax');
    }));  

    it('selected video ratings should be updated', function () {
        
        $scope.popup={
            index:0,
            show:true,
            rateStyle:[{color:'gold'},{color:'gold'},{color:'gold'},{color:'gold'},{color:'gold'}],
            myRate:5,
            _id:"57d1a3c23d8a3b0fde58f9f2",
            description:"React.js is a JavaScript library.",
            name:"[0] Getting Started With ReactJs",
            ratings:[3,3,3],
            rateStar:['','','']
        };
        $scope.user.sessionId="abc";

        $httpBackend.expect('POST', '/video/ratings?sessionId=abc',{
            videoId: $scope.popup._id, 
            rating: $scope.popup.myRate
        }).respond({
            status:'success',
            data:{
                _id:"57d1a3c23d8a3b0fde58f9f2",
                description:"React.js is a JavaScript library.",
                name:"[0] Getting Started With ReactJs",
                ratings:[3,3,3,5],
            }
        });
        
        $scope.popupClose();
        $httpBackend.flush();
        
        expect($scope.videos[$scope.popup.index].ratings).toEqual([3,3,3,5]);
    
    }); 
    
    it('selected video rateStar should updated',function() {
        
        expect($scope.videos[$scope.popup.index].rateStar.length).toBe(4);
    });
    
    it('popup window should hide',function() {
        
        expect($scope.popup.show).toBe(false);
    });
    
    it('scrolling should enable',function() {
        
        expect($scope.stopScrolling).toBe('');
    });
});



describe('function loginSubmit', function () {
    
    beforeEach(module('app'));
    
    var $controller;
    
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    beforeEach(function() {
        var $scope = {};
        var controller = $controller('AppController', { $scope: $scope });
        
        var mockElement = document.createElement('video');
        mockElement.pause=function(){};
        mockElement.id='popupVideo';
        angular.element(document.body).append(mockElement);
    });
    
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        myAjax = $injector.get('myAjax');
    }));  
        
    it('username should be correct', function () {

        $scope.videos=[];
        $scope.login={
            username:'ali',
            password:'password'
        };
        
        $httpBackend.expect('POST', '/user/auth',{
            username: $scope.login.username, 
            password: "5f4dcc3b5aa765d61d8327deb882cf99"
        }).respond({
            status:'success',
            username:'ali',
            sessionId:'abc'
        });
        
        $httpBackend.expect('GET', '/videos?limit=10&sessionId=abc&skip=0')
        .respond({});
        
        $scope.loginSubmit();
        $httpBackend.flush();
        
        expect($scope.user.username).toBe($scope.login.username);
    }); 

    it('sessionId should correct',function(){
        expect($scope.user.sessionId).toBe('abc');
    });
    
    it('timeout event should trigger', inject(function($timeout){
        // flush timeout(s) for all code under test.
    	$timeout.flush(1002);
    
    	// this will throw an exception if there are any pending timeouts.
    	$timeout.verifyNoPendingTasks();
        
    	expect($scope.login.show).toBe('');
    }));
});

describe('function logout', function () {
    
    beforeEach(module('app'));
    
    var $controller;
    
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        myAjax = $injector.get('myAjax');
    }));  
        

    
    it('things to do after click the logout button',function () {
        
        var $scope = {};
        var controller = $controller('AppController', { $scope: $scope });
        
        $scope.user.sessionId='abc';
        
        $httpBackend.expect('GET', '/user/logout?sessionId=abc')
        .respond({
            status:'success'
        });
        
        var onSomethingHappenedSpy = spyOn(location.prototype, "reload");
        // var fooController = new FooController();
        $scope.logout();
        $httpBackend.flush();
        
        expect(onSomethingHappenedSpy).toHaveBeenCalled();
    
    }); 
});


describe('function getVideos', function () {
    
    beforeEach(module('app'));
    
    var $controller;
    
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        myAjax = $injector.get('myAjax');
    }));  
        

    
    it('_id should correct', function () {
        
        var $scope = {};
        var controller = $controller('AppController', { $scope: $scope });
        
        $httpBackend.expect('GET', '/videos?limit=10&sessionId=abc&skip=0')
        .respond({
            status:'success',
            data:[{
                _id:"57d1a3c23d8a3b0fde58f9f2",
                description:"React.js is a JavaScript library.",
                name:"[0] Getting Started With ReactJs",
                ratings:[3,3,3]
            }]
        });
        
        $scope.getVideos();
        $httpBackend.flush();
        
        expect($scope.videos[0]._id).toBe("57d1a3c23d8a3b0fde58f9f2");

    }); 
    
    it('rateStar should correct',function() {
        
        expect($scope.videos[0].rateStar.length).toBe(3);
    });
});

