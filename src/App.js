import './App.css';
import {useState,useEffect} from 'react';

function App() {
  const [etu, setEtu] = useState([]);
  const [etNro, setEtnro] = useState(0);
  const [et_nimi, setEt_nimi] = useState(0);

  const url = "http://localhost/harjoitustyophp/";

  useEffect(async() => {
    try {
        
        const response = await fetch(url + 'get/getetutaso.php');
        const json = await response.json();
        
        if (response.ok) {
            
            setEtu(json);
        } else {
            alert(json.error);
        }
    } catch (error) {
        alert(error);
    }
  }, [])

  function modifyEtu(e) {
    e.preventDefault();
    let status = 0;
    fetch( url + "modify/modifyEtu.php",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            etNro: etNro,
            et_nimi: et_nimi
        })
    })
    .then(res => {
        console.log(res);
        status = parseInt(res.status);
    })
    .then(
        (res) => {
            console.log(res);
          if (status === 200) {
                alert("Muokkaus onnistui!");
          } else {
            console.log(res);
              alert("Muokkaus ei onnistunut")
          }
        }, (error) => {
          alert(error);
        }
    )
  };

  function addEtu(e) {
    e.preventDefault();
    let status = 0;
    fetch( url + "modify/addEtu.php",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            etNro: etNro,
            et_nimi: et_nimi
        })
    })
    .then(res => {
        console.log(res);
        status = parseInt(res.status);
    })
    .then(
        (res) => {
            console.log(res);
          if (status === 200) {
                alert("Lisäys onnistui!");
          } else {
            console.log(res);
              alert("Lisäys ei onnistunut.")
          }
        }, (error) => {
          alert(error);
        }
    )
  };

  function deleteEtu(e) {
    e.preventDefault();
    let status = 0;
    fetch( url + "modify/deleteEtu.php",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            etNro: etNro,
            et_nimi: et_nimi
        })
    })
    .then(res => {
        console.log(res);
        status = parseInt(res.status);
    })
    .then(
        (res) => {
            console.log(res);
          if (status === 200) {
                alert("Poisto onnistui!");
          } else {
            console.log(res);
              alert("Poisto ei onnistunut.")
          }
        }, (error) => {
          alert(error);
        }
    )
  };

  return (
    <div>
        <h1>Harjoitustyo</h1>

        <div>
          <div>
              <h3>Etutasojen hallinta</h3>
          </div>

          <div>
              <form onSubmit={addEtu}>
                  <h4>Etutason lisäys</h4>
                      <div>
                          <div>
                              <label>Syötä etutasonumero:</label>
                          </div>
                          <div>
                              <input onChange={e => setEtnro(e.target.value)}></input>
                          </div>
                      </div>
                      
                      <div>
                          <div>
                              <label>Syötä etutasonimi:</label>
                          </div>
                          <div>
                              <input onChange={e => setEt_nimi(e.target.value)}></input>
                          </div>
                      </div>

                  <div>
                      <button>Lisää etutaso</button>
                  </div>                          
              </form>
          </div>

          <div>
              <form onSubmit={modifyEtu}>
                    <h4>Etutason päivitys</h4>
                      <div>
                          <div>
                              <label>Valitse muokattava etutaso:</label>
                          </div>
                          <div>
                          <select onChange={e => setEtnro(Number(e.target.value))}>
                              <option defaultValue value={null}>Valitse etutaso</option>
                              {etu.map(etutaso => {
                                  return (
                                      <option key={etutaso.etNro} value={etutaso.etNro}>{etutaso.etNro}</option>
                                  );
                              })}
                          </select>
                          </div>
                      </div>

                      <div>
                          <div>
                              <label>Syötä etutasonimi:</label>
                          </div>
                          <div>
                              <input onChange={e => setEt_nimi(e.target.value)}></input>
                          </div>
                      </div>

                  <div>
                      <button>Muokkaa etutasoa</button>
                  </div>                          
              </form>
          </div>

          <div>
              <form onSubmit={deleteEtu}>
                  <div>
                  <h4>Etutason poisto</h4>
                      <div>
                          <div>
                              <label>Valitse poistettava etutaso:</label>
                          </div>
                          <div>
                          <select onChange={e => setEtnro(Number(e.target.value))}>
                              <option defaultValue value={null}>Valitse etutaso</option>
                              {etu.map(etutaso => {
                                  return (
                                      <option key={etutaso.etNro} value={etutaso.etNro}>{etutaso.etNro}</option>
                                  );
                              })}
                          </select>
                          </div>
                      </div>

                    </div>
                  <div>
                      <button>Poista etutaso</button>
                  </div>                          
              </form>
          </div>
          
          
          <div>
            <h3>Tietokanta</h3>
            <table>
              <tr>
                <td><b>etNro&nbsp;&nbsp;</b>{etu.map(etutaso => {
                    return (
                        <option key={etutaso.etNro} value={etutaso.etNro}>{etutaso.etNro}</option>
                    );
                    })}
                </td>
                <td><b>et_nimi</b>{etu.map(etutaso => {
                    return (
                        <option key={etutaso.et_nimi} value={etutaso.et_nimi}>{etutaso.et_nimi}</option>
                    );
                  })} 
                </td> 
              </tr>       
            </table>   
          </div>
      </div>

    </div>
  );
}

export default App;
