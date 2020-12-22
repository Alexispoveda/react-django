import React, {useState, useEffect} from 'react'

const Room = props =>{
    //State
    const [GuestCanPauseState, setGuestCanPauseState] = useState(true)
    const [VotesToSkipState, setVotesToSkipState] = useState(2)
    const [IsHostState, setIsHostState] = useState(false)

    useEffect(()=>{
        fetch('/api/get-room'+'?code='+props.match.params.roomCode)
            .then(response => response.json())
                .then(data=>{
                    setGuestCanPauseState(data.guest_can_pause)
                    setVotesToSkipState(data.votes_to_skip)
                    setIsHostState(data.is_host)
                })
    },[])

    return(
        <div>
            <h3>{props.match.params.roomCode}</h3>
            <p>Guest can pause: {GuestCanPauseState ? 'Yes' : 'No'}</p>
            <p>Votes to skip: {VotesToSkipState}</p>
            <p>You are the host: {IsHostState ? 'Yes' : 'No'}</p>
        </div>
    )
}

export default Room