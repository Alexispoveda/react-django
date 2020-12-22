import React, {useState} from 'react'
import {Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Box} from '@material-ui/core'
import {Link} from 'react-router-dom'

const CreateRoomPage = props =>{
    //State
    const [GuestCanPauseState, setGuestCanPauseState] = useState(true)
    const [VotesToSkipState, setVotesToSkipState] = useState(2)

    //Functions
    const handleVotesChange = e => setVotesToSkipState(e.target.value)

    const handleGuestCanPauseChange = e => setGuestCanPauseState(e.target.value === 'true' ? true : false)

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: VotesToSkipState,
                guest_can_pause: GuestCanPauseState
            })
        }

        fetch('/api/create-room', requestOptions).then(response=>response.json()).then(data =>props.history.push('/room/'+data.code))
    }
    
    return(
        <Box className="CreateRoom" boxShadow={10}>
            <Typography component='h4' variant='h4'>Create A Room</Typography>
            <FormControl>
                <FormHelperText style={{textAlign:'center'}}>Guest Control of Playback State</FormHelperText>
                <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
                    <FormControlLabel value='true' label='Play/Pause' labelPlacement='bottom' control={<Radio color='primary'/>}/>
                    <FormControlLabel value='false' label='No Control' labelPlacement='bottom' control={<Radio color='secondary'/>}/>
                </RadioGroup>
            </FormControl>
            <FormControl>
                <TextField required type='number' defaultValue={2} inputProps={{min:1, style:{textAlign:'center'}}} onChange={handleVotesChange}/>
                <FormHelperText>Votes required to skip song</FormHelperText>
            </FormControl>
            <Button color="primary" variant='contained' onClick={handleRoomButtonPressed}>Create A Room</Button>
            <Button color="secondary" variant='contained' to='/' component={Link}>Back</Button>
        </Box>
    )
}

export default CreateRoomPage