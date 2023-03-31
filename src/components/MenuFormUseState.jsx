import React from "react";
import { useState } from "react";

function FormState() {

    const [descr, setDescr] = useState()
    const [price, setPrice] = useState()


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(descr)
        console.log(price)
    }

    return (

        <form onSubmit={handleSubmit}>
            <label htmlFor="descr">Beschreibung</label>
            <input onChange={(e) => setDescr(e.target.value)} type="text" name="descr" id="descr" />
            <label htmlFor="price">Preis</label>
            <input onChange={(e) => setPrice(e.target.value)} type="number" name="price" id="price" />
            <input type="submit" value=" + " ></input>
        </form>

    )
}


export default FormState;