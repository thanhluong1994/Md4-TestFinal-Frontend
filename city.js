function showAllCity() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/city",
        success: function (city) {
            let content="";
            for (let i = 0; i < city.length; i++) {
                content +=`<tr>
            <th scope="row">${i+1}</th>
            <td>${city[i].name}</td>
            <td>${city[i].nationality.name}</td>
            <td><button class="btn btn-primary" onclick="deleteCity(${city[i].id})">Delete</button></td>
            <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="showEditForm(${city[i].id})">Edit</button></td>
            <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal"">View</button></td>
        </tr>`
            }
            $("#list-city").html(content);
        }
    })
}
showAllCity();
function showDetailCity() {
}

function showAllNationality() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/city/nationality",
        success:function (nationality) {
            let content="";
            for (let i = 0; i < nationality.length; i++) {
                content+= `<option value="${nationality[i].id}">${nationality[i].name}</option>`
            }
            $("#nationality").html(content);
            $("#nationality1").html(content);
        }
    })
}
showAllNationality();

function showCreateForm() {
    showAllNationality();
    let content=`<div>
    <form>
        <h2>Create City</h2>
        <div class="mb-3">
            <label for="name" class="form-label">Name City</label>
            <input type="text" class="form-control" id="name" placeholder="Nhap ten thanh pho" aria-describedby="Name">
        </div>
        <div class="mb-3">
            <label for="nationality" class="form-label">Nationality</label>
             <select id="nationality" name="nationality"></select>
        </div>
        <div class="mb-3">
            <label for="acreage" class="form-label">Acreage</label>
            <input type="number" class="form-control" id="acreage" placeholder="Dien tich">
        </div>
        <div class="mb-3">
            <label for="population" class="form-label">Population</label>
            <input type="number" class="form-control" id="population" placeholder="Dan so">
        </div> 
         <div class="mb-3">
            <label for="gdp" class="form-label">GDP</label>
            <input type="number" class="form-control" id="gdp" placeholder="GDP">
        </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" class="form-control" id="description" cols="30" placeholder="Mo ta" rows="5"></textarea>
        </div>
        <div class="modal-footer">
        <button type="submit" class="btn btn-primary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" onclick="createCity()">Add</button>
        </div>
    </form>
</div>`
    $("#createCity").html(content);
}
function createCity() {
    let name=$("#name").val();
    let nationality=$("#nationality").val();
    let acreage=$("#acreage").val();
    let population=$("#population").val();
    let gdp=$("#gdp").val();
    let description=$("#description").val();
    let obj= {
        "name": name,
        "nationality": {"id":nationality},
        "acreage": acreage,
        "population": population,
        "gdp": gdp,
        "description": description
    }
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
            type: "POST",
            url: "http://localhost:8080/city",
            data: JSON.stringify(obj),
            success: function () {
                showAllCity();
                showAllNationality();
            }
    });
}

function showEditForm(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city/${id}`,
        success: function (city) {
            showAllNationality()
            let content = `
                 <form>
        <div class="mb-3">
            <label for="name1" class="form-label">Name City</label>
            <input type="text" class="form-control" id="name1" value="${city.name}">
        </div>
        <div class="mb-3">
            <label for="nationality1" class="form-label">Nationality</label>
            <select id="nationality1" name="nationality"  ></select>
        </div>
        <div class="mb-3">
            <label for="acreage" class="form-label">Acreage</label>
            <input type="number" class="form-control" id="acreage" value="${city.acreage}">
        </div>
        <div class="mb-3">
            <label for="population" class="form-label">Population</label>
           <input type="number" class="form-control" id="population" value="${city.population}">
        </div>
        <div class="mb-3">
            <label for="gdp" class="form-label">GDP</label>
           <input type="number" class="form-control" id="gd" value="${city.gdp}">
        </div> 
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
  <textarea  id="description" cols="30" rows="5" value="${city.description}"></textarea>        </div>
          <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="editCity(${id})" data-dismiss="modal">Update</button>
           </div>
           </div>
    </form>
`;
            $("#EditForm").html(content);
        }
    })
}
function editCity(id) {
    let name = $("#name1").val();
    let nationality = $("#nationality1").val();
    let acreage = $("#acreage").val();
    let population = $("#population").val();
    let gdp = $("#gdp").val();
    let description = $("#description").val();
    let obj = {
        "name": name,
        "nationality":
            {"id": nationality},
        "acreage": acreage,
        "population": population,
        "gdp": gdp,
        "description": description
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: `http://localhost:8080/city/${id}`,
        data: JSON.stringify(obj),
        success: function () {
            showAllCity()
            showAllNationality()
        }
    })
}


function deleteCity(id) {
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/city/${id}`,
        success:showAllCity
    })
}
$(document).ready(showAllCity());