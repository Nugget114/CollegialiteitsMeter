import { useState, useEffect } from 'react'
import './App.scss'
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [taken, setTaken] = useLocalStorage("taken", []);
  const [puntenInput, setPuntenInput] = useState("");
  const [taakInput, setTaakInput] = useState("");

  useEffect(() => {
    document.title = `${berekenTotalePunten()} punten`;
  }, [taken]);

  function handleSubmit(e) {
    e.preventDefault();

    // const timestamp = Date.now()
    const timestamp = new Date("09/30/2022 16:25:50");
    const nieuweTaak = {
      punten: Number(puntenInput),
      opdracht: taakInput,
      datum: timestamp
    };

    setPuntenInput("");
    setTaakInput("");

    setTaken([nieuweTaak, ...taken]);
  }

  function berekenTotalePunten() {
    const totalePunten = taken.reduce((acc, curr) => acc + curr.punten, 0);
    return Math.round(totalePunten * 100) / 100;
  }

  function formatToTime(number) {
    return ("0" + number).slice(-2);
  }

  function convertTimestamp(timestamp, method="short") {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('nl-NL', { month: 'long' });
  
    if (method === "short") {  
      return `${day} ${month}`;
    }

    const year = date.getFullYear();
    const hours = formatToTime(date.getHours());
    const minutes = formatToTime(date.getMinutes());
    const seconds = formatToTime(date.getSeconds());

    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  }

  function handleTaakKlik(index) {
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
                <div className="taak" key={`${i}`} onClick={() => handleTaakKlik(i)}>
                  <div className="taak__punten-container">
                    <p className="taak__punten">{taak.punten}</p>
                    <p className="taak__punten-omschrijving">punten</p>
                  </div>
                  <p className="taak__omschrijving">{taak.opdracht}</p>
                  <p className="taak__datum" title={convertTimestamp(taak.datum, "long")}>{convertTimestamp(taak.datum)}</p>
                </div>
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
