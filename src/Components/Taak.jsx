import { convertTimestamp } from './../functions';
import { useState, useEffect } from "react";

import deleteImage from "../assets/images/delete.svg";
import editImage from "../assets/images/edit.svg";
import checkImage from "../assets/images/check.svg";
import kruisImage from "../assets/image/kruis.svg";

export default function Taak({ taak, index, handleTaakKlik, handleTaakBewerken, handleTaakVerwijderen, accepteerBewerkTaak, isSelected, isEditing }) {

    const [bewerkenTekst, setBewerkenTekst] = useState(taak.opdracht);

    useEffect(() => {
        setBewerkenTekst(taak.opdracht);
    }, [isEditing])

    function handleEditClick(e, index) {
        handleTaakBewerken(e, index, bewerkenTekst);        
    }

    function handleEditAcceptClick(e, index) {
        e.stopPropagation();
        accepteerBewerkTaak(index, bewerkenTekst);
    }

    function handleDeleteClick(e, index) {
        handleTaakVerwijderen(e, index);
    }

    return (
        <div className={isSelected ? "taak taak--selected" : "taak"} onClick={handleTaakKlik}>
            <div className="taak__punten-container">
            <p className="taak__punten">{taak.punten}</p>
            <p className="taak__punten-omschrijving">punten</p>
            </div>
            {
                isEditing
                ? (
                    <input type="text" className="taak__edit-input" value={bewerkenTekst} onChange={(e) => setBewerkenTekst(e.target.value)} onClick={(e) => e.stopPropagation()} />
                ) :
                (
                    <p className="taak__omschrijving">{taak.opdracht}</p>
                )
            }
            {
                isSelected && !isEditing
                ? (
                    <div className="taak__action">
                        <button onClick={(e) => handleEditClick(e, index)} className="action-btn"><img src={editImage} /></button>
                        <button onClick={(e) => handleDeleteClick(e, index)} className="action-btn"><img src={deleteImage} /></button>
                    </div>
                ) :
                isEditing ?
                (
                    // Editing
                    <div className="taak__action">
                        <button onClick={(e) => handleEditAcceptClick(e, index)} className="action-btn"><img src={checkImage} /></button>
                        <button className="action-btn"><img src={kruisImage} /></button>
                    </div>
                ) :
                (
                    <p className="taak__datum" title={convertTimestamp(taak.datum, "long")}>{convertTimestamp(taak.datum)}</p>
                )
            }
        </div>
    )
}
