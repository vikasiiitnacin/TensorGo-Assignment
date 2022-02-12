import axios from "axios";
import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

function App() {
  const [arr, setArr] = useState([]);
  const [temp, setTemp] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value, e.target.className);
    setArr(
      arr.map((x) => {
        if (x.id == e.target.className) {
          return {
            ...x,
            [e.target.name]: e.target.value,
          };
        } else {
          return x;
        }
      })
    );
  };

  const updateData = async () => {
    try {
      setIsUpdating(true);
      const data = await axios.post("/updateData", { arr: arr });
      alert(data.data.message);
      setIsUpdating(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(async () => {
    const data = await axios.get("/getData");
    console.log(data.data);
    setArr(data.data);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="md-12 w-100">
            <div
              style={{
                margin: "0 auto",
                width: "400px",
              }}
            >
              {arr.map((x, ind) => {
                return (
                  <>
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        margin: "10px",
                      }}
                      key={ind}
                      id={x.id}
                    >
                      <table>
                        <tr>
                          <td>name: </td>{" "}
                          <input
                            type="text"
                            name="name"
                            value={x.name}
                            className={x.id}
                            onChange={handleChange}
                          />
                          <td></td>
                        </tr>
                        <tr>
                          <td>email: </td>{" "}
                          <input
                            type="text"
                            name="email"
                            value={x.email}
                            className={x.id}
                            onChange={handleChange}
                          />
                          <td></td>
                        </tr>
                        <tr>
                          <td>gender: </td>{" "}
                          <input
                            type="text"
                            name="gender"
                            value={x.gender}
                            className={x.id}
                            onChange={handleChange}
                          />
                          <td></td>
                        </tr>
                        <tr>
                          <td>status: </td>{" "}
                          <input
                            type="text"
                            name="status"
                            value={x.status}
                            className={x.id}
                            onChange={handleChange}
                          />
                          <td></td>
                        </tr>
                      </table>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
        }}
      >
        <CSVLink
          data={arr}
          filename={"exported_data.csv"}
          target="_blank"
          className="btn btn-primary mr-3"
        >
          Export
        </CSVLink>

        <button
          className="btn btn-success"
          onClick={updateData}
          style={{ width: "100px" }}
        >
          {isUpdating ? <i class="fa fa-spinner fa-spin"></i> : "Upadate"}
        </button>
      </div>
    </>
  );
}

export default App;
