
//controller work with task
app.controller('tasksController', function($scope, $http, $location) {
  
  var id = getUrlVars()["id"],
      parent = getUrlVars()["parent"];

  getTask(id, parent); 



  function taskRedirect(){
    var path = document.location.href;
        path = path.split('#')[0]+'#/task'
        document.location.href = path;
  }

  function getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      return vars;
  }  

  function getTask(id, parent){ 
    $http.post("ajax/getTask.php?id="+id+"&parent="+parent).success(function(data){
      if(data[0] == undefined){
        var path = document.location.href;
        path = path.split('#')[0]+'#/task'
        document.location.href = path;
      }else{
        var arr1 =[],
            arr2 = [],
            resArr = [];
        for (var i = data.length - 1; i >= 0; i--) {
          if(data[i].parent == 0){
            arr1.push(data[i]);
          }else{
            arr2.push(data[i]);
          }
        };

        for (var i = 0; i <= arr1.length - 1; i++) {
          resArr.push(arr1[i]);
          for(var j = 0; j <= arr2.length - 1; j++){
            if(arr1[i].id == arr2[j].parent){
              resArr.push(arr2[j]);
            }
          }
        };

        $scope.tasks = resArr;

        var activeTask,
            taskText = '';

        //catch active checked task
        for (var i = 0; i <= data.length - 1; i++) {
          if(data[i].id == id){
            activeTask = data[i];
          } 
        };

        $scope.activeTask = activeTask;

        //add task text in open task
        for (var i = 1; i <= data.length - 1; i++) {
         taskText = taskText + '<div class="row bg-primary" ><div class="col-lg-11 dotterLine " ><p class="mTop">Child Task '+data[i].id+'</p></div></div><p class="dateBorder"><span>Start time: &nbsp;&nbsp;&nbsp;&nbsp;'+data[0].time_start+' </span>&nbsp;&nbsp;&nbsp;&nbsp;<span>Update time: &nbsp;&nbsp;&nbsp;&nbsp;'+data[0].time_update+'</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>End time: &nbsp;&nbsp;&nbsp;&nbsp;'+data[0].time_end+'</span></p></br>'+data[i].task_text;
        };

        $('#openTask').html("<p class='dateBorder'><span>Start time: &nbsp;&nbsp;&nbsp;&nbsp;"+data[0].time_start+" </span>&nbsp;&nbsp;&nbsp;&nbsp;<span>Update time: &nbsp;&nbsp;&nbsp;&nbsp;"+data[0].time_update+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>End time: &nbsp;&nbsp;&nbsp;&nbsp;"+data[0].time_end+"</span></p>"+data[0].task_text+taskText);
      }
    });
  }; 

  $scope.addTask = function (creatTask) {
    var prior = $("#priorList :selected").html(),
        project = $("#projectList :selected").html(),
        user = $("#userList :selected").html(),
        text = encodeURIComponent(creatTask.text),
        name = encodeURIComponent(creatTask.name);

    $http.post("ajax/addTask.php?name="+name+"&text="+text+"&prior="+prior+"&project="+project+"&user="+user).success(function(data){
        taskRedirect();
    });
  };  

  $scope.updateTask = function(tasks) {    
    var prior = $("#priorList :selected").html(),
        project = $("#projectList :selected").html(),
        user = $("#userList :selected").html(),
        status = $("#statusList :selected").html(),
        text = encodeURIComponent(tasks[0].task_text);

      $http.post("ajax/updateTask.php?id="+id+"&name="+tasks[0].name+"&text="+text+"&prior="+prior+"&project="+project+"&status="+status+"&user="+user).success(function(data){
        taskRedirect();
      });
  };

  $scope.addChildTask = function(childTask,tasks) {    

    var prior = $("#priorListChild :selected").html(),
        project = $("#projectListChild :selected").html(),
        user = $("#userListChild :selected").html(),
        status = $("#statusListChild :selected").html();
        text = encodeURIComponent($("input[name='htmlcontent1']").val());

    $http.post("ajax/addTask.php?name="+childTask.name+"&text="+text+"&prior="+prior+"&project="+project+"&user="+user+"&parent="+tasks[0].id).success(function(data){
        taskRedirect();
    });
  };

  $scope.addComment = function(comment) {    
    console.log(id);
    var text = encodeURIComponent(comment.text);
    $http.post("ajax/comment.php?text="+text+"&id="+id).success(function(data){
        // $location.path('openTask');
        window.location.reload();
    });
  };

  $scope.changeStatus = function(id) {
    var status = $("#statusListUser :selected").html()    
    $http.post("ajax/updateStatus.php?id="+id+"&status="+status).success(function(data){
        window.location.reload();
    });
  };

});

// controller get all Roles
app.controller('rolesController', function($scope, $http) {
  getRole(); 
  function getRole(){  
  $http.post("ajax/getRoles.php").success(function(data){
          $scope.roles = data;
       });
  };

});

//autorization controller
app.controller('authCtrl', function ($scope, $http, $location) {

    $scope.doLogin = function (login) {

      $http.post("ajax/checkAuth.php?login="+login.login+"&password="+login.password).success(function(data){
          if(data == 1){
            $location.path('dashboard');  
          }else{
            alert ("denied");
          }
       });
        
    };       

});


//get parameters Session
app.controller('getSessionParam', function ($scope, $http) {
  $http.post('ajax/sessionParam.php').success(function(data) {
    $scope.role = data[0];
  });
});

//check access
app.controller('checkAccess', function ($scope, $http, $location) {    
     $http.post("ajax/access.php").success(function(data){
        if(data != "success"){
          $location.path('login'); 
        }
      });
});

//check access admin
app.controller('checkAccessAdmin', function ($scope, $http, $location) {    
     $http.post("ajax/accessAdmin.php").success(function(data){
        if(data != 1){
            $location.path('task'); 
        } 
      });  

      $scope.signUp = function (signup) {
        var role = $("#roleList :selected").html();
        $http.post("ajax/createUser.php?login="+signup.login+"&password="+signup.password+"&role="+role).success(function(data){
          if(data != "success"){
            $location.path('dashboard'); 
          }else{
            alert('error')
          } 
        });
      };  
});

//get parameters for project, prior, users
app.controller('getParam', function ($scope, $http, $location) {    
    
        $http.post("ajax/getParamNewTask.php").success(function(data){
          $scope.priors = JSON.parse(data[0]);
          $scope.projects = JSON.parse(data[1]);
          $scope.users = JSON.parse(data[2]);
          $scope.statusTask = JSON.parse(data[3]);
        });
      
});

//connect wysiwygeditor
app.controller('wysiwygeditor', function ($scope) {    
    $scope.orightml = '>';
    $scope.htmlcontent = $scope.orightml;
    $scope.disabled = false; 
});
 

// get comment  
app.controller('getComment', function ($scope, $http) {  
    var id = getUrlVars()["id"];

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }  

    $http.post("ajax/getComment.php?id="+id).success(function(data){
      $scope.comments = data;
    });
});

// add project

app.controller('addProject', function ($scope, $http, $location) { 

    $scope.addProject = function (project) {    
      console.log(project.name);
      $http.post("ajax/addProject.php?project="+project.name).success(function(data){
          $location.path('dashboard');
      });
    };
    
});

app.controller('updateUser', function ($scope, $http, $location) { 
    
    
    $scope.updateUser = function (param) {  
    var role = $("#roleList :selected").html(),
        user = $("#userList :selected").html(),
        password =''; 
        if(param != undefined){
          password = param.password;
        }     


        if(role == '' && param == undefined){
          alert('Нечего не выбрано менять');          
        }else{
          console.log(password+"-->");
          $http.post("ajax/updateUser.php?login="+user+"&password="+password+"&role="+role).success(function(data){
              $location.path('dashboard');
          });
        } 
      
    };
});