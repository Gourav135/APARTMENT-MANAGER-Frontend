import { useState, useEffect, useRef } from "react";
import updateFlatsAction from "../../redux/updateFlats/action";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import * as React from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';

export default function Main() {
    const dispatch = useDispatch();

    let flats = useSelector((state) => (state.flats.flats));
    console.log(flats);

    const page = useRef(1); // change value on button click // {current: 1}

    const [modifiedFlats, setModifiedFlats] = useState(null);

    let displayFlats;
    if (modifiedFlats === null) {
        displayFlats = flats;
    }
    else {
        displayFlats = modifiedFlats;
    }

    async function getFlats(page) {
        try {
            let res = await fetch(`https://apratment-manager-backend.herokuapp.com/flats/${page}`);
            let flats = await res.json();
            // dispatch action 
            dispatch(updateFlatsAction(flats));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getFlats(page.current) }, []);

    function changePage(e) {
        if (e.target.id === "prevPage") {
            page.current = page.current - 1;
            getFlats(page.current);
        }
        else if (e.target.id === "nextPage") {
            page.current = page.current + 1;
            getFlats(page.current);
        }
    }

    function filterByResidentType(e) {
        if (e.target.value === "all") {
            setModifiedFlats([...flats]);
        }
        else if (e.target.value === "owner") {
            setModifiedFlats(flats.filter((flat) => (flat.flat_type === e.target.value)));
        }
        else {
            setModifiedFlats(flats.filter((flat) => (flat.flat_type === e.target.value)));
        }
    }

    function sortByFlatNo(e) {
        if (e.target.value === "asc") {
            flats.sort((a, b) => ((+a.flat_no) - (+b.flat_no)));
            setModifiedFlats([...flats]);
        }
        else if (e.target.value === "desc") {
            flats.sort((a, b) => ((+b.flat_no) - (+a.flat_no)));
            setModifiedFlats([...flats]);
        }
        console.log("---", flats);
    }

    const [search, setSearch] = useState("");

    function handleChange(e) {
        setSearch(e.target.value.trim());
    }

    function searchByBlock(e) {
        e.preventDefault();
        setModifiedFlats(flats.filter((flat) => (flat.block === search)));
    }

    return (
        <div>

            <div>
                {/* filter */}
                <div>
                    <label htmlFor="filterByResidentType">Filter by resident type</label>
                    <NativeSelect id="filterByResidentType" style={{ margin: "10px 10px", height: "18px" }} onChange={filterByResidentType}>
                        <option value="all">All</option>
                        <option value="owner">Owner</option>
                        <option value="tenant">Tenant</option>
                    </NativeSelect>
                </div>

                {/* sorting */}
                <div>
                    <label htmlFor="sortByFlatNo">Sort by flat no.</label>
                    <NativeSelect style={{ margin: "10px 10px", height: "18px" }} id="sortByFlatNo" onChange={sortByFlatNo}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </NativeSelect>
                </div>

                {/* search */}
                <form style={{ margin: "auto", marginTop: "10px" }} onSubmit={searchByBlock}>
                    <TextField sx={{ marginBottom: "20px", width: "300px" }} type="text" id="search" onChange={handleChange} label="Search By Block Name" variant="filled" />
                    <input style={{ width: "100px", height: "56px", fontSize: "25px", backgroundColor: "#1976d2", cursor: "pointer" }} type="submit" value="Search" />
                </form>

            </div>
            <table style={{ margin: "auto", marginTop: "10px", marginBottom: "20px" }} id="displayFlats" border="1" cellspacing="0" cellpadding="10">
                <thead style={{ backgroundColor: "#1976d2" }}>
                    <tr>
                        <th>Flat Type</th>
                        <th>Block</th>
                        <th>Flat No.</th>
                        <th>Residents Count</th>
                    </tr>
                </thead>
                <tbody>
                    {displayFlats.map((flat) => {
                        return (
                            <tr key={flat._id} id={flat._id}>
                                <td>{flat.flat_type}</td>
                                <td>{flat.block}</td>
                                <td>{flat.flat_no}</td>
                                <td>{flat.residents_count}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
                <Button id="prevPage" variant="contained" onClick={(e) => {
                    if (page.current > 1) {
                        changePage(e);
                    }
                }}>Prev Page</Button>
                <Button id="nextPage" style={{ marginLeft: "10px" }} onClick={changePage} variant="contained">Next Page</Button>
            </div>
        </div>
    );
}