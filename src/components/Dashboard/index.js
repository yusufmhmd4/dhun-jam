import React, { useEffect, useState } from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import { Navigate } from 'react-router-dom'
import CategoryBarChart from "../CategoryBarChart"
import InputAmount from '../InputAmount'
import Cookies from 'js-cookie'

import "./index.css"

function Dashboard() {
  const [data, updateData] = useState(null)
  const [chargeAmount, changeChargeAmount] = useState(null)
  const [activeSaveButton, updateActiveSaveButton] = useState(true)
  const [chargeCustomer, updateChargeCustomer] = useState(null)

  const id = Cookies.get('id')

  useEffect(() => {
    getAdminData()
  }, [])

  if (!Cookies.get('id')) {
    return <Navigate to="/login" />
  }
  async function getAdminData() {
    const url = `https://stg.dhunjam.in/account/admin/${id}`
    const fetchResults = await fetch(url)
    const response = await fetchResults.json()

    const responseInCamelCase = {
      amount: response.data.amount,
      name: response.data.name,
      location: response.data.location
    }
    updateData(responseInCamelCase)
    updateActiveSaveButton(responseInCamelCase.amount.category_6 > 99)
    changeChargeAmount(responseInCamelCase.amount.category_6)
    updateActiveSaveButton(response.data.charge_customers)
    updateChargeCustomer(response.data.charge_customers)
  }

  const updateCustomAmount = async (amount) => {

    const url = `https://stg.dhunjam.in/account/admin/${id}`

    const updateAmount = {
      amount: {
        category_6: amount
      }
    }

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateAmount)
    }

    const updateFetch = await fetch(url, options)
    const response = await updateFetch.json()
    console.log(response)
    getAdminData()

  }

  return (
    <>
      {
        data && <div className='dashboard-container'>
          <div className='admin-container'>
            <h1 className='admin-heading'>{data.name}, {data.location} on Dhun Jam</h1>
            <div className='request-container'>
              <h3 className='dashboard-question'>Do you want to charge your customer for requesting songs.</h3>
              <div className='radio-input-container'>
                <div className='radio-option'>
                  <input
                    type="radio"
                    name='song'
                    id='yes'
                    checked={chargeCustomer}
                    onChange={() => { }}
                  />
                  <label htmlFor='yes'>Yes</label>
                </div>
                <div className='radio-option'>
                  <input
                    type="radio"
                    name='song'
                    id='no'
                    checked={!chargeCustomer}
                    onChange={() => { }}
                  />
                  <label htmlFor='no'>No</label>
                </div>
              </div>
            </div>
            <div className='request-container'>
              <h3 className='dashboard-question'>Custom song request amount</h3>
              <div className='custom-charge-container' >
                <input type="text" className='custom-amount' style={!chargeCustomer ? { borderColor: '#C2C2C2', color: '#C2C2C2' } : {}} disabled={!chargeCustomer} value={chargeAmount} onChange={(e) => {
                  changeChargeAmount(e.target.value)
                  updateActiveSaveButton(e.target.value > 99)
                }} />
              </div>
            </div>
            <InputAmount amount={data.amount} chargeCustomer={chargeCustomer} updateActiveSaveButton={updateActiveSaveButton} />
            {
              chargeCustomer && <div className='bar-chart-container'>
                
                  <CategoryBarChart data={data.amount} />
                
                <MdCurrencyRupee className='currency-icon' />
              </div>
            }
            <button type="button" className='save-button' style={!activeSaveButton || !chargeCustomer ? { background: "#c2c2c2" } : { background: '#6741D9' }} disabled={!activeSaveButton} onClick={() => data.amount.category_6 !== chargeAmount ? updateCustomAmount(chargeAmount) : null}>Save</button>
          </div>
        </div >
      }
    </>

  )
}

export default Dashboard
