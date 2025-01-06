import React, {useState, useEffect, Fragment} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./date-picker.module.css";

const DatePickerComponent = ({onChangeDate}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dateChange = (event) => {
        setSelectedDate(event);
        onChangeDate(event);
    };

    useEffect(() => {
        onChangeDate(selectedDate);
    }, [selectedDate, onChangeDate]);

    return (
        <div>
            {selectedDate && <Fragment>
                <h3 className={style.datePicker}>Data selectata:</h3>
                <h3>{selectedDate.toLocaleDateString()}</h3>
            </Fragment>}

            <DatePicker
                selected={selectedDate}
                onChange={dateChange}
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
};

export default DatePickerComponent;
