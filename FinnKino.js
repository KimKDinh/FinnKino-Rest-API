


// Lataa pääkaupukiseudun kaikki teatterit
function LoadList() {
    // määritellään kutsu
    var xhttp = new XMLHttpRequest();
    // avataan tiedosto
    xhttp.open("GET", 'https://www.finnkino.fi/xml/Schedule/', true);
    //lähetään kutsu..
    xhttp.send();
    // jos kutsu tulee takaisin. voidaan aloittaa function käyttö.
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
}
//Hakee datan xml tiedostosta ja tekee listan uudelleen ja lajittelee kaikki oikeisiin taulukkoon.
  function myFunction(xml) {
    var i;
    //saatu xml tiedoston kutsu
    var xmlDoc = xml.responseXML;
    // määrittelee talukon etukäteen.
    var table="<tr><th>Title</th><th>Length (Minutes)</th><th>Rating</th><th>Year</th><th>Theatre</th><th>ShowTime</th><th>Poster</th></tr>";
    //heataan kaikki tiedot Show nimestä tagistä sisältö.
    var x = xmlDoc.getElementsByTagName("Show");


    for (i = 0; i <x.length; i++) { 
      // hakee showtime tiedo xml filusta ja muotoilee siitä kuvallsen tekstin
      var ShowTime = x[i].getElementsByTagName('dttmShowStart');
      var ShowTimeDate = ShowTime[0]; //
      // tulostaa jokaisen Showtime päivämäärän ja ajan.
      ShowTime = ShowTimeDate.childNodes[0].nodeValue;
      //muotoilee showtime päivämäärän hienompaan muotoon
      var d = Date.parse(ShowTime);
      //tekee päivämäärän
      var newDate = new Date(d);
      //muotoiltu ja määritelty html sivun näkyvään muotoon.
      ShowTime = newDate;
      // hakee kuvan xml filustam ja tekee siitä lukevan teksi muodon, jotta voidaa lukea html sivulla.
      const imageUrl = x[i].getElementsByTagName('Images')[0].firstElementChild.textContent;
        // tekee taulukon
        table += "<tr><td>" +
        //hakee talukolle jokaisen esityksen riville
        x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
        "</td><td>" +
        //hakee talukolle jokaisen esityksen pituunden riville
        x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue +
        "</td><td>" + 
        //hakee talukolle jokaisen esityksen luokitksen riville  
        x[i].getElementsByTagName("Rating")[0].childNodes[0].nodeValue +
        "</td><td>" +  
        //hakee talukolle jokaisen esityksen valmistumis vuoden riville   
        x[i].getElementsByTagName("ProductionYear")[0].childNodes[0].nodeValue +
        "</td><td>" +
        //hakee talukolle jokaisen teatterin, jossaesityksen riville
        x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue +
        "</td><td>" +
        //hakee talukolle jokaisen esityksen  showtime päivämäärän riville
        ShowTime +
        '</td><td><img src=' +
        //hakee talukolle jokaisen esityksen posterin riville
        imageUrl +
        '></td></tr>';
    }
    //tulostaa lopuksi demo taulukolle kaikki tiedot.
    document.getElementById("demo").innerHTML = table;
  }


//Variable the get the text from inputfield and eventlisterner for keyup
let SearchInput = document.getElementById('Title').addEventListener("keyup", searchMovie);

function searchMovie()
{
  //variable which gets the userinput and makes it uppercase
  let userInput = this.value.toUpperCase();
  //Variable which selects the table "demo"
  let table = document.getElementById("demo");
  //variable gets the table row from "demo"
  let row = table.getElementsByTagName("tr");
  let myArray = userInput.split(/[ ,]+/);
  //for loop that goes through all the rows
  for (i = 0; i < row.length; i++) 
  { 
    //variable to get tabledata from rows index for movie
    td = row[i].getElementsByTagName("td")[0];
    //variable of user selected theather from dropdown menu
    let selectedTheather = document.getElementById("selectTheatre").value;
    //variable to get tabledata from rows index for theather
    let theather = row[i].getElementsByTagName("td")[4];
    //if all theathers is selected only comparing user input into movies
    if (selectedTheather == "Choose")
    {
      //if table data is not null.
      if (td) 
      {
        //if userinput matches userinput tabledata from position 0 OR theather matches userinput from tabledata from poisiton 5 
        //if userinput has a space we see if array[0] AND array[1] data matches userinput, Used to filter Movie with Teather
        //if userinput has a space we see if array[1] AND array[0] data matches userinput, Used to filter Teather with Movie
        if (td.innerHTML.toUpperCase().indexOf(userInput) > -1 || theather.innerHTML.toUpperCase().indexOf(userInput) > -1 || 
        (td.innerHTML.toUpperCase().indexOf(myArray[0]) > -1 && theather.innerHTML.toUpperCase().indexOf(myArray[1]) > -1) ||  
        (td.innerHTML.toUpperCase().indexOf(myArray[1]) > -1 && theather.innerHTML.toUpperCase().indexOf(myArray[0]) > -1) ) 
        { 
          //if matches row display is not changed
          row[i].style.display = "";
        } 
        else 
        {
          //if doesnt match row display goes away
          row[i].style.display = "none"; 
        }
      } 
    } 
    // if user input is not all theathers, compare user input into movies in selected theather
    else 
   {
    //if table data is not null
    if (td) 
     {
      //if table data matches the userinput
      if (td.innerHTML.toUpperCase().indexOf(userInput) > -1 && theather.innerHTML.toLocaleUpperCase().indexOf(selectedTheather) > -1) 
      { 
        //if matches row display is not changed
        row[i].style.display = "";
      } 
      else 
        {
        //if doesnt match row display goes away
        row[i].style.display = "none"; 
        }
     } 
   }
  }
}


//Eventlistener for dropdown menu to get the selected theatre
let selection = document.getElementById("selectTheatre").addEventListener("change", function change()
  { 
    selectTheatre();
  });
//function to select a theatre from drop down menu
function selectTheatre()
{
  //variable to use the dropdown menu
  let theatherSelection = document.getElementById("selectTheatre").value;
  //variable to get the table "demo"
  let table = document.getElementById("demo");
  //variable to seelect the tablerow
  let row = table.getElementsByTagName("tr");
  //Get the selected value from dropdown menu
  let theaterid = document.getElementById('selectTheatre').value;
  //Array which has all the theathers and corresponding ID for XML file
  let theaterNameAndID = ['OMENA','SELLO','ITIS','KINOPALATSI','MAXIM','TENNISPALATSI','FLAMINGO','FANTASIA','SCALA','KUVAPALATSI','STRAND','PLAZA','PROMENADI','CINE ATLAS','PLEVNA','TURKU',1039,1038,1045,1031,1032,1033,1013,1015,1016,1017,1041,1018,1019,1034,1035,1022]
  //Check if Pääkaupunkiseutu was selected
  if
  (document.getElementById('selectTheatre').value == "Choose")
  {
    //Loads the Pääkapunkiseutu
    LoadList()
    //Removes userinput from search
    document.getElementById('Title').value = '';
  } 
  //check if the array has selected theather ID 
  if (theaterNameAndID.includes(theaterid))
  {
    //Goes through the array with Theater names and IDs
    for (i = 0; i < theaterNameAndID.length; i++) 
    {
      //Finds the selected theather from array
        if(theaterNameAndID[i] == theaterid)
      {
        //Gets the corresponding teather ID using the position
        theaterNameAndID = theaterNameAndID[i+16];
        //Loads the XML file using theatherID
        LoadArea(theaterNameAndID);
      }

    }

      //for loop to get all the rows
    for (i = 0; i < row.length; i++) 
   { 
    //variable to get the table data from position 5
    td = row[i].getElementsByTagName("td")[4];
    // if table data is not null
    if (td) 
     {
      //check if tabledata matches user selected value from dropdown menu
      if (td.innerHTML.toUpperCase().indexOf(theatherSelection) > -1) 
      { 
        //if matches row display is not changed
        row[i].style.display = "";
        document.getElementById('Title').value = '';
      } 
      else 
        {
        //if doesnt match row display goes away
        row[i].style.display = "none";
        document.getElementById('Title').value = '';
        }
     } 
   }
  }
}


//Loading other areas using TheatherID 
function LoadArea(theaterNameAndID) 
{
  var xhttp = new XMLHttpRequest();
  //Opens the XML using the theatherID
  xhttp.open("GET", 'https://www.finnkino.fi/xml/Schedule/?area='+theaterNameAndID, true);
  xhttp.send();
  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200)
     {
      myFunction(this);
     }
  };
}

