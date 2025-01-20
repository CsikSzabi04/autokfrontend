import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

export default function App() {

  const [autok, setAutok] = useState([]);
  const [tipus, setTipus] = useState('');
  const [suly, setSuly] = useState('');
  const [loero, setLoero] = useState('');
  const [id, setId] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
     async function getAutok(){
        const resp = await fetch("https://autok-qkjh.onrender.com/autok");
        const json = await resp.json();
        setAutok( json);
     }
     getAutok();
  }, [refresh]);

  async function addCar() {
    const auto = { tipus, suly, loero };
    const resp = await fetch("https://autok-qkjh.onrender.com/auto", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(auto),
    });
    setRefresh(!refresh);
  }

  async function delAuto(id) {
    const auto = { id };
    const resp = await fetch("https://autok-qkjh.onrender.com/auto", {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(auto),
    });
    setRefresh(!refresh);
  }

  async function changeCar() {
    const auto = { id, tipus, suly, loero };
    const resp = await fetch("https://autok-qkjh.onrender.com/auto", {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(auto),
    });
    setRefresh(!refresh);
  }

  return (
    <div className='app'>
      <div className='beker'>
        <input type="text" placeholder='Típus' value={tipus} onChange={(e) => setTipus(e.target.value)}/>
        <input type="text" placeholder='Súly'  value={suly} onChange={(e) => setSuly(e.target.value)}/>
        <input type="text" placeholder='Lóerő'  value={loero} onChange={(e) => setLoero(e.target.value)}/>
        <input type="button" value="OK" onClick={addCar}/>
        <input type="button" value="Change" onClick={changeCar}/>
      </div>
      <div className='lista'>
        {autok.map(x => <li onClick={() => {setId(x.id),setTipus(x.tipus), setLoero(x.loero), setSuly(x.suly)}} key={x.id}>{x.tipus}, {x.suly} kg, {x.loero} LE <img src="/public/del.png" onClick={() => delAuto(x.id)}  /> </li> )}
      </div>
    </div>
  )
}
