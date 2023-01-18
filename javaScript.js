//get inputs values
var courseName=document.getElementById('courseName');
var courseCategory=document.getElementById('courseCategory');
var coursePrice=document.getElementById('coursePrice');
var courseDescription=document.getElementById('courseDescription');
var courseCapacity=document.getElementById('courseCapacity');
var data=document.getElementById('data');
var deleteBtn=document.getElementById('deleteBtn');
var addbtn=document.getElementById('click');
var search=document.getElementById('search');
var currentindex=0;
    
//create data
var courses
if(JSON.parse(localStorage.getItem('courses'))==null)
{
  courses=[];
}else{
  courses= JSON.parse(localStorage.getItem('courses'))
  displayData();
}

addbtn.onclick=function(event){
event.preventDefault();
if(addbtn.value=='Add Course'){
  addcourse();
}else
updatecourse()

clearInputs()
displayData()

courseName.classList.remove('is-valid')
courseCategory.classList.remove('is-valid')
coursePrice.classList.remove('is-valid')
courseDescription.classList.remove('is-valid')
courseCapacity.classList.remove('is-valid')
}
//Add Course
function addcourse(){
 var course = {
    courseName:courseName.value,
    courseCategory:courseCategory.value,
    coursePrice:coursePrice.value,
    courseDescription:courseDescription.value,
    courseCapacity:courseCapacity.value
   } 

courses.push(course)
localStorage.setItem('courses',JSON.stringify(courses))
 
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'course has been created',
    showConfirmButton: false,
    timer: 1500
  })
 
}

//clear data
function clearInputs(){

    courseName.value=''
    courseCategory.value=''
     coursePrice.value=''
     courseDescription.value=''
     courseCapacity.value=''


} 


//display data
function displayData(){
var result='';
for(var i=0;i<courses.length;i++){
result+=` 
<tr>
<td>${i+1}</td>
<td>${courses[i].courseName}</td>
<td>${courses[i].courseCategory}</td>
<td>${courses[i].coursePrice}</td>
<td>${courses[i].courseDescription}</td>
<td>${courses[i].courseCapacity}</td>
 <td><button class="btn btn-info" onclick='getcourse(${i})'>update</button></td>
 <td><button class="btn btn-danger" onclick='deletedata(${i})'>delete</button></td>
</tr>
`
}
data.innerHTML=result;

}

function deletedata(index){
 
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

courses.splice(index,1);
localStorage.setItem('courses',JSON.stringify(courses))
displayData();

Swal.fire(
  'Deleted!',
  'course has been deleted.',
  'success'
      )
    }
  })
}



//delete all
deleteBtn.onclick=function deleteall(){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses',JSON.stringify(courses))
            data.innerHTML='';
    
    
    
          Swal.fire(
            'Deleted!',
            'all data has been deleted.',
            'success'
          )
        }
      })
}

//search function
search.onkeyup=function(){

  console.log(search.value);
    var result='';
    for(var i=0;i<courses.length;i++){
    if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase()))
    result+=`
    <tr>
    <td>${i+1}</td>
    <td>${courses[i].courseName}</td>
    <td>${courses[i].courseCategory}</td>
    <td>${courses[i].coursePrice}</td>
    <td>${courses[i].courseDescription}</td>
    <td>${courses[i].courseCapacity}</td>
    <td><button class="btn btn-info">update</button></td>
    <td><button class="btn btn-danger" onclick='deletedata(${i})'>delete</button></td>
    </tr>
    `
    }
    data.innerHTML=result;
    }


function getcourse(index){
var course=courses[index]
 courseName.value=course.courseName
 courseCategory.value=course.courseCategory
 coursePrice.value=course.coursePrice
 courseDescription.value=course.courseDescription
 courseCapacity.value=course.courseCapacity
 addbtn.value="Update Course";
 currentindex=index;  
}

function updatecourse(){
  var course = {
    courseName:courseName.value,
    courseCategory:courseCategory.value,
    coursePrice:coursePrice.value,
    courseDescription:courseDescription.value,
    courseCapacity:courseCapacity.value
   } 
var namecourse=courses[currentindex].courseName
courses[currentindex].courseName=course.courseName
courses[currentindex].courseCategory=course.courseCategory
courses[currentindex].coursePrice=course.coursePrice
courses[currentindex].courseDescription=course.courseDescription
courses[currentindex].courseCapacity=course.courseCapacity
localStorage.setItem('courses',JSON.stringify(courses))
addbtn.value="Add Course";
 
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: `${namecourse} has been updated`,
  showConfirmButton: false,
  timer: 1500
})

 
 
}


//validataion
/*
name: first char capital
3-10
pattarn=>/^[A-z][a-z]{2,10}$/
*/

courseName.onkeyup=function(){
var pattarn=/^[A-Z][a-z]{2,10}$/
if(pattarn.test(courseName.value)){
  if(courseName.classList.contains('is-invalid')&&document.getElementById('nameAlert').classList.contains('d-block')  ){
    courseName.classList.replace('is-invalid','is-valid')
    document.getElementById('nameAlert').classList.replace('d-block','d-none')
  }else
  courseName.classList.add('is-valid')
  addbtn.removeAttribute('disabled')
}else{
  if(courseName.classList.contains('is-valid')&& document.getElementById('nameAlert').classList.contains('d-none') ){
    courseName.classList.replace('is-valid','is-invalid')
    document.getElementById('nameAlert').classList.replace('d-none','d-block')
  }
  courseName.classList.add('is-invalid')
  document.getElementById('nameAlert').classList.replace('d-none','d-block')
  addbtn.setAttribute('disabled','disabled')
}
}

/*
category: first char capital
3-10
pattarn=>/^[A-z][a-z]{2,20}$/
*/
courseCategory.onkeyup=function(){
var pattarn=/^[A-Z][a-z]{2,20}$/
if(pattarn.test(courseCategory.value)){
  if(courseCategory.classList.contains('is-invalid') && document.getElementById('categoryAlert').classList.contains('d-block')){
    courseCategory.classList.replace('is-invalid','is-valid')
    document.getElementById('categoryAlert').classList.replace('d-block','d-none')
   
  }else
  courseCategory.classList.add('is-valid')
  addbtn.removeAttribute('disabled')
}else{
  if(courseCategory.classList.contains('is-valid')&& document.getElementById('categoryAlert').classList.contains('d-none') ){
    courseCategory.classList.replace('is-valid','is-invalid')
    document.getElementById('categoryAlert').classList.replace('d-none','d-block')
  }
  courseCategory.classList.add('is-invalid')
  document.getElementById('categoryAlert').classList.replace('d-none','d-block')
  addbtn.setAttribute('disabled','disabled')
}
}

/*
price: number
3-10
pattarn=>/^[A-z][a-z]{2,20}$/
*/
coursePrice.onkeyup=function(){
  var pattarn=/^[0-9]{3,4}$/
  if(pattarn.test(coursePrice.value)){
    if(coursePrice.classList.contains('is-invalid')&& document.getElementById('priceAlert').classList.contains('d-block')){
      coursePrice.classList.replace('is-invalid','is-valid')
      document.getElementById('priceAlert').classList.replace('d-block','d-none')
    }else
    coursePrice.classList.add('is-valid')
    addbtn.removeAttribute('disabled')
  }else{
    if(coursePrice.classList.contains('is-valid')&& document.getElementById('priceAlert').classList.contains('d-none')){
      coursePrice.classList.replace('is-valid','is-invalid')
      document.getElementById('priceAlert').classList.replace('d-none','d-block')

    }
    coursePrice.classList.add('is-invalid')
    document.getElementById('priceAlert').classList.replace('d-none','d-block')
    addbtn.setAttribute('disabled','disabled')
  }
  }

/*
describtion: 
3-10
pattarn=>/^[A-z][a-z]{2,20}$/
*/
courseDescription.onkeyup=function(){
  var pattarn=/^[A-Z][A-Za-z0-9\s]{3,120}$/
  if(pattarn.test(courseDescription.value)){
    if(courseDescription.classList.contains('is-invalid')&& document.getElementById('descAlert').classList.contains('d-block')){
      courseDescription.classList.replace('is-invalid','is-valid')
      document.getElementById('descAlert').classList.replace('d-block','d-none')
    }else
    courseDescription.classList.add('is-valid')
    addbtn.removeAttribute('disabled')
  }else{
    if(courseDescription.classList.contains('is-valid')&& document.getElementById('priceAlert').classList.contains('d-none')){
      courseDescription.classList.replace('is-valid','is-invalid')
      document.getElementById('descAlert').classList.replace('d-none','d-block')
    }
    courseDescription.classList.add('is-invalid')
    document.getElementById('descAlert').classList.replace('d-none','d-block')
    addbtn.setAttribute('disabled','disabled')
  }
  }


/*
  capicity: number
3-10
pattarn=>/^[A-z][a-z]{2,20}$/
*/
courseCapacity.onkeyup=function(){
  var pattarn=/^[0-9]{3,4}$/
  if(pattarn.test(courseCapacity.value)){
    if(courseCapacity.classList.contains('is-invalid')&& document.getElementById('capAlert').classList.contains('d-block')){
      courseCapacity.classList.replace('is-invalid','is-valid')
      document.getElementById('capAlert').classList.replace('d-block','d-none')
    }else
    courseCapacity.classList.add('is-valid')
    addbtn.removeAttribute('disabled')
  }else{
    if(courseCapacity.classList.contains('is-valid')&& document.getElementById('capAlert').classList.contains('d-none')){
      courseCapacity.classList.replace('is-valid','is-invalid')
      document.getElementById('capAlert').classList.replace('d-none','d-block')
    }
    courseCapacity.classList.add('is-invalid')
    document.getElementById('capAlert').classList.replace('d-none','d-block')
    addbtn.setAttribute('disabled','disabled')
  }
  }

