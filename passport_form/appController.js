var app = angular.module('app', []);

app.controller("appController", function ($scope, $window, $http) {
  stateData = {}
  $scope.initilize = function () {
    $scope.applyFor = ["Fresh Passport", "Re-Issue of Passport"];
    $http.get('/api/countries').then((response) => {
      let country = response.data
      countries = []
      country.forEach(element => {
        if (element.name != "India")
          countries.push(element.name)
      });
      $scope.countries = countries
    })

    $http.get('/api/state').then((response) => {
      let state = response.data;
      stateData = state;
      $scope.state = Object.keys(state).sort()
    })
    $scope.gender = ["Male", "Female"];
    $scope.marital_status = ["Single", "Married", "Divorced", "Widow/ Widower", "Separated"]
    $scope.citizenship = ["Birth", "Descent", "Registration/ Naturalization"]
    $scope.employment_type = ["Government", "Homemaker", "Not employed", "Others", "Owners, Partners & Directors of companies which are members of CII, FICCI & ASSOCHAM", "Private", "PSU", "Retired Government Servant", "Retired- Private Service", "Self Employed", "Statutory Body", "Student"]
    $scope.gov_servant = ['yes', 'no']
    $scope.edu_qualification = ["5th pass or less", "Between 6th and 9th standard", "10th pass and above", "Graduate and above"]
    $scope.non_ecr = ["yes", "no"]
    const id = localStorage.getItem('id')
    if (id != null) {
      $http.get(`/index/${id}`).then((datas) => {
        datas.data[0].applicant_details.date_of_birth = datas.data[0].applicant_details.date_of_birth ? new Date(datas.data[0].applicant_details.date_of_birth) : null
        datas.data[0].other_details.date_of_issue = datas.data[0].other_details.date_of_issue ? new Date(datas.data[0].other_details.date_of_issue) : null
        datas.data[0].other_details.date_of_expire = datas.data[0].other_details.date_of_expire ? new Date(datas.data[0].other_details.date_of_expire) : null
        datas.data[0].other_details.date = datas.data[0].other_details.date ? new Date(datas.data[0].other_details.date) : null
        $scope.data = datas.data[0];
      })
    }
  }
  $scope.initilize()

  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.districtData = function (selectedState) {
    $scope.district = stateData[selectedState]
  }

  $scope.validate = function (formStatus) {
    if (!formStatus) {
      if ($scope.data.other_details.accept == true) {
        allData = $scope.data;
        if ($scope.data._id != undefined) {
          debugger
          $http.put(`/updatePassport/${$scope.data._id}`, allData).then((valid) => {
            valid ? $window.location.pathname = "./view_form.html" : alert("something went worng")
            localStorage.setItem("id",null)
          })
        }
        else {
          $scope.storeData(allData)
        }
      }
      else {
        alert("Please Accept the terms and condition")
      }
    }
    else {
      console.log("Invalid From")
      alert("please enter the details required")
    }
  }

  $scope.storeData = function (allData) {
    $http.post('/storeApplicantDetail', allData).then(function (valid) {
      $window.location.pathname = "./view_form.html"
    })
  }
})


app.controller("viewController", function ($scope, $window, $http) {
  $http.get('/applicantData').then((applicantData) => {
    $scope.data = applicantData.data
  });

  $scope.showHandle = (id) => {
    localStorage.setItem('id', id)
    $window.location.href = "/"
  }

  $scope.deleteHandle = (id) => {
    $http.delete(`/deleteData/${id}`).then(() => {
      index = $scope.data.map(function (e) { return e._id }).indexOf(id);
      $scope.data.splice(index, 1)
    })
  }
})