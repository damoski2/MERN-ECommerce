import React,{useState, useEffect} from 'react'

export const CheckBox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([])

    const handleToggle =c=> ()=>{
        //return the first index or -1
        const currentCategoryId = checked.indexOf(c)

        const newCheckedCategoryId = [...checked]
        // if curently checked was not already in checked state > push
        //elese pull/takeoff
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((c,i)=>(
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id) === -1} type="checkbox" className="form-check-input" />
            <label className="form-check-label" >{c.name}</label>
        </li>
    ))
}

