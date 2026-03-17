const API="https://student-portal-backend.onrender.com/api";
const loginPage=document.getElementById("loginPage");
const registerPage=document.getElementById("registerPage");
const sidebar=document.getElementById("sidebar");

const dashboardPage=document.getElementById("dashboardPage");
const profilePage=document.getElementById("profilePage");
const adminPage=document.getElementById("adminPage");

let currentEmail="";
let chart;

// PAGE SWITCH

function showRegister(){
loginPage.style.display="none";
registerPage.style.display="block";
}

function showLogin(){
registerPage.style.display="none";
loginPage.style.display="block";
}

function showDashboard(){
dashboardPage.style.display="block";
profilePage.style.display="none";
adminPage.style.display="none";
}

function showProfile(){
dashboardPage.style.display="none";
profilePage.style.display="block";
adminPage.style.display="none";
}

function showAdmin(){
dashboardPage.style.display="none";
profilePage.style.display="none";
adminPage.style.display="block";
}

// REGISTER

document.getElementById("registerForm").addEventListener("submit",async(e)=>{

e.preventDefault();

const user={
name:document.getElementById("name").value,
email:document.getElementById("email").value,
password:document.getElementById("password").value,
role:document.getElementById("role").value
};

await fetch(API+"/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(user)
});

alert("🎉 Registration Successful!");

showLogin();

});

// LOGIN

document.getElementById("loginForm").addEventListener("submit",async(e)=>{

e.preventDefault();

const user={
email:document.getElementById("loginEmail").value,
password:document.getElementById("loginPassword").value
};

const res=await fetch(API+"/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(user)
});

const role=await res.text();

// STUDENT LOGIN

if(role === "student"){

loginPage.style.display="none";
sidebar.style.display="block";

dashboardPage.style.display="block";
profilePage.style.display="none";
adminPage.style.display="none";

currentEmail=user.email;

loadProfile();
loadStats();

// hide admin link
document.getElementById("adminLink").style.display="none";

}

// ADMIN LOGIN

else if(role === "admin"){

loginPage.style.display="none";
sidebar.style.display="block";

dashboardPage.style.display="block";

currentEmail=user.email;

loadStats();
loadStudents();
loadProfile();   // ✅ FIX: admin profile now loads

// show admin link
document.getElementById("adminLink").style.display="block";

}

else{

alert("❌Invalid Login");

}

});

// LOAD PROFILE

async function loadProfile(){

const res=await fetch(API+"/students");
const students=await res.json();

const s=students.find(st=>st.email===currentEmail);

if(s){

document.getElementById("studentName").innerText="👦 "+s.name;
document.getElementById("studentEmail").innerText="📧 "+s.email;
document.getElementById("studentRole").innerText="🎓 "+s.role;

}
else{

// ✅ FIX: prevents empty profile
document.getElementById("studentName").innerText="User not found";
document.getElementById("studentEmail").innerText="";
document.getElementById("studentRole").innerText="";

}

}

// LOAD STATS

async function loadStats(){

const res=await fetch(API+"/students");
const students=await res.json();

const studentCount=students.filter(s=>s.role==="student").length;
const adminCount=students.filter(s=>s.role==="admin").length;

document.getElementById("totalStudents").innerText=studentCount;
document.getElementById("totalAdmins").innerText=adminCount;
document.getElementById("totalUsers").innerText=students.length;

if(chart) chart.destroy();

chart=new Chart(document.getElementById("roleChart"),{
type:"doughnut",
data:{
labels:["Students","Admins"],
datasets:[{
data:[studentCount,adminCount],
backgroundColor:["#ff6b6b","#43cea2"]
}]
}
});

}

// LOAD STUDENTS FOR ADMIN

async function loadStudents(){

const res=await fetch(API+"/students");
const students=await res.json();

let rows="";

students.forEach(s=>{

rows+=`

<tr>
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.email}</td>
<td>${s.role}</td>
</tr>
`;

});

document.getElementById("studentTable").innerHTML=rows;

}

// LOGOUT

function logout(){
location.reload();
}
