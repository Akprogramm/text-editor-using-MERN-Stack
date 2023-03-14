import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../css/Editor.css"
// import getNote from './Exportdata';

function Editor() {

  const [data,setData]=useState("");
  const [fontStyle,setFontStyle]=useState("normal");

   const addNote=async()=>{
 
      const response=await fetch(`http://localhost:8000/adddata`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
        ,body: JSON.stringify({lines: `${value}`,converter: `${fontStyle}`})
      })    
        const note=await response.json();
       
      console.log("note : ",note);

    }


    // const getNote=async()=>{
    //   const fetchedData=await fetch(`http://localhost:8000`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     })    
    //       const note=await fetchedData.json();
    //       // console.log(note);
         
    //   }
  


    const handleOnClickNormal=()=>{
        setState("");
        setFontStyle("normal");

        setOne("bg-dark-subtle");
        setTwo("");
        setThree("");
     }

    const handleOnClickBold=()=>{
        setState("fw-bold");
        setFontStyle("fw-bold");

        setOne("");
        setTwo("bg-dark-subtle");
        setThree("");
     }

     const handleOnClickItalic=()=>{
        setState("fst-italic");
        setFontStyle("fst-italic");

        setOne("");
        setTwo("");
        setThree("bg-dark-subtle");
     }

     const handleOnConvert=()=>{
      window.location.reload();
        setConverter(state);
        localStorage.setItem("item",value);
        addNote();
        setVisibility("d-block");
        setTimeout(() => {
          setVisibility("d-none");
        }, 3000);
     }

     const handleOnChangle=(event)=>{
       setValue(event.target.value);
       console.log(value);
     }



    const [state,setState]=useState("");
    const [converter,setConverter]=useState("");
    const [value,setValue]=useState("");

    const [one,setOne]=useState("");
    const [two,setTwo]=useState("");
    const [three,setThree]=useState("");
    const [visibility,setVisibility]=useState("d-none");

    
useEffect(()=>{
  axios.get(`http://localhost:8000`).then((response) => {
    setData(response.data);
  });
},[])


let newdata=[data.length];
let newdatastyle=[data.length];

for (let i = 0; i < data.length; i++) {
   newdata[i]=data[i].lines;
}

for (let i = 0; i < data.length; i++) {
  newdatastyle[i]=data[i].converter;
}



  return (

    <div>
     <div className={`alert alert-primary ${visibility}`} role="alert">
     your text is saved in Database
     </div>

     <div className="box container">
        <div className="iconarea">
            <div className={` bor normal-text area1 ${one}`} onClick={handleOnClickNormal}>Normal text <i className="fa-solid fa-angle-down"></i></div>
          <div className="area2 d-flex">
            <div className={`bor boldicon ${two}`} onClick={handleOnClickBold}><i className="fa-solid fa-bold" ></i></div>
            <div className={`bor italicicon ${three}`} onClick={handleOnClickItalic}><i className="fa-solid fa-italic"></i></div>
            <div className="bor threedotts"><i className="fa-solid fa-ellipsis"></i></div>
            </div>
            <div className="bor area3">
            <i className="fa-solid fa-a"></i><i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="area4 d-flex ">
                <div className="bor icon1">
                <i className="fa-sharp fa-solid fa-ellipsis-vertical"></i><i className="fa-solid fa-bars"></i>
                </div>

                <div className="bor icon2">
                <i className="fa-sharp fa-solid fa-ellipsis-vertical"></i><i className="fa-solid fa-bars"></i>
                </div>
            </div>

            <div className="area5">
            <i className="bor fa-solid fa-link"></i>    
            <i className="bor fa-solid fa-image"></i> 
             <div className="bor adrede">@</div>      
             <i className="bor fa-regular fa-face-smile"></i>
             <i className="bor fa-brands fa-windows"></i>
             <i className="bor fa-solid fa-quote-right"></i>
             <div className="bor oopen-close-brackets"><i className="fa-solid fa-chevron-left"></i><i className="fa-solid fa-chevron-right"></i></div>
             <i className="bor fa-solid fa-plus"></i>
             <i className="bor fa-solid fa-chevron-down"></i>

            </div>

        </div>
     <div className="form-floating">
  <textarea className={`form-control ${converter}`} placeholder="Leave a comment here" id="floatingTextarea" onChange={handleOnChangle} value={value}></textarea>
  <label htmlFor="floatingTextarea">Comments</label>
  </div>
  <button className='convertbutton' onClick={handleOnConvert}><i className="fa-2x fa-sharp fa-solid fa-arrow-rotate-left"></i></button>
     </div>
     <div className="alltext container">
     {newdata && <h1>Your Previous text is Here -</h1>}
    {
      newdata.map((ele,i)=>{
      return <div className={`${newdatastyle[i]}`}>{ele}</div>
      })
    }
     </div>
    </div>
  )
}

export default Editor;
