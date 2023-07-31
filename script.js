"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const getActivityButton = document.querySelector("button");
    const activityListPage = document.querySelector(".activityList");
    const saveButton = document.getElementById("saveBtn");
    const savedActivities = document.querySelector(".savedSuggestions");
    let currentActivity = "";
    let activityRetrieved = false;
    getActivityButton.onclick = () => {
        fetch("https://www.boredapi.com/api/activity")
            .then(res => res.json())
            .then(data => {
            currentActivity = data.activity;
            activityListPage.innerHTML += `<p>✔ ${data.activity}</p>`;
            activityRetrieved = true;
        });
    };
    saveButton.onclick = () => {
        if (!activityRetrieved) {
            window.alert("you must save at least 1 activity!");
        }
        else {
            console.log("it works");
            savedActivities.innerHTML += `<div class="activityCard">
<p><strong>Activity:</strong>${currentActivity}</p>
</div>`;
            const userActivities = [currentActivity];
            localStorage.setItem("userActivities", JSON.stringify(userActivities));
        }
    };
    const storedActivities = localStorage.getItem("userActivities");
    let userActivities = [];
    if (storedActivities) {
        userActivities = JSON.parse(storedActivities);
    }
    userActivities.push(currentActivity);
    localStorage.setItem("userActivities", JSON.stringify(userActivities));
});
