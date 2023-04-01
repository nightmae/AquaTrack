document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("submitBtn");
  const input = document.getElementById("intakeInput");
  const totalIntake = document.getElementById("total-intake");
  const intakePerHour = document.getElementById("intake-per-hour");
  const dailyWater = document.getElementById("daily-water");
  const intakeComparison = document.getElementById("intake-comparison");
  const intakeGraph = document.getElementById("intake-graph");
  const hello = document.getElementById("hello");

  let waterIntake = [];

  btn.addEventListener("click", pushArray);

  function pushArray() {
    if (!isNaN(parseFloat(input.value))) {
      waterIntake.push(parseFloat(input.value));
      checkWater();
    } else {
      console.log("Invalid input!");
    }
  }
  
  function checkWater() {
    const sum = waterIntake.reduce((a, b) => a + b, 0);
    const average = sum / waterIntake.length;
    const dailyWaterValue = calculateDailyWater(user1);
  
    totalIntake.textContent = sum.toFixed(2) + "L";
    intakePerHour.textContent = (average.toFixed(2) / 24).toFixed(2) + "L";
    dailyWater.textContent = dailyWaterValue.toFixed(2) + "L";
  
    if (waterIntake.length === 1) {
      intakeComparison.textContent = "No previous data available.";
    } else {
      const prevDayIntake = waterIntake[waterIntake.length - 2];
      const currDayIntake = waterIntake[waterIntake.length - 1];
  
      if (currDayIntake > prevDayIntake) {
        intakeComparison.textContent = `Today's intake is higher than yesterday's intake by ${(currDayIntake - prevDayIntake).toFixed(2)} L.`;
      } else if (currDayIntake < prevDayIntake) {
        intakeComparison.textContent = `Today's intake is lower than yesterday's intake by ${(prevDayIntake - currDayIntake).toFixed(2)} L.`;
      } else {
        intakeComparison.textContent = "Today's intake is the same as yesterday's intake.";
      }
    }
  

    let graphContainer = intakeGraph
    /*let graph = "";
    for (let i = 0; i < waterIntake.length; i++) {
      let barHeight = waterIntake[i] * 50;
      graph += `<div class="bar" style="height:${barHeight}px;" title="${waterIntake[i]}L"></div>`;
    }
    graphContainer.innerHTML = graph;*/

    const recommendation = generateIntakeRecommendation(user1);
    if (average < dailyWaterValue) {
      hello.textContent = `Hello, ${user1.userName}!`;
      intakeComparison.style.color = "red";
      intakeComparison.style.fontWeight = "bold";
      hello.style.fontWeight = "bold";
      hello.style.color = "red";
      hello.innerHTML += ` You need to drink more water! ${recommendation}`;
    } else if (average >= dailyWaterValue) {
      hello.textContent = `Hello, ${user1.userName}!`;
      intakeComparison.style.color = "white";
      intakeComparison.style.fontWeight = "bold";
      hello.style.fontWeight = "bold";
      hello.style.color = "white";
      hello.innerHTML += " You're on track with your daily water intake!";
    } else {
      hello.textContent = `Hello, ${user1.userName}!`;
      intakeComparison.style.color = "black";
      intakeComparison.style.fontWeight = "normal";
      hello.style.fontWeight = "normal";
      hello.style.color = "black";
      hello.innerHTML += " Something went wrong.";
    }
  }

  class User {
    constructor(userName, age, gender, waterValue) {
      this.userName = userName;
      this.age = age;
      this.gender = gender;
      this.waterValue = waterValue;
    }
  }

  function generateIntakeRecommendation(user) {
    const age = user.age;
    const gender = user.gender;
    let recommendation = "";
    if (gender === "male") {
      if (age < 30) {
        recommendation = "You should drink at least 3.7 L of water per day.";
      } else if (age >= 30 && age < 55) {
        recommendation = "You should drink at least 3.0 L of water per day.";
      } else {
        recommendation = "You should drink at least 2.7 L of water per day.";
      }
    } else if (gender === "female") {
      if (age < 30) {
        recommendation = "You should drink at least 2.7 L of water per day.";
      } else if (age >= 30 && age < 55) {
        recommendation = "You should drink at least 2.2 L of water per day.";
      } else {
      recommendation = "You should drink at least 2.0 L of water per day.";
      }
      }
      return recommendation;
      }
      
      function calculateDailyWater(user) {
      const age = user.age;
      const gender = user.gender;
      let dailyWaterValue = 0;
      if (gender === "male") {
      if (age < 30) {
      dailyWaterValue = 3.7;
      } else if (age >= 30 && age < 55) {
      dailyWaterValue = 3.0;
      } else {
      dailyWaterValue = 2.7;
      }
      } else if (gender === "female") {
      if (age < 30) {
      dailyWaterValue = 2.7;
      } else if (age >= 30 && age < 55) {
      dailyWaterValue = 2.2;
      } else {
      dailyWaterValue = 2.0;
      }
      }
      return dailyWaterValue;
      }
      
      let userName = localStorage.getItem("userName");
      let age = localStorage.getItem("age");
      let gender = localStorage.getItem("gender");
      let waterValue = localStorage.getItem("waterValue");
      
      if (userName === null) {
        $("<div>Enter your name:</div>").dialog({
          modal: true,
          buttons: {
            "Submit": function() {
              userName = $(this).find("input").val();
              localStorage.setItem("userName", userName);
              $(this).dialog("close");
            }
          },
          close: function() {
            $(this).remove();
          },
          open: function() {
            $(this).find("input").focus();
          }
        }).append($("<input>").attr("type", "text"));
      }
      
      if (age === null || isNaN(age)) {
        $("<div>Enter your age:</div>").dialog({
          modal: true,
          buttons: {
            "Submit": function() {
              age = Number($(this).find("input").val());
              localStorage.setItem("age", age);
              $(this).dialog("close");
            }
          },
          close: function() {
            $(this).remove();
          },
          open: function() {
            $(this).find("input").focus();
          }
        }).append($("<input>").attr("type", "number").attr("min", "1"));
      }
      
      if (gender === null || (gender !== "male" && gender !== "female")) {
        $("<div>Enter your gender:</div>").dialog({
          modal: true,
          buttons: {
            "Submit": function() {
              gender = $(this).find("input:checked").val();
              localStorage.setItem("gender", gender);
              $(this).dialog("close");
            }
          },
          close: function() {
            $(this).remove();
          },
          open: function() {
            $(this).find("input:first").focus();
          }
        }).append($("<label><input type='radio' name='gender' value='male'> Male</label><br>"))
          .append($("<label><input type='radio' name='gender' value='female'> Female</label><br>"));
      }
      
      if (waterValue === null || isNaN(waterValue)) {
        $("<div>Enter your daily water goal:</div>").dialog({
          modal: true,
          buttons: {
            "Submit": function() {
              waterValue = Number($(this).find("input").val());
              localStorage.setItem("waterValue", waterValue);
              $(this).dialog("close");
            }
          },
          close: function() {
            $(this).remove();
          },
          open: function() {
            $(this).find("input").focus();
          }
        }).append($("<input>").attr("type", "number").attr("min", "0").attr("step", "0.1"));
      }      
      
      const user1 = new User(userName, age, gender, waterValue);
      const userM = new Map();
      
      userM.set(userName, user1);
      
      console.log(userM);
      });

      function getIPAddress() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://ipapi.co/json/", false);
        xhr.send();
        if(xhr.status === 200){
            var ipObject = JSON.parse(xhr.responseText);
            var ipAddress = ipObject.ip;
            return ipAddress;
        }
      }
      
      var userIPAddress = getIPAddress();
      console.log("User IP Address: " + userIPAddress);
      
      // get location based on IP address
      var locationRequest = new XMLHttpRequest();
      locationRequest.open("GET", "https://ipapi.co/" + userIPAddress + "/json/", true);
      locationRequest.onreadystatechange = function() {
        if (locationRequest.readyState == 4 && locationRequest.status == 200) {
          var locationObject = JSON.parse(locationRequest.responseText);
          var userLocation = locationObject.city + ", " + locationObject.region;
          console.log("User Location: " + userLocation);
          // use userLocation to display dynamic language
        }
      };
      locationRequest.send();
      