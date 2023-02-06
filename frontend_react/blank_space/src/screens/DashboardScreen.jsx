import React from "react";
import { useState, useContext, useEffect } from "react";
import MyModal from "../components/Modal";
import Form from "react-bootstrap/Form";
import MultipleDatePicker from 'react-multiple-datepicker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { UserContext} from "../context";

const DashboardScreen = () => {
  const userName = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [eventObj, setEventObj] = useState({
    name: null,
    owner_name: null,
    owner_email: null,
    description: null,
    date: new Date().toUTCString(),
    time_slots: [],
    matches: []
  });

  const [showSelectTimeTypeOptions, setShowSelectTimeTypeOptions] = useState(false);
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('21:00');  

  const [errors, setErrors] = useState([])

  const checkErrors = () => {
    let newErrors = []
    if(eventObj.name === null){
      newErrors.push('Event name is required.')
    }
    if(eventObj.time_slots.length === 0){
      newErrors.push('Please select days.')
    }
    setErrors(newErrors);
  }

  const initEvent = () => {
    let updatedValue = {};
    updatedValue= {owner_name: userName};
    setEventObj(evntObj => ({
      ...evntObj,
      ...updatedValue
    }));
    setModalShow(true)
  }

  const handleNameChange = (e) => {
    let updatedValue = {};
    updatedValue = {name:e.target.value};
    setEventObj(evntObj => ({
      ...evntObj,
      ...updatedValue
    }));
  }

  const handleDescrptionChange = (e) => {
    let updatedValue = {};
    updatedValue = {description:e.target.value};
    setEventObj(evntObj => ({
      ...evntObj,
      ...updatedValue
    }));
  }

  const handleDaysInput = (dates) => {
    let updatedValue = [];
    dates.map(date => {
      let updatedTimeSlot = {}
      updatedTimeSlot['date'] = new Date(date).toUTCString()
      updatedTimeSlot['slot'] = [{
        startTime: startTime,
        endTime: endTime
      }]
      updatedValue.push(updatedTimeSlot)
    });
    setEventObj(evntObj => ({
      ...evntObj,
      time_slots: updatedValue
    }));
    setShowSelectTimeTypeOptions(true);
  }

  const handleTimeRange = async (e, type) => {
    const val = e.target.value
    if(type === 'start'){
      setStartTime(val);
    }else if (type === 'end'){
      setEndTime(val);
    }
  }

  useEffect(() => {
    let updatedObj = [];
    eventObj['time_slots'].map(slot => {
      let newSlotObj = {}
      newSlotObj['date'] = new Date(slot['date']).toUTCString()
      newSlotObj['slot'] = [{
        startTime: startTime,
        endTime: endTime
      }]
      updatedObj.push(newSlotObj);
    });
    setEventObj(evntObj => ({
      ...evntObj,
      time_slots: updatedObj
    }));
  },[startTime, endTime])

  const submitForm = async () => {
    await checkErrors()
    console.log(errors, eventObj)
  }

  const reset = () => {
    setEventObj({
      name: null,
      owner_name: null,
      owner_email: null,
      description: null,
      date: new Date().toUTCString(),
      time_slots: [],
      matches: []
    })
  }

  return (
    <>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-success btn-sm float-right"
            onClick={() => initEvent()}
          >
            Create New Event
          </button>
        </div>
      </div>
      
        <MyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          heading="New Event"
          onSubmit={submitForm}
          reset={reset}
        >
          {errors? (<pre>{JSON.stringify(errors)}</pre>) : <></>}
          <Form.Group className="mb-3 flex-row-space-between">
            <Form.Label>Owner</Form.Label>
            <Form.Control className="w-80" placeholder={userName} disabled />
          </Form.Group>
          <Form.Group className="mb-3  flex-row-space-between" controlId="formBasicText">
            <Form.Label >Name</Form.Label>
            <Form.Control className="w-80" type="text" placeholder="Event Name.." value={eventObj.name || ""} onChange={(e) => handleNameChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3 flex-row-space-between" controlId="exampleForm.EventDescription">
            <Form.Label >Description</Form.Label>
            <Form.Control className="w-80" as="textarea" rows={3}  placeholder="Enter your event description" value={eventObj.description} onChange={(e) => handleDescrptionChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3 flex-row-space-between" controlId="formBasicText">
            <Form.Label>Select Days</Form.Label>
            <MultipleDatePicker  className="w-80"
              onSubmit={dates => handleDaysInput(dates)}
            />
          </Form.Group>

          {
            showSelectTimeTypeOptions ? 
            <>
              <Form.Group className="mb-3 flex-row-space-between">
                <Form.Label>Select Time</Form.Label>
                <Form.Control type="time" className="w-40" id="startTime" value={startTime} onChange={(e) => handleTimeRange(e,'start')}/>
                TO
                <Form.Control type="time" className="w-40" id="endTime" value={endTime} onChange={(e) => handleTimeRange(e,'end')}/>
              </Form.Group>
            </>
            :
            <>
            </>
          }
{/* 
          <pre>{JSON.stringify(eventObj)}</pre> */}
        </MyModal>
    </>
  );
};

export default DashboardScreen;
