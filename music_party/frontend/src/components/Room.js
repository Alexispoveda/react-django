import React, {useState, useEffect} from 'react'
import {Box, TextField} from '@material-ui/core'

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
        <Box display='flex' flexDirection='column' justifyContent='center'>
            <h3>{props.match.params.roomCode}</h3>
            <TextField variant='filled' label='Guest can pause:' value={GuestCanPauseState ? 'Yes' : 'No'} style={{margin:'5%'}}/>
            <TextField variant='filled' label='Votes to skip:' value={VotesToSkipState} style={{margin:'5%'}}/>
            <TextField variant='filled' label='You are host:' value={IsHostState ? 'Yes' : 'No'} style={{margin:'5%'}}/>
        </Box>
    )
}

export default Room