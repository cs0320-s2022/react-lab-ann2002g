import React, {useState} from 'react';
import {TextBox} from "./TextBox";
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// @ts-ignore
import axios from 'axios';

function Horoscope() {

    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");

    //Fill in the ? with appropriate names/values for a horoscope.
    //HINT: Look at the HoroscopeHandler's response in Main.java to choose a default useState value.
    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {
        const url = 'http://localhost:4567/horoscope';

        const toSend = {
            //Pass in the values for the data. Follow the format the route expects!
            "sun": sun,
            "moon": moon,
            "rising": rising
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        //Fill in 1) location for request 2) your data 3) configuration
        axios.post(url, toSend, config)
            .then(response => {
                console.log(response.data);
                //field name: immutable map called horoscope in main.java
                setHoroscope(response.data["horoscope"]);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div>
            <header className="Horoscope">Horoscope</header>
            <TextBox label={"Enter Sun Sign: "} change={setSun}/>
            <TextBox label={"Enter Moon Sign: "} change={setMoon}/>
            <TextBox label={"Enter Rising Sign: "} change={setRising}/>

            <AwesomeButton type="primary" onPress={requestHoroscope}> Submit :) </AwesomeButton>

            <ul>
                {horoscope.map(item => <ul>{item}</ul>)}
            </ul>

        </div>
    )
}

export default Horoscope;
