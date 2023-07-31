document.addEventListener("DOMContentLoaded", () => {
    const getActivityButton = document.querySelector("button") as HTMLElement;
    const activityListPage = document.querySelector(".activityList") as HTMLElement;
    const saveButton = document.getElementById("saveBtn") as HTMLElement;
    const savedActivities = document.querySelector(".savedSuggestions") as HTMLElement;

    let currentActivity: string = "";
    let activityRetrieved: boolean = false;

getActivityButton.onclick = () =>{
    fetch("https://www.boredapi.com/api/activity")
        .then(res => res.json())
        .then(data => {
            currentActivity = data.activity;
            activityListPage.innerHTML += `<p>✔ ${data.activity}</p>`
            activityRetrieved = true;
        })
}

    saveButton.onclick = () =>{

    if (!activityRetrieved){
        window.alert("you must save at least 1 activity!")
    } else {
        console.log("it works")
        savedActivities.innerHTML += `<div class="activityCard">
<p><strong>Activity:</strong>${currentActivity}</p>
</div>`
        const userActivities = [currentActivity];
        localStorage.setItem("userActivities", JSON.stringify(userActivities));
    }

    }

    const storedActivities = localStorage.getItem("userActivities");

    let userActivities: string[] = [];
    if (storedActivities) {
        userActivities = JSON.parse(storedActivities) as string[];
    }

    userActivities.push(currentActivity);
    localStorage.setItem("userActivities", JSON.stringify(userActivities));

});





