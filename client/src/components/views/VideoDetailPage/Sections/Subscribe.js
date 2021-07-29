import React, {useEffect, useState} from 'react'
import Axios from 'axios'


function Subscribe(props) {
	
	const userTo = props.userTo
	const userFrom = props.userFrom

	const [SubscribeNumber, setSubscribeNumber] = useState(0)
    	const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {

	const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }

        Axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('I could not any data please try again')
                }
            })

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: localStorage.getItem("userId")
        }

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert('no data')
                }
            })
    }, [])

    const onSubscribe = () => {

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }
	if(Subscribed) {
		Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
		.then(response => {
			if(response.data.success){
				setSubscribeNumber(SubscribeNumber -1)
				setSubscribed(!Subscribed)

			} else{
				alert('unsubscribe failed ')
			}
		})
	} else{

		Axios.post('/api/subscribe/subscribe', subscribedVariable)
		.then(response=>{
			if(response.data.success){
				setSubscribeNumber(SubscribeNumber +1)
				setSubscribed(!Subscribed)

			} else{
				alert('Subscribed failed ')
			}
		})
	}

    }

    return (
        <div>
            <button 
            onClick={onSubscribe}
            style={{
                backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
