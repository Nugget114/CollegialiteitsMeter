import { useState, useEffect } from 'react'
import './App.scss'
import useLocalStorage from './hooks/useLocalStorage';
import Taak from './Components/Taak';

function App() {
  const [taken, setTaken] = useLocalStorage("taken", []);
  const [puntenInput, setPuntenInput] = useState("");
  const [taakInput, setTaakInput] = useState("");

  useEffect(() => {
    document.title = `${berekenTotalePunten()} punten`;
  }, [taken]);

  function handleSubmit(e) {
    e.preventDefault();

    const timestamp = Date.now()
    const nieuweTaak = {
      punten: Number(puntenInput),
      opdracht: taakInput,
      datum: timestamp,
      editing: false,
      selected: false
    };

    setPuntenInput("");
    setTaakInput("");

    const takenCopy = [...taken];
    takenCopy.forEach(x => {
      x.editing = false;
      x.selected = false;
    })

    setTaken([nieuweTaak, ...takenCopy]);
  }

  function berekenTotalePunten() {
    const totalePunten = taken.reduce((acc, curr) => acc + curr.punten, 0);
    return Math.round(totalePunten * 100) / 100;
  }

  function handleTaakKlik(index) {
    let takenCopy = [...taken];
    const isSelected = takenCopy[index].selected;

    takenCopy.forEach(x => {
      x.selected = false;
      x.editing = false;
    })

    if (!isSelected) {
      takenCopy[index].selected = true;
    }

    setTaken(takenCopy);
  }

  function bewerkTaak(e, index) {
    e.stopPropagation();
    // Bewerken aanzetten
    const takenCopy = [...taken];
    const isEditing = takenCopy[index].editing;

    if (!isEditing) {
      takenCopy[index].editing = true;
    }
    setTaken(takenCopy);
  } 

  function verwijderTaak(e, index) {
    e.stopPropagation();
    if (confirm("Weet u zeker dat u deze taak wilt verwijderen?")) {
      const takenCopy = [...taken];
      takenCopy.splice(index, 1);
      setTaken(takenCopy);
    }
  } 

  function accepteerBewerkTaak(index, nieuweOpdrachtTekst) {
    const takenCopy = [...taken];
    takenCopy[index].opdracht = nieuweOpdrachtTekst;
    takenCopy[index].editing = false;

    setTaken(takenCopy);
  } 

  function verwijderTaak(e, index) {
    e.stopPropagation();
    if (confirm("Weet u zeker dat u deze taak wilt verwijderen?")) {
      const takenCopy = [...taken];
      takenCopy.splice(index, 1);
      setTaken(takenCopy);
    }
  }

  return (
    <div className="App">
      <div className="totale-punten">
        <p className="totale-punten__punten">{berekenTotalePunten()}</p>
        <p className="totale-punten__beschrijving">Punten op de schaal van collegialiteit</p>
      </div>
      <div className="takenlijst-container">
        <div className="takenlijst">
          {
            taken.map((taak, i) => {
              return (
                <Taak 
                  key={`${taak.opdracht}${i}`}
                  index={i}
                  taak={taak}
                  handleTaakKlik={() => handleTaakKlik(i)}
                  handleTaakBewerken={bewerkTaak}
                  handleTaakVerwijderen={verwijderTaak}
                  accepteerBewerkTaak={accepteerBewerkTaak}
                  isEditing={taak.editing}
                  isSelected={taak.selected} 
                />
              )
            })
          }
        </div>
      </div>
      <form className="invoerformulier" onSubmit={handleSubmit}>
        <label className="invoerformulier__label invoerformulier__label--small">
          <p className="invoerformulier__label-tekst">Punten</p>
          <input 
            className="invoerformulier__input"
            type="number"
            step="0.01"
            pattern="^-?\d+(\.\d{1,2})?"
            min="-50"
            max="50"
            placeholder="50"
            value={puntenInput}
            onChange={(e) => setPuntenInput(e.target.value)}
            required
          />
        </label>
        <label className="invoerformulier__label">
          <p className="invoerformulier__label-tekst">Uitgevoerde taak</p>
          <input 
            className="invoerformulier__input"
            placeholder="Koffie halen" 
            value={taakInput}
            onChange={(e) => setTaakInput(e.target.value)}
            required
          />
        </label>
        <button className="invoerformulier__toevoegen-button">Voeg toe</button>
      </form>
    </div>
  )
}

export default App
