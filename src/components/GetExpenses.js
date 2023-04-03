import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import DataForm from './GetExpenses/DataForm'

const GetExpenses = () => {
  let navigation = useNavigate();

  if (!localStorage.getItem("token")) {
    navigation("/login");
  }
  return (
    <>
    <DataForm />
    {/* <div className="text-center p-3 my-2" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
      <small>Designed & developed by Amir Owaisy (Master)</small></div> */}
    </>
  )
}

export default GetExpenses
